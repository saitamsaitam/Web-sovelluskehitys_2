import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

const Add = () => {
  const url = "http://localhost:3001/notes";


  const [data, setData] = useState({
    content: "",
    important: false,
  });

  const submit = (e) => {
    e.preventDefault();
    axios
      .post(url, {
        content: data.content,
        important: data.important,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  const handle = (e) => {

    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(newData);

  };


  return (
    <div>
      <Form onSubmit={(e) => submit(e)}>
        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control
            onChange={(e) => handle(e)}
            id="content"
            value={data.content}
            type="text"
            placeholder="Enter content"
          />
          <Form.Text className="text-muted">
            We'll never share your content with anyone else.
          </Form.Text>
        </Form.Group>


        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Add;

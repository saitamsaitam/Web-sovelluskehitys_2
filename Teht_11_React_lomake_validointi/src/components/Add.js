import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import axios from "axios";

const Add = () => {
  const url = "http://localhost:3001/notes";

  const [data, setData] = useState({
    content: "",
    first_name: "",
    last_name: "",
    username: "",
    important: false,
  });

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      axios
        .post(url, {
          content: data.content,
          first_name: data.first_name,
          last_name: data.last_name,
          username: data.username,
          important: data.important,
        })
        .then((res) => {
          console.log(res.data);
        });
    }

    setValidated(true);
  };

  const handle = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
    console.log(newData);
  };

  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Content</Form.Label>
            <Form.Control
              required
              type="text"
              onChange={(e) => handle(e)}
              name="content"
              value={data.content}
              placeholder="Enter content"
            />
            <Form.Control.Feedback type="invalid">
                Can't submit an empty note.
              </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              onChange={(e) => handle(e)}
              name="first_name"
              value={data.first_name}
              placeholder="Enter first name"
            />
            <Form.Control.Feedback type="invalid">
                Please enter first name.
              </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              onChange={(e) => handle(e)}
              name="last_name"
              value={data.last_name}
              placeholder="Enter last name"
            />
            <Form.Control.Feedback type="invalid">
                Please enter last name.
              </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <Form.Label>Username</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                required
                type="text"
                onChange={(e) => handle(e)}
                name="username"
                value={data.username}
                placeholder="Enter username"
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>

        <Button type="submit">Submit form</Button>
      </Form>
    </div>
  );
};

export default Add;

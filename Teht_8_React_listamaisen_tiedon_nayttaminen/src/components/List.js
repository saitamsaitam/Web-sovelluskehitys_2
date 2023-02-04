import React from "react";
import { Table } from "react-bootstrap";

import useFetch from "../useFetch";
import "../styles/listStyles.css";

const List = () => {
  const { data, loading, error, refetch } = useFetch(
    "http://localhost:3001/notes"
  );

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    console.log(error);
  }

  return (
    <div className="container">
        <h1 className="title">Data from db.json</h1>
      <Table striped bordered hover>
        <thead >
          <tr>
            <th>#</th>
            <th>Content</th>
            <th>important</th>
          </tr>
        </thead>
        <tbody>
          {data.map((note) => {
            return (
              <tr key={note.id}>
                <td>{note.id}</td>
                <td>{note.content}</td>
                <td>{note.important.toString()}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <button onClick={refetch}>refetch</button>
    </div>
  );
};

export default List;

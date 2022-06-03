import React, { useState } from "react";
import { TextField, Button, Checkbox } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import ReactDeleteRow from "react-delete-row";

const Home = () => {
  const formData = [
    createData("First Item"),
    createData("Second Item"),
    createData("Third Item"),
  ];
  const [newItem, setNewItem] = useState("");
  const [rows, setRows] = useState([...formData]);
  const [toDelete, setToDelete] = useState([]);
  function createData(name) {
    return { name };
  }

  const handleAdd = () => {
    setRows([...rows, createData(newItem)]);
  };

  const handleCheck = (data) => {
    setToDelete([...toDelete, createData(data)]);
  };

  const BulkDelete = () => {
    // let filtered = rows.filter((elem) => elem !== createData);
    const table = document.getElementById("tablebody");

    for (const [index, row] of [...table.rows].entries()) {
      if (row.querySelector("input:checked")) {
        table.deleteRow(index);
      }
    }
  };

  return (
    <div className="container text-center">
      <h1 style={{ position: "relative", right: "400px" }}>ToDo List</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "20px",
        }}
      >
        <TextField
          style={{ margin: "0 10px" }}
          fullWidth
          label="New Task"
          id="fullWidth"
          onChange={(e) => setNewItem(e.target.value)}
        />
        <Button
          style={{ margin: "0 10px" }}
          variant="contained"
          onClick={handleAdd}
        >
          Add
        </Button>
      </div>

      <TableContainer style={{ margin: "0 5px" }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody id="tablebody">
            {rows.map((row) => (
              <ReactDeleteRow
                key={row.name}
                deleteElement={
                  <i className="fa fa-trash" style={{ color: "red" }} />
                }
                // iconClassName="text-danger"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                data={row}
                onDelete={(row) => {
                  return window.confirm(`Are you sure?`);
                }}
              >
                <TableCell>
                  <Checkbox onSelect={() => handleCheck(row)} />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
              </ReactDeleteRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        style={{ marginTop: "7px" }}
        variant="contained"
        color="error"
        onClick={BulkDelete}
      >
        Delete
      </Button>
    </div>
  );
};

export default Home;

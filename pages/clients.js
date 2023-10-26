import Layout, { siteTitle } from "../components/layout";

import { getSortedPostsData } from "../lib/posts";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Grid, Button, TextField } from "@mui/material";

import axios from "axios";
import useAxios from "axios-hooks";
import React, { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Add } from "@mui/icons-material";

export default function Clients({ allPostsData }) {
  const [nameFilter, setNameFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [{ data: accounts, loading, error }, refetch] = useAxios({
    url: "/api/clients",
    params: { name: nameFilter },
  });

  const handleSave = async (e) => {
    console.log(newName, newAddress);

    if (newName)
      await axios.post("/api/clients", {
        name: newName,
        address: newAddress,
      });
  };

  return (
    <Layout home title={"Clients"}>
      <Button variant="contained" onClick={() => setShowForm(!showForm)}>
        <AddCircleIcon />
      </Button>

      {showForm && (
        <>
          <h2>Ajouter client</h2>

          <TextField label="Nom" onChange={(e) => setNewName(e.target.value)} />
          <TextField
            label="Addresse"
            onChange={(e) => setNewAddress(e.target.value)}
          />

          <Button variant="contained" onClick={handleSave}>
            Enregistrer
          </Button>
        </>
      )}

      {accounts && (
        <TableContainer component={Paper}>
          <Table sx={{}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <TextField
                    label="Nom"
                    onChange={(e) => setNameFilter(e.target.value)}
                  />
                </TableCell>

                <TableCell align="right">Addresse</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {accounts.map((acc) => (
                <TableRow
                  key={acc.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {acc.name}
                  </TableCell>
                  <TableCell align="right">{acc.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

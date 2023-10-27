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

import Autocomplete from "@mui/material/Autocomplete";

export default function Component({ allPostsData }) {
  const [showForm, setShowForm] = useState(true);

  const [newName, setNewName] = useState("");
  const [newAccountId, setNewAccountId] = useState("");

  const [nameFilter, setNameFilter] = useState("");
  const [accountFilter, setAccountFilter] = useState("");

  const [{ data: places, loading, error }, refetch] = useAxios({
    url: "/api/places",
    params: { name: nameFilter },
  });

  const [{ data: accounts, loading: loadingAcc, error: errorAcc }] = useAxios({
    url: "/api/accounts",
    params: { name: accountFilter },
  });

  const handleSave = async (e) => {
    if (newName)
      await axios.post("/api/places", {
        name: newName,
        account: newAccountId,
      });
  };

  console.log("accountFilter", accountFilter);

  return (
    <Layout home title={"Locaux"}>
      <Button variant="contained" onClick={() => setShowForm(!showForm)}>
        <AddCircleIcon />
      </Button>

      {accounts && showForm && (
        <>
          <h2>Ajouter local</h2>

          <TextField label="Nom" onChange={(e) => setNewName(e.target.value)} />

          <Autocomplete
            disablePortal
            options={accounts.map((acc) => {
              return { label: acc.name, id: acc.id };
            })}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Client" />}
            onInputChange={(e, newInputValue) => {
              setAccountFilter(newInputValue);
            }}
            onChange={(event, newValue) => {
              setNewAccountId(newValue ? newValue.id : null);
            }}
            filterOptions={(x) => x}
          />

          <Button variant="contained" onClick={handleSave}>
            Enregistrer
          </Button>
        </>
      )}

      {places && (
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

                <TableCell align="right">Client</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {places.map((acc) => (
                <TableRow
                  key={acc.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {acc.name}
                  </TableCell>
                  <TableCell align="right">{acc.account}</TableCell>
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

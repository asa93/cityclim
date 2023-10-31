import Layout from "../components/layout";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import useAxios from "axios-hooks";
import React, { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Autocomplete from "@mui/material/Autocomplete";
import TablePagination from "@mui/material/TablePagination";

import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";

import { Unit } from "../types/types";

export default function Component() {
  const [showForm, setShowForm] = useState(false);

  const [newName, setNewName] = useState("");
  const [newAccountId, setNewAccountId] = useState("");

  const [accountFilter, setAccountFilter] = useState("");
  const [placeFilter, setPlaceFilter] = useState("");

  const [accountFilter2, setaccountFilter2] = useState("");

  const [{ data: units_, loading, error }] = useAxios({
    url: process.env.NEXT_PUBLIC_API + "/api/units",
    params: { account: accountFilter, place: placeFilter },
  });
  const units: Unit[] = units_;

  const [{ data: accounts }] = useAxios({
    url: process.env.NEXT_PUBLIC_APPURL + "/api/accounts",
    params: { name: accountFilter2 },
  });

  const handleSave = async () => {
    if (newName)
      await axios.post(process.env.NEXT_PUBLIC_API + "/api/places", {
        name: newName,
        account: newAccountId,
      });
  };

  return (
    <Layout title={"Machines"}>
      {loading && <LinearProgress />}
      {error && <Alert severity="error">{error.message}</Alert>}

      <Button variant="contained" onClick={() => setShowForm(!showForm)}>
        <AddCircleIcon />
      </Button>

      {showForm && (
        <>
          <h2>Ajouter machine</h2>

          <TextField label="Nom" onChange={(e) => setNewName(e.target.value)} />

          <Autocomplete
            disablePortal
            options={accounts.map((acc) => {
              return { label: acc.name, id: acc.id };
            })}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Client" />}
            onInputChange={(e, newInputValue) => {
              setaccountFilter2(newInputValue);
            }}
            onChange={(event, newValue: any) => {
              setNewAccountId(newValue ? newValue.id : null);
            }}
            filterOptions={(x) => x}
          />

          <Button variant="contained" onClick={handleSave}>
            Enregistrer
          </Button>

          <Divider />
          <br />
        </>
      )}

      {units && (
        <>
          <TableContainer component={Paper}>
            <Table sx={{}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Nom</TableCell>

                  <TableCell align="right">
                    <TextField
                      label="Local"
                      onChange={(e) => setPlaceFilter(e.target.value)}
                    />
                  </TableCell>

                  <TableCell align="right">
                    <TextField
                      label="Client"
                      onChange={(e) => setAccountFilter(e.target.value)}
                    />
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {units.map((r) => (
                  <TableRow
                    key={r.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {r.name}
                    </TableCell>
                    <TableCell align="right">{r.place}</TableCell>
                    <TableCell align="right">{r.account}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[50]}
            component="div"
            count={units.length}
            rowsPerPage={50}
            page={0}
            onPageChange={() => {}}
            onRowsPerPageChange={() => {}}
          />
        </>
      )}
    </Layout>
  );
}

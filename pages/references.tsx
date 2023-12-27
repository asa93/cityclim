import Layout from "../components/layout";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";

import useAxios from "axios-hooks";
import React, { useState } from "react";

import TablePagination from "@mui/material/TablePagination";

import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";

import { Reference } from "../types/types";

export default function Component() {
  const [accountFilter, setAccountFilter] = useState("");

  const [{ data: references_, loading, error }] = useAxios({
    url: process.env.NEXT_PUBLIC_API + "/api/references",
    params: { account: accountFilter },
  });
  const references: Reference[] = references_;

  return (
    <Layout title={"Références"}>
      {loading && <LinearProgress />}

      {error && <Alert severity="error">{error.message}</Alert>}

      {references && (
        <>
          <TableContainer component={Paper}>
            <Table sx={{}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Nom</TableCell>
                  <TableCell>Documentation</TableCell>
                  <TableCell>Points de contrôles</TableCell>
                </TableRow>
              </TableHead>

              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>
                    <TextField
                      label="Nom"
                      onChange={(e) => setAccountFilter(e.target.value)}
                    />
                  </TableCell>

                  <TableCell></TableCell>

                  <TableCell> </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {references.map((r) => (
                  <TableRow
                    key={r.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left"> {r.id}</TableCell>
                    <TableCell align="left"> {r.name}</TableCell>
                    <TableCell align="left"> {r.doc}</TableCell>
                    <TableCell align="left">
                      {JSON.stringify(r.checkpoints)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[50]}
            component="div"
            count={references.length}
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

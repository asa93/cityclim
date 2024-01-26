import Layout from "../components/layout";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import useAxios from "axios-hooks";
import React, { useState } from "react";

import TablePagination from "@mui/material/TablePagination";

import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";

import { ESTIMATE_STATE } from "../consts";
import Chip from "@mui/material/Chip";

import { Estimate } from "../types/types";

import Link from "next/link";

export default function Component() {
  const [accountFilter, setAccountFilter] = useState("");
  const [placeFilter, setPlaceFilter] = useState("");

  const [{ data: estimates_, loading, error }] = useAxios({
    url: process.env.NEXT_PUBLIC_API + "/api/estimates",
    params: { account: accountFilter, place: placeFilter },
  });
  const estimates: Estimate[] = estimates_;

  return (
    <Layout title={"Devis"}>
      {loading && <LinearProgress />}

      {error && <Alert severity="error">{error.message}</Alert>}

      {estimates && (
        <>
          <TableContainer component={Paper}>
            <Table sx={{}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>

                  <TableCell>Etat</TableCell>

                  <TableCell>Client</TableCell>
                  <TableCell>Local</TableCell>

                  <TableCell>Machine</TableCell>
                  <TableCell>Reference</TableCell>
                </TableRow>
              </TableHead>

              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <TextField
                      label="Client"
                      onChange={(e) => setAccountFilter(e.target.value)}
                    />
                  </TableCell>

                  <TableCell>
                    <TextField
                      label="Local"
                      onChange={(e) => setPlaceFilter(e.target.value)}
                    />
                  </TableCell>

                  <TableCell> </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {estimates.map((r) => (
                  <TableRow
                    key={r.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left"> {r.id}</TableCell>
                    <TableCell align="left">
                      {" "}
                      <Chip
                        label={r.state}
                        color={
                          r.state === ESTIMATE_STATE.ACCEPTE
                            ? "success"
                            : r.state === ESTIMATE_STATE.A_FAIRE
                            ? "error"
                            : "warning"
                        }
                      />{" "}
                    </TableCell>
                    <TableCell align="right"> {r.account}</TableCell>

                    <TableCell align="right">{r.place}</TableCell>
                    <TableCell align="right">{r.unit}</TableCell>
                    <TableCell align="right">{r.reference}</TableCell>

                    <TableCell align="right">
                      <Link href={`/estimates/${r.id}`}>
                        {" "}
                        <OpenInNewIcon />{" "}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[50]}
            component="div"
            count={estimates.length}
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

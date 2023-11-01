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

import { formatDate } from "../utils";
import { MAINTENANCE_STATE } from "../consts";
import Chip from "@mui/material/Chip";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

import { Maintenance } from "../types/types";

import Link from "next/link";

export default function Component() {
  const [accountFilter, setAccountFilter] = useState("");
  const [placeFilter, setPlaceFilter] = useState("");

  const [{ data: maintenances_, loading, error }] = useAxios({
    url: process.env.NEXT_PUBLIC_API + "/api/maintenances",
    params: { account: accountFilter, place: placeFilter },
  });
  const maintenances: Maintenance[] = maintenances_;

  return (
    <Layout title={"Maintenance"}>
      {loading && <LinearProgress />}

      {error && <Alert severity="error">{error.message}</Alert>}

      {maintenances && (
        <>
          <TableContainer component={Paper}>
            <Table sx={{}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell align="right">
                    <TextField
                      label="Client"
                      onChange={(e) => setAccountFilter(e.target.value)}
                    />
                  </TableCell>

                  <TableCell align="right">
                    <TextField
                      label="Local"
                      onChange={(e) => setPlaceFilter(e.target.value)}
                    />
                  </TableCell>

                  <TableCell>Machine</TableCell>
                  <TableCell>Etat</TableCell>
                  <TableCell>Problème</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {maintenances.map((r) => (
                  <TableRow
                    key={r.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left"> {r.id}</TableCell>
                    <TableCell align="right"> {r.account}</TableCell>

                    <TableCell align="right">{r.place}</TableCell>
                    <TableCell align="right">{r.unit}</TableCell>
                    <TableCell align="left">
                      {" "}
                      <Chip
                        label={r.state}
                        color={
                          r.state === MAINTENANCE_STATE.FAIT
                            ? "success"
                            : "warning"
                        }
                      />{" "}
                    </TableCell>
                    <TableCell align="left">
                      {r.problem && <ReportProblemIcon color="error" />}
                    </TableCell>
                    <TableCell align="left">{formatDate(r.done_at)}</TableCell>
                    <TableCell align="right">
                      <Link href={`/maintenances/${r.id}`}>
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
            count={maintenances.length}
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

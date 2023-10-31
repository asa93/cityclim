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

import { userState } from "../context/user";
import { useHookstate } from "@hookstate/core";

import { formatDate } from "../utils";
import { MAINTENANCE_STATE } from "../consts";
import Chip from "@mui/material/Chip";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

export default function Component() {
  const userState_ = useHookstate(userState);
  const { loggedIn } = userState_.get();

  const [showForm, setShowForm] = useState(false);

  const [accountFilter, setAccountFilter] = useState("");
  const [placeFilter, setPlaceFilter] = useState("");

  const [{ data: places, loading, error }] = useAxios({
    url: process.env.NEXT_PUBLIC_API + "/api/maintenances",
    params: { account: accountFilter, place: placeFilter },
  });

  if (!loggedIn) return null;

  return (
    <Layout home title={"Maintenance"}>
      {loading && <LinearProgress />}

      {error && <Alert severity="error">{error.message}</Alert>}

      <Button variant="contained" onClick={() => setShowForm(!showForm)}>
        <AddCircleIcon />
      </Button>

      {places && (
        <>
          <TableContainer component={Paper}>
            <Table sx={{}} aria-label="simple table">
              <TableHead>
                <TableRow>
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
                {places.map((r) => (
                  <TableRow
                    key={r.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right">{r.account}</TableCell>
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[50]}
            component="div"
            count={places.length}
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
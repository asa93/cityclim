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

import React, { useState, useEffect } from "react";

import TablePagination from "@mui/material/TablePagination";

import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";

import { formatDate } from "../utils";
import { MAINTENANCE_STATE, resultPerPage } from "../consts";
import Chip from "@mui/material/Chip";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

import { Maintenance } from "../types/types";

import Link from "next/link";
import axios, { AxiosResponse } from "axios";

export default function Component() {
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);

  //filters
  const [accountFilter, setAccountFilter] = useState("");
  const [placeFilter, setPlaceFilter] = useState("");

  //pagination
  const [page, setPage] = useState(0);
  const [resCount, setRescount] = useState(0);

  //loading
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(
    function () {
      (async () => {
        setLoading(true);
        const res: AxiosResponse<any, any> = await axios.get(
          process.env.NEXT_PUBLIC_API + "/api/maintenances",
          {
            params: {
              account: accountFilter,
              place: placeFilter,
              range0: page * resultPerPage,
              range1: (page + 1) * resultPerPage - 1,
            },
          }
        );

        setMaintenances(res.data.data as Maintenance[]);
        setRescount(res.data.count);
        setLoading(false);

        if (error) setError(error as any);
      })();
    },
    [page, accountFilter, placeFilter]
  );

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
                  <TableCell>Client</TableCell>

                  <TableCell>Local</TableCell>

                  <TableCell>Machine</TableCell>
                  <TableCell>Etat</TableCell>
                  <TableCell>Problème</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>

              <TableHead>
                <TableRow>
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
            rowsPerPageOptions={[0]}
            component="div"
            count={resCount}
            rowsPerPage={resultPerPage}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            onRowsPerPageChange={() => {}}
          />
        </>
      )}
    </Layout>
  );
}

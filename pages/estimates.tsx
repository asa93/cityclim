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

import { ESTIMATE_STATE, resultPerPage } from "../consts";
import Chip from "@mui/material/Chip";

import { Estimate } from "../types/types";

import Link from "next/link";

import axios, { AxiosResponse } from "axios";

export default function Component() {
  const [estimates, setEstimates] = useState<Estimate[]>([]);

  //filter
  const [accountFilter, setAccountFilter] = useState("");
  const [placeFilter, setPlaceFilter] = useState("");

  const [page, setPage] = useState(0);
  const [resCount, setResCount] = useState(0);

  //loading
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(
    function () {
      (async () => {
        setLoading(true);
        const res: AxiosResponse<any, any> = await axios.get(
          process.env.NEXT_PUBLIC_API + "/api/estimates",
          {
            params: {
              account: accountFilter,
              place: placeFilter,
              range0: page * resultPerPage,
              range1: (page + 1) * resultPerPage - 1,
            },
          }
        );

        setEstimates(res.data.data as Estimate[]);
        setResCount(res.data.count);
        setLoading(false);

        if (error) setError(error as any);
      })();
    },
    [page, accountFilter, placeFilter]
  );

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

                  <TableCell>#Maintenance</TableCell>
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
                    <TableCell align="right">{r.maintenance}</TableCell>

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

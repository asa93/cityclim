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

import useAxios from "axios-hooks";

export default function Clients({ allPostsData }) {
  const [{ data: accounts, loading, error }, refetch] =
    useAxios("/api/clients");

  console.log("data", accounts);

  if (accounts)
    return (
      <Layout home title={"Clients"}>
        <TableContainer component={Paper}>
          <Table sx={{}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <TextField label="Nom" />
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

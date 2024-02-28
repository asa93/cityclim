import Layout from "../components/layout";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TextField, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import useAxios from "axios-hooks";
import React, { useState } from "react";
import TablePagination from "@mui/material/TablePagination";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import axios from "axios";

import { Reference } from "../types/types";
import Snackbar from "@mui/material/Snackbar";

import Link from "next/link";

export default function Component() {
  const [accountFilter, setAccountFilter] = useState("");

  const [{ data: references_, loading, error }] = useAxios({
    url: process.env.NEXT_PUBLIC_API + "/api/references",
    params: { account: accountFilter },
  });
  const references: Reference[] = references_;

  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState<Reference["name"]>("");
  const [newDoc, setNewDoc] = useState<Reference["doc"]>("");
  const [newCheckpoints, setNewCheckPoints] = useState([]);
  const [saving, setSaving] = useState(false);
  const [toast, showToast] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    if (newName)
      try {
        await axios.post(process.env.NEXT_PUBLIC_API + "/api/references", {
          name: newName,
          doc: newDoc,
          checkpoints: newCheckpoints,
        });
        showToast(true);
      } catch (e) {
        console.log(e.message);
      }
    setSaving(false);
  };

  const handleCheckpoint = async (text) => {
    const obj = [];
    for (const checkpoint of text.split("\n")) {
      obj.push({ name: checkpoint });
    }

    setNewCheckPoints(obj);
  };

  const formatCheckpoints = (checkpoints): string => {
    return checkpoints.map((c) => c.name).join(";");
    //.slice(0, 3);
  };

  return (
    <Layout title={"Références"}>
      {(loading || saving) && <LinearProgress />}

      <Snackbar
        open={toast}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={() => {
          showToast(false);
        }}
        message="Enregistré"
        action={null}
      />

      {error && <Alert severity="error">{error.message}</Alert>}

      <Button variant="contained" onClick={() => setShowForm(!showForm)}>
        <AddCircleIcon />
      </Button>

      {showForm && (
        <>
          <h2>Ajouter Référence</h2>

          <TextField label="Nom" onChange={(e) => setNewName(e.target.value)} />

          <TextField
            label="Lien Doc"
            onChange={(e) => setNewDoc(e.target.value)}
          />

          <h3>Points de contrôle</h3>

          <TextField
            fullWidth
            multiline
            label={""}
            defaultValue={newCheckpoints}
            onChange={(e) => handleCheckpoint(e.target.value)}
            placeholder="Sautez une ligne entre chaque valeur. 2 Références ne peuvent pas porter le même nom."
          />

          <Button variant="contained" onClick={handleSave}>
            Enregistrer
          </Button>

          <Divider />
        </>
      )}
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
                    <TableCell align="left">
                      {" "}
                      <Link target="_blank" href={r.doc ?? ""}>
                        {" "}
                        {r.doc}{" "}
                      </Link>{" "}
                    </TableCell>
                    <TableCell align="left">
                      {formatCheckpoints(r.checkpoints)}
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

import React, { useState, useEffect } from "react";
import useAxios from "axios-hooks";
import axios from "axios";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import { Estimate } from "../../types/types";
import { Grid, Button, TextField, Divider } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
import { formatDate } from "../../utils";
import Snackbar from "@mui/material/Snackbar";
import Link from "next/link";

const states = [
  {
    value: "A FAIRE" as Estimate["state"],
    label: "A FAIRE",
  },
  {
    value: "FAIT" as Estimate["state"],
    label: "FAIT",
  },
  {
    value: "ACCEPTE" as Estimate["state"],
    label: "ACCEPTE",
  },
];

export default function Component() {
  const id = useRouter().query.id;

  const [{ data, loading, error }] = useAxios({
    url: process.env.NEXT_PUBLIC_API + "/api/estimates",
    params: { id: id, account: "", place: "" },
  });

  const estimate: Estimate = data && data?.data[0];

  const [state, setState] = useState<Estimate["state"]>("A FAIRE");
  const [doc_link, setDocLink] = useState("");

  const [toast, showToast] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setState(estimate ? estimate.state : "A FAIRE");
    setDocLink(estimate ? estimate.doc_link : "");
  }, [estimate]);

  const handleSave = async () => {
    setSaving(true);
    await axios.post(process.env.NEXT_PUBLIC_API + "/api/estimates", {
      id,
      state,
      doc_link,
    });
    setSaving(false);
    showToast(true);
  };

  if (!id) return null;

  console.log("estimate", estimate);

  return (
    <Layout title={"Devis #" + id}>
      {(loading || saving) && <LinearProgress />}

      {error && <Alert severity="error">{error.message}</Alert>}

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

      {estimate && (
        <Grid container spacing={0} className="estimate-table">
          <Grid md={2} xs={6} className="head">
            <h2>Client</h2>
          </Grid>
          <Grid md={2} xs={6} className="head">
            <h2>Local</h2>{" "}
          </Grid>
          <Grid md={2} xs={6} className="head">
            <h2>Machine</h2>{" "}
          </Grid>

          <Grid md={2} xs={6} className="head">
            <h2>Réf.</h2>{" "}
          </Grid>

          <Grid md={2} xs={6} className="head">
            <h2>#Maint.</h2>{" "}
          </Grid>

          <Grid md={2} xs={6} className="head">
            <h2>Créé le</h2>{" "}
          </Grid>

          <Grid md={2} xs={6}>
            {estimate.account}{" "}
          </Grid>
          <Grid md={2} xs={6}>
            {estimate.place}{" "}
          </Grid>
          <Grid md={2} xs={6}>
            {estimate.unit}{" "}
          </Grid>

          <Grid md={2} xs={6}>
            {estimate.reference}{" "}
          </Grid>

          <Grid md={2} xs={6}>
            <Link
              href={`/maintenances/${estimate.maintenance}`}
              className="white"
            >
              {estimate.maintenance}{" "}
            </Link>
          </Grid>

          <Grid md={2} xs={6}>
            {formatDate(estimate.created_at)}{" "}
          </Grid>

          <Grid md={12} xs={12}>
            {" "}
            <Divider />{" "}
          </Grid>

          <Grid md={3} xs={6} className="head">
            <h2> Etat</h2>
          </Grid>

          <Grid md={3} xs={6} className="head">
            <h2>Lien Document</h2>
          </Grid>

          <Grid md={6} xs={0}></Grid>

          <Grid md={3} xs={6} className="head">
            <TextField
              fullWidth
              select
              value={state}
              SelectProps={{
                native: true,
              }}
              helperText=""
              className={
                estimate.state === "ACCEPTE" ? "state-done" : "state-todo"
              }
              onChange={(e) => setState(e.target.value as Estimate["state"])}
            >
              {states.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </Grid>

          <Grid md={5} xs={6} className="head">
            <TextField
              fullWidth
              multiline
              label={""}
              defaultValue={doc_link}
              onChange={(e) => setDocLink(e.target.value)}
            />
          </Grid>
        </Grid>
      )}

      <Button variant="contained" onClick={handleSave}>
        Enregistrer
      </Button>
    </Layout>
  );
}

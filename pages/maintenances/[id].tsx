import React, { useState, useEffect } from "react";
import useAxios from "axios-hooks";
import axios from "axios";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import { Maintenance } from "../../types/types";
import { Grid, Button, TextField, Divider, Checkbox } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";

import { formatDate } from "../../utils";
import Snackbar from "@mui/material/Snackbar";

const states = [
  {
    value: "A FAIRE" as Maintenance["state"],
    label: "A FAIRE",
  },
  {
    value: "FAIT" as Maintenance["state"],
    label: "FAIT",
  },
];

export default function Component() {
  const id = useRouter().query.id;

  const [{ data, loading, error }] = useAxios({
    url: process.env.NEXT_PUBLIC_API + "/api/maintenances",
    params: { id: id, account: "", place: "" },
  });

  const maintenance: Maintenance = data ? data[0] : null;

  const [state, setState] = useState<Maintenance["state"]>("A FAIRE");
  const [problem, setProblem] = useState(false);
  const [observations, setObservations] = useState("");
  const [checkpoints, setCheckpoints] = useState({});

  const [toast, showToast] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setState(maintenance ? maintenance.state : "A FAIRE");
    setObservations(maintenance ? maintenance.observations : "");
    setProblem(maintenance ? maintenance.problem : false);

    if (maintenance)
      setCheckpoints(
        maintenance.checkpoints
          ? maintenance.checkpoints
          : maintenance.checkpoints_ref
      );
  }, [maintenance]);

  const handleSave = async () => {
    setSaving(true);
    await axios.post(process.env.NEXT_PUBLIC_API + "/api/maintenances", {
      id,
      state,
      problem,
      observations,
      checkpoints,
    });
    setSaving(false);
    showToast(true);
  };

  const handleCheckpoint = async (index, value) => {
    checkpoints[index].checked = value;
    setCheckpoints(checkpoints);
  };
  if (!id) return null;

  console.log("maintenance", maintenance);
  console.log("checkpoints", checkpoints);

  return (
    <Layout title={"Maintenance #" + id}>
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

      {maintenance && (
        <Grid container spacing={0} className="maintenance-table">
          <Grid md={3} xs={6} className="head">
            Client{" "}
          </Grid>
          <Grid md={2} xs={6} className="head">
            Local{" "}
          </Grid>
          <Grid md={2} xs={6} className="head">
            Machine{" "}
          </Grid>

          <Grid md={2} xs={6} className="head">
            Référence{" "}
          </Grid>

          <Grid md={3} xs={6} className="head">
            Fait le{" "}
          </Grid>

          <Grid md={3} xs={6}>
            {maintenance.account}{" "}
          </Grid>
          <Grid md={2} xs={6}>
            {maintenance.place}{" "}
          </Grid>
          <Grid md={2} xs={6}>
            {maintenance.unit}{" "}
          </Grid>
          <Grid md={2} xs={6}>
            {maintenance.reference}{" "}
          </Grid>
          <Grid md={3} xs={6}>
            {formatDate(maintenance.done_at)}{" "}
          </Grid>

          <Grid md={12} xs={12}>
            {" "}
            <Divider />{" "}
          </Grid>

          <Grid md={4} xs={6} className="head">
            Etat
          </Grid>
          <Grid md={4} xs={6} className="head">
            Devis
          </Grid>
          <Grid md={4} xs={6} className="head">
            Problème identifié
          </Grid>

          <Grid md={4} xs={6} className="head">
            <TextField
              fullWidth
              select
              value={state}
              SelectProps={{
                native: true,
              }}
              helperText=""
              className={
                maintenance.state === "FAIT" ? "state-done" : "state-todo"
              }
              onChange={(e) => setState(e.target.value as Maintenance["state"])}
            >
              {states.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid md={4} xs={6} className="head">
            <TextField label="" onChange={() => {}} />
          </Grid>
          <Grid md={4} xs={6} className="head">
            <Checkbox
              checked={problem}
              onChange={(e) => setProblem(e.target.checked)}
            />
          </Grid>

          <Grid md={12} xs={12} className="head">
            Observations
          </Grid>
          <Grid md={12} xs={12} className="head">
            <TextField
              fullWidth
              multiline
              label={""}
              defaultValue={observations}
              onChange={(e) => setObservations(e.target.value)}
            />
          </Grid>

          <Grid md={12} xs={12} className="head">
            Points de contrôle
          </Grid>
          <Grid md={12} xs={12} className="head">
            {checkpoints &&
              Object.keys(checkpoints).length > 0 &&
              (checkpoints as Array<any>).map((c, i) => {
                return (
                  <div key={i}>
                    {" "}
                    <Checkbox
                      checked={c.checked}
                      onChange={(e) => handleCheckpoint(i, e.target.checked)}
                    />
                    {c.name}
                  </div>
                );
              })}
          </Grid>
        </Grid>
      )}

      <Button variant="contained" onClick={handleSave}>
        Enregistrer
      </Button>
    </Layout>
  );
}

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

  useEffect(() => {
    setState(maintenance ? maintenance.state : "A FAIRE");
    setObservations(maintenance ? maintenance.observations : "");
    setProblem(maintenance ? maintenance.problem : false);
  }, [maintenance]);

  const handleSave = async () => {
    await axios.post(process.env.NEXT_PUBLIC_API + "/api/maintenances", {
      id,
      state,
      problem,
      observations,
    });
  };

  if (!id) return null;
  if (!data) return null;

  return (
    <Layout title={"Maintenance #" + id}>
      {loading && <LinearProgress />}
      {error && <Alert severity="error">{error.message}</Alert>}

      <Grid container spacing={0} className="maintenance-table">
        <Grid md={3} className="head">
          Client{" "}
        </Grid>
        <Grid md={2} className="head">
          Local{" "}
        </Grid>
        <Grid md={2} className="head">
          Machine{" "}
        </Grid>

        <Grid md={3} className="head">
          Fait le{" "}
        </Grid>

        <Grid md={3}>{maintenance.account} </Grid>
        <Grid md={2}>{maintenance.place} </Grid>
        <Grid md={2}>{maintenance.unit} </Grid>
        <Grid md={3}>{formatDate(maintenance.done_at)} </Grid>

        <Grid md={12}>
          {" "}
          <Divider />{" "}
        </Grid>

        <Grid md={4} className="head">
          Etat
        </Grid>
        <Grid md={4} className="head">
          Devis
        </Grid>
        <Grid md={4} className="head">
          Problème identifié
        </Grid>

        <Grid md={4} className="head">
          <TextField
            fullWidth
            select
            defaultValue={state}
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
        <Grid md={4} className="head">
          <TextField label="" onChange={() => {}} />
        </Grid>
        <Grid md={4} className="head">
          <Checkbox
            checked={problem}
            onChange={(e) => setProblem(e.target.checked)}
          />
        </Grid>

        <Grid md={12} className="head">
          Observations
        </Grid>
        <Grid md={12} className="head">
          <TextField
            fullWidth
            multiline
            label={""}
            defaultValue={observations}
            onChange={(e) => setObservations(e.target.value)}
          />
        </Grid>
      </Grid>
      <Button variant="contained" onClick={handleSave}>
        Enregistrer
      </Button>
    </Layout>
  );
}

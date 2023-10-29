import Layout from "../components/layout";
import React, { useState } from "react";
import { Grid, Button, TextField } from "@mui/material";
import axios from "axios";

export default function Home() {
  const [email, setEmail] = useState("asa93@live.fr");
  const [pwd, setPwd] = useState("mdp");

  const login = async () => {
    await axios.post(process.env.NEXT_PUBLIC_API + "/api/auth", {
      email: email,
      password: pwd,
    });
  };

  return (
    <Layout home title={""}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid md={8}>
          <TextField
            id="outlined-basic"
            label="Email"
            xs={4}
            className="textfield"
            InputProps={{
              className: "textfield",
            }}
            sx={{
              input: {
                color: "black",
                background: "white",
              },
            }}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>

        <Grid md={8}>
          <TextField
            id="outlined-basic"
            label="Mot de passe"
            sx={{
              input: {
                color: "black",
                background: "white",
              },
            }}
            onChange={(e) => setPwd(e.target.value)}
          />
        </Grid>

        <Button variant="contained" onClick={login}>
          Connexion
        </Button>
      </Grid>
    </Layout>
  );
}

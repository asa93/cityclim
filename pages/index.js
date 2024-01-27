import Layout from "../components/layout";
import React, { useState } from "react";
import { Grid, Button, TextField } from "@mui/material";
import axios from "axios";

import { userState } from "../context/user";
import { useHookstate } from "@hookstate/core";
import Divider from "@mui/material/Divider";

export default function Home() {
  const userState_ = useHookstate(userState);
  const { loggedIn, email: email2, role } = userState_.get();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const login = async () => {
    try {
      await axios.post(process.env.NEXT_PUBLIC_API + "/api/auth", {
        email: email,
        password: pwd,
      });

      window.location.reload();
    } catch (e) {
      console.log("error", e.toString());
    }
  };

  const logout = async () => {
    try {
      await axios.post(process.env.NEXT_PUBLIC_API + "/api/logout", {});

      userState_.set({ loggedIn: false, email: null, role: null });

      window.location.reload();
    } catch (e) {
      console.log("error", e.toString());
    }
  };

  return (
    <Layout home title={""}>
      {!loggedIn && (
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
              type="password"
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
      )}
      {loggedIn && (
        <div>
          <div>email: {email2}</div>
          <div> rôle: {role}</div>
          <div>
            <Button variant="contained" onClick={logout}>
              Déconnexion
            </Button>
          </div>
        </div>
      )}
    </Layout>
  );
}

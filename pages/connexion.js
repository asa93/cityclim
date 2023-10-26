import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import Image from "next/image";

import { Grid, Button, TextField } from "@mui/material";

export default function Home({ allPostsData }) {
  return (
    <Layout home title={"Cityclim App"}>
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
          />
        </Grid>

        <Button variant="contained">Connexion</Button>
      </Grid>

      <section className={utilStyles.headingMd}></section>
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

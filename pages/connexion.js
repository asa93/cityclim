import Layout, { siteTitle } from "../components/layout";

import { getSortedPostsData } from "../lib/posts";

import { Grid, Button, TextField } from "@mui/material";

export default function Home({ allPostsData }) {
  return (
    <Layout home title={"CityClim App"}>
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

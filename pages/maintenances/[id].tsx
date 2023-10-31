import React from "react";

import Layout from "../../components/layout";

import useAxios from "axios-hooks";

import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";

import { Maintenance } from "../../types/types";

import { useRouter } from "next/router";

export default function Component() {
  const id = useRouter().query.id;

  if (!id) return null;

  const [{ data, loading, error }] = useAxios({
    url: process.env.NEXT_PUBLIC_API + "/api/maintenances",
    params: { id: id, account: "", place: "" },
  });

  const maintenance: Maintenance = data ? data[0] : null;
  console.log("maintenance ", id, data, error);

  if (!data) return null;

  return (
    <Layout title={"Maintenance #" + id}>
      {loading && <LinearProgress />}
      {error && <Alert severity="error">{error.message}</Alert>}
      {maintenance.id} {maintenance.state} {maintenance.done_at}
    </Layout>
  );
}

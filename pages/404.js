import React from "react";
import Layout from "../components/layout";
import Image from "next/image";

export default function Custom404() {
  return (
    <Layout home title={""}>
      <Image
        src="/images/shrug.png"
        width={500}
        height={500}
        alt="Page non trouvée"
      />
      <h1 style={{ textAlign: "center" }}>Page non trouvée !</h1>
    </Layout>
  );
}

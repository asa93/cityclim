import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
export const siteTitle = "CityClim App";
import SideBar from "./sidebar";
import React from "react";
import Divider from "@mui/material/Divider";

import { userState } from "../context/user";
import { useHookstate } from "@hookstate/core";
import { useRouter } from "next/router";

export default function Layout({ children, title }) {
  const userState_ = useHookstate(userState);
  const { loggedIn } = userState_.get();

  const router = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="CityClim App" />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <header className={styles.header}>
        <h1 className={utilStyles.heading2Xl}>{title}</h1>
      </header>
      <main>
        <SideBar />
        <Divider />
        {router.route !== "/" && !loggedIn ? null : children}
      </main>
    </div>
  );
}

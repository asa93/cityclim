import "../styles/global.css";
import React from "react";
import useAxios from "axios-hooks";

import { userState } from "../context/user";
import { useHookstate } from "@hookstate/core";

export default function App({ Component, pageProps }) {
  const userState_ = useHookstate(userState);

  const [{ data, error }] = useAxios({
    url: process.env.NEXT_PUBLIC_API + "/api/auth",
  });

  if (error || !data)
    userState_.set({ loggedIn: false, email: null, role: null });
  else {
    const { email, role } = data.data;
    userState_.set({ loggedIn: true, email, role });
  }

  return <Component {...pageProps} />;
}

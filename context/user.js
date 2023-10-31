import { hookstate } from "@hookstate/core";

const userInit = { loggedIn: false, email: null, role: null };

export const userState = hookstate(userInit);

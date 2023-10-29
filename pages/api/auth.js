import { getCookies, setCookie } from "cookies-next";
import { createClient } from "@supabase/supabase-js";

import jwt from "jsonwebtoken";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async (req, res) => {
  if (req.method == "GET") {
    const { session } = getCookies({ req, res });

    if (session) {
      const decoded = jwt.verify(session, process.env.JWT_SECRET);
      return res.status(200).json({ data: decoded });
    } else return res.status(400).json({ error: "no session" });
  } else if (req.method == "POST") {
    const { email, password } = req.body;

    let { data, error } = await supabase
      .from("Users")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .limit(1);

    if (error)
      return res.status(400).json({ data: null, error: error.toString() });

    const user = data[0];

    if (user) {
      const userData = {
        email: user.email,
        role: user.role,
      };

      const token = jwt.sign(userData, process.env.JWT_SECRET, {
        expiresIn: "365 days",
      });

      setCookie("session", token, { req, res, maxAge: 60 * 60 * 24 });
      return res.status(200).json({ data: userData, error: null });
    } else {
      return res.status(400).json({ data: "", error: "login failed" });
    }
  } else {
    return res.status(400).json({ data: null, error: "method not authorized" });
  }
};

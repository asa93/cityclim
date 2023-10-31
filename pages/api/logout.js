import { deleteCookie, getCookies } from "cookies-next";

export default async (req, res) => {
  if (req.method == "POST") {
    console.log(getCookies({ req, res }));
    deleteCookie("session", { req, res });
    console.log(getCookies({ req, res }));

    return res.status(200).json({ data: "", error: null });
  } else {
    return res.status(400).json({ data: "", error: "login failed" });
  }
};

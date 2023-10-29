import { deleteCookie } from "cookies-next";

export default async (req, res) => {
  if (req.method == "POST") {
    deleteCookie("session");

    return res.status(200).json({ data: "", error: null });
  } else {
    return res.status(400).json({ data: "", error: "login failed" });
  }
};

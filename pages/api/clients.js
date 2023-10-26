import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async (req, res) => {
  console.log("req", req.query);

  if (req.method == "GET") {
    let { data, error } = await supabase.from("Accounts").select("*");

    //console.log("data", Accounts, error);

    if (error) return res.status(400).json({ data: null, error: error });
    else res.status(200).json(data);
  } else {
    if (error)
      return res
        .status(400)
        .json({ data: null, error: "method not authorized" });
  }
};

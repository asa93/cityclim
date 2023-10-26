import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async (req, res) => {
  const { name } = req.query;

  if (req.method == "GET") {
    let { data, error } = await supabase
      .from("Accounts")
      .select("*")
      .ilike("name", `%${name}%`);

    //console.log("data", Accounts, error);

    if (error) return res.status(400).json({ data: null, error: error });
    else res.status(200).json(data);
  } else if (req.method == "POST") {
    const { name, address } = req.body;

    const { data, error } = await supabase
      .from("Accounts")
      .insert([{ name: name, address: address }])
      .select();

    res.status(200).json({ error: null });
  } else {
    if (error)
      return res
        .status(400)
        .json({ data: null, error: "method not authorized" });
  }
};

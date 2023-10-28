import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async (req, res) => {
  const { account, place } = req.query;

  if (req.method == "GET") {
    let { data, error } = await supabase
      .from("Units")
      .select("name, Places!inner ( name, Accounts!inner (name) )  ")
      .ilike("Places.name", `%${place}%`)
      .ilike("Places.Accounts.name", `%${account}%`)
      .limit(50);

    if (error) return res.status(400).json({ data: null, error: error });
    else {
      data = data.map((r) => {
        console.log(r);
        return {
          name: r.name,
          place: r.Places.name,
          account: r.Places.Accounts.name,
        };
      });
      res.status(200).json(data);
    }
  } else if (req.method == "POST") {
    //todo
    const { name, account } = req.body;

    await supabase
      .from("Units")
      .insert([{ name: name, account: account }])
      .select();

    res.status(200).json({ error: null });
  } else {
    return res.status(400).json({ data: null, error: "method not authorized" });
  }
};

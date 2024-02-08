import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async (req, res) => {
  const { account, place, range0, range1 } = req.query;

  if (req.method == "GET") {
    let query = supabase
      .from("Units")
      .select("id, name, Places!inner( name, Accounts!inner(name) )  ", {
        count: "exact",
      })
      .ilike("Places.name", `%${place}%`)
      .ilike("Places.Accounts.name", `%${account}%`);

    if (range1 - range0 < 100 && range1 - range0 >= 0)
      query = query.range(range0, range1);
    else query = query.limit(100);

    let { data, error, count } = await query.order("id", { ascending: true });

    if (error) return res.status(400).json({ data: null, error: error });
    else {
      data = data.map((r) => {
        return {
          place: r.Places?.name,
          account: r.Places?.Accounts?.name,
          ...r,
        };
      });
      res.status(200).json({ data: data, count: count });
    }
  } else if (req.method == "POST") {
    //todo
    const { name, account } = req.body;

    const { error } = await supabase
      .from("Units")
      .insert([{ name: name, account: account }])
      .select();

    res.status(error ? 400 : 200).json({ error });
  } else {
    return res.status(400).json({ data: null, error: "method not authorized" });
  }
};

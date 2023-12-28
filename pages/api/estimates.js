import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async (req, res) => {
  const { account, place, id } = req.query;

  if (req.method == "GET") {
    let query = supabase
      .from("Estimates")
      .select(
        "* , Units!inner( id, reference, Places!inner (name, Accounts!inner(name) ), References!inner(checkpoints) )"
      )
      .ilike("Units.Places.name", `%${place}%`)
      .ilike("Units.Places.Accounts.name", `%${account}%`)

      .limit(100);

    if (id) {
      query = query.eq("id", id);
    }

    let { data, error } = await query;

    if (error) return res.status(400).json({ data: null, error: error });
    else {
      data = data.map((r) => {
        console.log(r);
        return {
          place: r.Units.Places.name,
          account: r.Units.Places.Accounts.name,
          reference: r.Units.reference,
          checkpoints_ref: r.Units.References.checkpoints,
          ...r,
        };
      });
      res.status(200).json(data);
    }
  } else if (req.method == "POST") {
    const { id, state, doc_link } = req.body;

    let object = { state, doc_link };

    console.log(object);
    const { data, error } = await supabase
      .from("Estimates")
      .update(object)
      .eq("id", id);

    res.status(200).json({ data, error });
  } else {
    return res.status(400).json({ data: null, error: "method not authorized" });
  }
};

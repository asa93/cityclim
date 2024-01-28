import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async (req, res) => {
  const { account, place, id, range0, range1 } = req.query;

  const role = req.headers["x-user-role"];
  const client_id = req.headers["x-user-client_id"];

  if (req.method == "GET") {
    let query = supabase
      .from("Maintenances")
      .select(
        "* , Estimates!inner(id), Units!inner( id, reference, serial, Places!inner (name, Accounts!inner(name) ), References!inner(checkpoints) )",
        { count: "exact" }
      )
      .ilike("Units.Places.name", `%${place}%`)
      .ilike("Units.Places.Accounts.name", `%${account}%`);

    if (id) {
      query = query.eq("id", id);
    } else if (range1 - range0 < 100 && range1 - range0 >= 0)
      query = query.range(range0, range1);
    else query = query.limit(100);

    if (role === "CLIENT")
      query = query.eq("Units.Places.Accounts.id", client_id);

    let { data, count, error } = await query;

    if (error) return res.status(400).json({ data: null, error: error });
    else {
      data = data.map((r) => {
        return {
          place: r.Units.Places.name,
          account: r.Units.Places.Accounts.name,
          reference: r.Units.reference,
          checkpoints_ref: r.Units.References.checkpoints,
          serial: r.Units.serial,
          estimate_id:
            r.Estimates.length && r.Estimates[r.Estimates.length - 1]?.id, //returns latest estimate if many
          ...r,
        };
      });
      res.status(200).json({ data: data, count: count });
    }
  } else if (req.method == "POST") {
    const { id, state, problem, observations, checkpoints } = req.body;

    let object = { problem, state, observations, checkpoints };

    const { data, error } = await supabase
      .from("Maintenances")
      .update(object)
      .eq("id", id);

    return res.status(200).json({ data, error });
  } else {
    return res.status(400).json({ data: null, error: "method not authorized" });
  }
};

import { createClient } from "@supabase/supabase-js";
import { getCookies } from "cookies-next";
import jwt from "jsonwebtoken";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async (req, res) => {
  const { account, place, id } = req.query;

  const { session } = getCookies({ req, res });

  let decoded;
  if (session) {
    decoded = jwt.verify(session, process.env.JWT_SECRET);
  }

  if (req.method == "GET") {
    let query = supabase
      .from("Maintenances")
      .select(
        "* , Units!inner( id, reference, serial, Places!inner (name, Accounts!inner(name) ), References!inner(checkpoints) )"
      )
      .ilike("Units.Places.name", `%${place}%`)
      .ilike("Units.Places.Accounts.name", `%${account}%`)

      .limit(100);

    if (id) {
      query = query.eq("id", id);
    }
    if (decoded.role === "CLIENT" && decoded.client_id)
      query = query.eq("id", decoded.client_id);

    let { data, error } = await query;

    if (error) return res.status(400).json({ data: null, error: error });
    else {
      data = data.map((r) => {
        return {
          place: r.Units.Places.name,
          account: r.Units.Places.Accounts.name,
          reference: r.Units.reference,
          checkpoints_ref: r.Units.References.checkpoints,
          serial: r.Units.serial,
          ...r,
        };
      });
      res.status(200).json(data);
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

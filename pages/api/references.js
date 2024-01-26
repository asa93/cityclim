import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async (req, res) => {
  const { id } = req.query;

  if (req.method == "GET") {
    let query = supabase
      .from("References")
      .select("*")

      .limit(100);

    if (id) {
      query = query.eq("id", id);
    }

    let { data, error } = await query;

    if (error) return res.status(400).json({ data: null, error: error });
    else {
      res.status(200).json(data);
    }
  } else if (req.method == "POST") {
    const { id, doc, checkpoints, name } = req.body;

    let object = { doc, checkpoints, name };

    if (!id) {
      const { data, error } = await supabase
        .from("References")
        .insert([object])
        .select();

      return res.status(error ? 400 : 200).json({ data, error });
    } else {
      const { data, error } = await supabase
        .from("Maintenances")
        .update(object)
        .eq("id", id);
      return res.status(error ? 400 : 200).json({ data, error });
    }
  } else {
    return res.status(400).json({ data: null, error: "method not authorized" });
  }
};

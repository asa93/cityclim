import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);


export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {

  // const query = supabase
  // .from("Maintenances")
  // .select(
  //   "* , Units!inner( id, serial, Places!inner (name, Accounts!inner(name) ), References!inner(checkpoints) )"
  // )

  // .limit(2);

  // const { data, error } = await query;

  const { data, error } = await supabase.rpc('job_maintenance')

  if(!error)
  response.status(200).json({
    body: data,
    query: request.query,
    cookies: request.cookies,
  });
  else 
  response.status(400).json({
    body: {msg: error.message},
    query: request.query,
    cookies: request.cookies,
  });
}

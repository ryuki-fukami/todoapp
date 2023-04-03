import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from "pg";

export default async (req: NextApiRequest, res: NextApiResponse) => {

  const client = new Client({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
  });

  await client.connect();
  try {
    const result = await client.query("select * from todo_data order by id asc");
    const data = result.rows;
    res.status(200).json({ data });
  } catch (erreor) {
    res.status(500).end();
  } finally {
    await client.end();
  }
};

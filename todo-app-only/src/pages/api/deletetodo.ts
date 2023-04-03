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
        const todo = req.body;
        const result = await client.query(
            "DELETE FROM todo_data WHERE id = $1",
            [todo.id]
        );
        const data = result;
        res.status(200).json({ data });
    } catch (erreor) {
        res.status(500).end();
    } finally {
        await client.end();
    }

};

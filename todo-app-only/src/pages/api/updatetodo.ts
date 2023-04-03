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
            "UPDATE todo_data SET todo_name=$1, todo_detail=$2, deadline=$3, status=$4 WHERE id=$5",
            [todo.name, todo.detail, todo.deadline, todo.status, todo.id]
        );
        const data = result;
        res.status(200).json({ data });
    } catch (erreor) {
        res.status(500).end();
    } finally {
        await client.end();
    }

};

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
            "INSERT INTO todo_data (input_date, todo_name, todo_detail, deadline, status) VALUES ($1, $2, $3, $4, $5)",
            [todo.date, todo.name, todo.detail, todo.deadline, todo.status]
        );
        const data = result;
        res.status(200).json({ data });
    } catch (erreor) {
        res.status(500).end();
    } finally {
        await client.end();
    }

};

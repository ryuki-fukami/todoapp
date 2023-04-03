    const express = require('express');
    const app = express();
    const pg = require("pg");
    const cors = require('cors');
    const bodyParser = require('body-parser'); 

    var pgPool = new pg.Pool({
        database: "testdb",
        user: "postgres",
        password: "postgres",
        host: "localhost",
        port: 5432,
    });

    app.use(cors()); 
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    app.get('/', (req, res) => {
        res.status(200).send("Express!!");
  
    });

    // todoリスト取得
    app.get("/todolist", function (req, res) {
        var query = {
        text:
            'select * from todo_data order by id asc',
        };
        pgPool.connect(function (err, client, done) {
        if (err) {
            console.log(err);
        } else {
            client
                .query(query)
                .then((result) => {
                    res.status(200).json({
                        data: result.rows
                    });

                })
                .catch((e) => {
                    console.error(e.stack);
                    res.status(500).json({
                        error: e.stack
                    });
                })
                .finally(() => {
                done(); 
                });
        }
        });
    });

    // 新規todo追加取得
    app.post("/addtodo", function (req, res) {
        const todo = req.body;
        var query = {
        text:
            'INSERT INTO todo_data (input_date, todo_name, todo_detail, deadline, status) VALUES ($1, $2, $3, $4, $5)',
        values: [todo.date, todo.name, todo.detail, todo.deadline, todo.status]
        };
        pgPool.connect(function (err, client, done) {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: err });
        }
        client
            .query(query)
            .then((result) => {
            res.status(200).json({
                data: result.rows
            });
            })
            .catch((e) => {
            console.error(e.stack);
            return res.status(500).json({ error: e });
            })
            .finally(() => {
            done(); 
            });
        });
    });
    

    // todo更新取得
    app.post("/updatetodo", function (req, res) {
        const todo = req.body;
        var query = {
            text: 'UPDATE todo_data SET input_date=$1, todo_name=$2, todo_detail=$3, deadline=$4, status=$5 WHERE id=$6',
            values: [todo.date, todo.name, todo.detail, todo.deadline, todo.status, todo.id]            
        };
        pgPool.connect(function (err, client, done) {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: err });
        }
        client
            .query(query)
            .then((result) => {
            res.status(200).json({
                data: result.rows
            });
            })
            .catch((e) => {
            console.error(e.stack);
            return res.status(500).json({ error: e });
            })
            .finally(() => {
            done(); 
            });
        });
    });
    
    // todo削除取得
    app.post("/deletetodo", function (req, res) {
        const todo = req.body;
        var query = {
            text: 'DELETE FROM todo_data WHERE id = $1',
            values: [todo.id]
        };
        pgPool.connect(function (err, client, done) {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: err });
        }
        client
            .query(query)
            .then((result) => {
            res.status(200).json({
                data: result.rows
            });
            })
            .catch((e) => {
            console.error(e.stack);
            return res.status(500).json({ error: e });
            })
            .finally(() => {
            done(); 
            });
        });
    });



    // 5000番ポートで待機
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
    console.log(`${PORT}番のポートで待機中です...`);
    });
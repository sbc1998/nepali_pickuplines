import mysql from 'mysql2';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();

let con= mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

con.connect((err)=> {
    if(err) {
        console.log("database connection failed: ", err);
    }
    else {
        console.log("database connection successful");
    }
})

const app= express();
app.use(cors());
app.use(express.json());
const port= process.env.PORT;
app.listen(port, ()=>{
    console.log(`Server is listening at port:${port}`);
});

app.get('/api/pickup-lines', (req, res) => {
    const category = (req.query.category || "all").toLowerCase();

    let sql;
    let params = [];

    if (category === "all") {
        sql = "SELECT * FROM pickup_lines ORDER BY RAND() LIMIT 1";
    } else {
        sql = "SELECT * FROM pickup_lines WHERE category=? ORDER BY RAND() LIMIT 1";
        params = [category];
    }

    con.query(sql, params, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

        console.log(result);
        res.send(result[0]);
    });
});
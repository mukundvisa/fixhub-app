import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "fixhub",
  waitForConnections: true,
  connectionLimit: 10,
});

export default db;

import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  password: "7632912",
  host: "localhost",
  port: 5432,
  database: "yelp",
});

export default pool;

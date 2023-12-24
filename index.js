import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "postgres",
  port: 5432,
});

db.connect();

let countries = [];
let countryCodes = [];

db.query("select country_code from visited_countries", (err, res) => {
  if (err) {
    console.error("Error executing query", err.stack);
  } else {
    countries = res.rows;
    countryCodes = countries.map(obj => obj.country_code);
    console.log("rows are: ", countryCodes);
    // quiz = res.rows;
  }
  db.end();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //Write your code here.
  res.render("index.ejs", { countries: countryCodes, total: 3 });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

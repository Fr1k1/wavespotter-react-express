import express from "express";
import { createClient } from "@supabase/supabase-js";
import db from "./app/models/index.js";
import { Router } from "express";
import router from "./app/routes/index.js";
import "dotenv/config"; //needed for work with env files

const app = express();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const PORT = 3000;

app.use("/api/v1", router);

app.use("/", (req, res) => {
  res.send("Server is running");
});

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");

    db.sequelize
      .sync()
      .then(() => {
        console.log("Table created successfully!");

        app.listen(PORT, "0.0.0.0", (error) => {
          if (!error) {
            console.log(
              "Server is Successfully Running, and App is listening on port " +
                PORT
            );
          } else {
            console.log("Error occurred, server can't start", error);
          }
        });
      })
      .catch((error) => {
        console.error("Unable to create table : ", error);
      });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

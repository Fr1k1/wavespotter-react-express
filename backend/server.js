import express from "express";
import { createClient } from "@supabase/supabase-js";
import db from "./app/models/index.js";
import router from "./app/routes/index.js";
import "dotenv/config"; //needed for work with env files
import cors from "cors";
import { createAssociations } from "./app/database_management.js";

const app = express();

//this has to be on top!!!!
app.use(express.json());

//create all entity relationships
createAssociations();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const corsOptions = {
  origin: "http://localhost:5173", //change this based on use case, "https://diplomski-frontend.netlify.app" for production
  credentials: true,
  methods: "GET, POST, PATCH, DELETE, PUT",
  allowedHeaders: "Content-Type, Authorization",
};

const PORT = process.env.PORT || 3000;

app.use(cors(corsOptions));

app.use("/api/v1", router);

app.use("/", (req, res) => {
  res.send("Server is running");
});

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");

    db.sequelize
      .sync({ alter: true }) //alter true to force changes
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

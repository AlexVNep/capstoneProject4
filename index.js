import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://v2.jokeapi.dev/";


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Get a joke based on your name... " });
});

app.post("/get-joke", async (req, res) => {
  const category = req.body.category;
  const flags = req.body.flags;
  try {
    const response = await axios.get(API_URL + `joke/${category}?`+ `blacklistFlags=${flags}`);
    const result = response.data;
    console.log(result)
    res.render("index.ejs", { joke: result });
  } catch (error) {
    res.render("index.ejs", { joke: "Oops, something went wrong!" });
  }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
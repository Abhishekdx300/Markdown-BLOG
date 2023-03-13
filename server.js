require("dotenv").config();
const express = require("express");
const app = express();
const Article = require("./models/article");
const methodOverride = require('method-override')
const articleRouter = require("./routes/articles");
const connectDB = require("./db/connect");

// convert ejs code to html
app.set("view engine", "ejs");

//routes
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //allow access of form while using the schema on route
app.use(methodOverride('_method'))
app.use("/articles", articleRouter);

//all articles in main route
app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles });
});

const PORT = process.env.PORT_VAR || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`server is listening to http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

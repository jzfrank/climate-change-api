const PORT = 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

const articiles = [];

app.get("/", (req, res) => {
  res.json("Welcome to my climate change news API");
});

app.get("/news", (req, res) => {
  axios
    .get("https://www.theguardian.com/environment/climate-crisis")
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      $('a:contains("climate")', html).each(function () {
        const title = $(this).text();
        const url = $(this).attr("href");
        articiles.push({
          title,
          url,
        });
      });
      res.json(articiles);

      console.log(html);
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});

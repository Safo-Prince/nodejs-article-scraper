const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const request = require("request");

const PORT = 8080;
const app = express();
const url = "https://3news.com/";
const post = [];

async function scrapeImageFromArticle(url) {
  return new Promise((resolve, reject) => {
    request(url, async (error, response, html) => {
      if (error || response.statusCode !== 200) {
        reject(new Error(" Error Scraping image from article url"));
      } else {
        const $ = cheerio.load(html);
        const imageUrl = $(".td-post-content")
          .find(".td-post-featured-image")
          .find("img")
          .attr("data-src");
        resolve(imageUrl);
      }
    });
  });
}
const result = [];

async function scrapeFrom3news(url) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    for (const element of $(".td-block-span12", html)) {
      const title = $(element).find("a").attr("title");
      const articleUrl = $(element).find("a").attr("href");
      const date = $(element)
        .find(".td-module-meta-info")
        .find(".td-post-date")
        .find("time")
        .text();
      const image = await scrapeImageFromArticle(articleUrl);
      result.push({ title, articleUrl, date, image });

      console.log(result);
    }
  } catch (e) {
    console.log("Error scraping date from 3news", e.message);
  }
}

scrapeFrom3news(url);

// scrapeImageFromArticle(
//   "https://3news.com/mass-industrial-action-looms-as-tuc-gives-sunon-asogli-1-wk-ultimatum/"
// ).then((image) => console.log(image));
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

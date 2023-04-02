const cheerio = require("cheerio");
const axios = require("axios");
const express = require("express");

const PORT = 8080;
const app = express();
const url = "https://citinewsroom.com/news/";
const result = [];

async function scrapeImageFromArticle(url) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    image = $(".post-wrapper")
      .find(".post-wrap")
      .find(".jeg_main")
      .find(".jeg_container")
      .find(".jeg_featured")
      .find("a")
      .attr("href");

    return imageUrl;
  } catch (error) {
    console.log("Error scraping image from article", error.message);
  }
}

async function scrapeFromCitiNews(url) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    for (const element of $(".jeg_posts", html)) {
      const title = $(element)
        .find(".jeg_postblock_content")
        .find(".jeg_post_title")
        .find("a")
        .text();

      const articleUrl = $(element).find(".jeg_thumb").find("a").attr("href");
      const date = $(element)
        .find(".jeg_postblock_content")
        .find(".jeg_post_meta")
        .children(".jeg_meta_date")
        .children("a")
        .children()[0].next.data;
      const imageUrl = await scrapeImageFromArticle(articleUrl);

      result.push({ title, articleUrl, date, imageUrl });
    }

    console.log(result);
  } catch (e) {
    console.log("Error scraping date from 3news", e.message);
  }
}

scrapeFromCitiNews(url);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

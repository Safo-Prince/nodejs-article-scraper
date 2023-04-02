const cheerio = require("cheerio");
const request = require("request");
const axios = require("axios");
const express = require("express");

const PORT = 8080;
const app = express();
const url = "https://citinewsroom.com/news/";
const result = [];

const domainName = "https://www.graphic.com.gh";

// async function scrapeDateFromArticle(url) {
//   try {
//     request(url, (error, response, html) => {
//       if (!error && response.statusCode == 200) {
//         const $ = cheerio.load(html);

//         return $(".article-details")
//           .find(".article-info")
//           .find(".published")
//           .find("time")
//           .text()
//           .replace("\n", "")
//           .replace("\t", "");
//       }
//     });
//   } catch (error) {
//     console.log("Error scraping Date from article", error.message);
//   }
// }

async function scrapeDateFromArticle(url) {
  return new Promise((resolve, reject) => {
    request(url, (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        const publishedDate = $(".article-details")
          .find(".article-info")
          .find(".published")
          .find("time")
          .text()
          .replace("\n", "")
          .replace("\t", "");
        resolve(publishedDate);
      }
    });
  });
}

async function scrapeFromGraphicNews(url) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  try {
    // const response = await axios.get(url);
    // const html = response.data;

     
    request(url, async (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        for (const element of $(".col-lg-4", html)) {
          let path = $(element)
            .find(".article")
            .children(".article-intro-image ")
            .find("a")
            .attr("href");

          const articleUrl = domainName + path;

          const image = $(element)
            .find(".article")
            .children(".article-intro-image ")
            .find("a")
            .find("img")
            .attr("data-src");

          const title = $(element)
            .find(".article")
            .find(".article-body")
            .find(".article-header")
            .find("h2")
            .find("a")
            .text()
            .replace("\n", "");

          const date = new Date().toLocaleString("en-US", options);

          result.push({ articleUrl, image, title, date });
          console.log(result);
        }
      }
    });
  } catch (err) {}
}

// const articleUrl = $(element).find(".jeg_thumb").find("a").attr("href");
// const date = $(element)
//   .find(".jeg_postblock_content")
//   .find(".jeg_post_meta")
//   .children(".jeg_meta_date")
//   .children("a")
//   .children()[0].next.data;
// const image = await scrapeImageFromArticle(articleUrl);

scrapeFromGraphicNews("https://www.graphic.com.gh/news/general-news.html");
// scrapeDateFromArticle(
//   "https://www.graphic.com.gh/news/general-news/remove-unauthorised-billboards-within-21-days-okaikwei-north-assembly.html"
// ).then((date) => console.log(date));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

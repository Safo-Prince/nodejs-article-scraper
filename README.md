# Readme

This is a Node.js script that scrapes articles from the website "3news.com" and retrieves relevant information such as the article title, URL, publication date, and featured image. It uses the Axios library for making HTTP requests, Cheerio for parsing HTML, Express for setting up a simple web server, and Request for making requests to external websites.

## Installation

To run this script, you need to have Node.js installed on your machine. You can download it from the official Node.js website: [https://nodejs.org](https://nodejs.org)

1. Clone the repository or download the script file.
2. Open a terminal or command prompt and navigate to the directory where the script is located.
3. Run the following command to install the required dependencies:


## Usage

1. Open the script file in a code editor of your choice.
2. Modify the `url` variable to specify the URL of the website you want to scrape articles from.
3. Optionally, you can uncomment and modify the `scrapeImageFromArticle` function to scrape images from specific article URLs.
4. Save the changes to the script file.

To run the script, use the  command below:


The script will start scraping articles from the specified website and display the results in the console.

## Customization

You can customize the script according to your needs. Here are a few possible modifications:

- **Scrape additional data**: You can modify the `scrapeFrom3news` function to scrape additional data from the articles, such as the article content or author information. Refer to the Cheerio documentation (https://cheerio.js.org) for more information on how to extract data from HTML.
- **Scrape from a different website**: Update the `url` variable to point to a different website URL that you want to scrape articles from.
- **Change the server port**: Modify the `PORT` constant to change the port on which the Express server will listen.

## Limitations

- This script assumes a specific HTML structure of the target website ("3news.com"). If the website structure changes, the script may fail to retrieve the expected data. Adjustments to the selectors and parsing logic may be necessary in such cases.
- Scraping websites without their permission may violate their terms of service. Ensure that you have the necessary rights or permissions before scraping any website.
- Be mindful of the rate at which you scrape a website to avoid overwhelming their servers or causing any disruption. Consider adding delays between requests or using a rotating proxy service if necessary.


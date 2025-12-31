import axios from "axios";
import * as cheerio from "cheerio";

const scrapeVerge = async () => {
    const url = "https://www.theverge.com/tech";

    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const articles = [];

    $("h2 a").each((_, el) => {
        const title = $(el).text().trim();
        const href = $(el).attr("href");

        if (!title || !href) return;

        const link = href.startsWith("http")
            ? href
            : `https://www.theverge.com${href}`;

        articles.push({
            title,
            url: link,
            source: "The Verge",
            description: title,
            publishDate: new Date()
        });
    });

    console.log(`📰 Scraped ${articles.length} articles from The Verge`);
    return articles;
};

export default scrapeVerge;

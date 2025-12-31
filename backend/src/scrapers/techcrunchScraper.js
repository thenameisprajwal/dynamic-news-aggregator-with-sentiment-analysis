import axios from 'axios';
import * as cheerio from 'cheerio';

const scrapeTechCrunch = async () => {
    try {
        console.log('📰 Scraping TechCrunch...');

        const { data } = await axios.get('https://techcrunch.com/', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        const $ = cheerio.load(data);
        const articles = [];

        // TechCrunch article selectors
        $('article, .post-block, div[class*="post"]').each((index, element) => {
            try {
                const $element = $(element);

                // Find the main link
                const linkElement = $element.find('a[href*="techcrunch.com"]').first();
                const url = linkElement.attr('href');

                // Find title (try multiple selectors)
                let title = $element.find('h2, h3, .post-block__title').first().text().trim();

                // If no title found in child elements, try the link text
                if (!title) {
                    title = linkElement.find('h2, h3').first().text().trim();
                }

                // Find description/excerpt
                let description = $element.find('p, .post-block__content, .excerpt').first().text().trim();

                // Fallback to title if no description
                if (!description) {
                    description = title;
                }

                if (title && url && articles.length < 20) {
                    articles.push({
                        title: title.substring(0, 200),
                        description: description.substring(0, 500),
                        url: url,
                        source: 'TechCrunch',
                        publishDate: new Date()
                    });
                }
            } catch (err) {
                // Skip this article
            }
        });

        // Alternative approach: find all article links
        $('a[href*="/2024/"], a[href*="/2025/"]').each((index, element) => {
            try {
                const $element = $(element);
                const url = $element.attr('href');
                const title = $element.text().trim();

                // Check if this looks like an article URL
                if (title && url && url.includes('techcrunch.com') && articles.length < 20) {
                    // Check if we already have this URL
                    const exists = articles.some(article => article.url === url);

                    if (!exists && title.length > 10) {
                        articles.push({
                            title: title.substring(0, 200),
                            description: title,
                            url: url,
                            source: 'TechCrunch',
                            publishDate: new Date()
                        });
                    }
                }
            } catch (err) {
                // Skip this article
            }
        });

        console.log(`✅ Scraped ${articles.length} articles from TechCrunch`);
        return articles;

    } catch (error) {
        console.error('❌ TechCrunch Scraper Error:', error.message);
        return [];
    }
};

export default scrapeTechCrunch;

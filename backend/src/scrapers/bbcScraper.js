import axios from 'axios';
import * as cheerio from 'cheerio';

const scrapeBBC = async () => {
    try {
        console.log('📰 Scraping BBC News...');

        const { data } = await axios.get('https://www.bbc.com/news', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        const $ = cheerio.load(data);
        const articles = [];

        // BBC News uses different selectors for different sections
        // Main stories
        $('div[data-testid="card-headline"], div[data-testid="edinburgh-card"]').each((index, element) => {
            try {
                const $element = $(element);

                // Find the link
                const linkElement = $element.find('a[data-testid="internal-link"]').first();
                const url = linkElement.attr('href');

                // Find title
                const titleElement = linkElement.find('h2, h3').first();
                const title = titleElement.text().trim();

                // Find description (if available)
                const descElement = $element.find('p[data-testid="card-description"]').first();
                let description = descElement.text().trim();

                // Fallback to title if no description
                if (!description) {
                    description = title;
                }

                if (title && url) {
                    // Construct full URL
                    const fullUrl = url.startsWith('http') ? url : `https://www.bbc.com${url}`;

                    articles.push({
                        title: title.substring(0, 200), // Limit title length
                        description: description.substring(0, 500), // Limit description length
                        url: fullUrl,
                        source: 'BBC News',
                        publishDate: new Date()
                    });
                }
            } catch (err) {
                // Skip this article if there's an error
            }
        });

        // Also try alternative selectors for more articles
        $('article h2 a, article h3 a').each((index, element) => {
            try {
                const $element = $(element);
                const title = $element.text().trim();
                const url = $element.attr('href');

                if (title && url && articles.length < 20) {
                    const fullUrl = url.startsWith('http') ? url : `https://www.bbc.com${url}`;

                    // Check if we already have this URL
                    const exists = articles.some(article => article.url === fullUrl);

                    if (!exists) {
                        articles.push({
                            title: title.substring(0, 200),
                            description: title, // Use title as description
                            url: fullUrl,
                            source: 'BBC News',
                            publishDate: new Date()
                        });
                    }
                }
            } catch (err) {
                // Skip this article
            }
        });

        console.log(`✅ Scraped ${articles.length} articles from BBC News`);
        return articles;

    } catch (error) {
        console.error('❌ BBC Scraper Error:', error.message);
        return [];
    }
};

export default scrapeBBC;

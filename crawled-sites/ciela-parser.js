const {
    allPages,
} = require('../parser/get-through-pages-parserer');

const {
    getBooksUrl,
} = require('../parser/book-parser');

const {
    getBookUrlsOnParts,
} = require('../handle-requests/handle-req-queue');

const {
    getBookInfo,
} = require('../crawlers/ciela-crawler');

const url = 'https://ciela.com/knigi/hudozhestvena-literatura/fantastika-fentazi-horar?limit=24&p=1';
const selector = '.paging a';
const attr = '=';

const bookSelector = 'span .productBoxTitle';
const bookAttr = 'href';
const stack = [];
const run = async () => {
    let getAllPagesUrls = await allPages(url, selector, attr);
    getAllPagesUrls = getAllPagesUrls.slice(0, 20);
    let booksPages = await Promise.all(getAllPagesUrls
        .map((currentUrl) => getBooksUrl(currentUrl, bookSelector, bookAttr)));
    booksPages = booksPages.reduce((a, b) => a.concat(b), []);
    await getBookUrlsOnParts(booksPages, stack, getBookInfo);
    return stack;
};
run();
module.exports = {
    run,
};

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

const {
    pushInfoToDatabase,
} = require('../push-info-to-database/push-info');

const url = 'https://ciela.com/knigi/hudozhestvena-literatura/fantastika-fentazi-horar?limit=24&p=1';
const selector = '.paging a';
const attr = '=';

const bookSelector = 'span .productBoxTitle';
const bookAttr = 'href';
let stack = [];
const run = async () => {
    const getAllPagesUrls = await allPages(url, selector, attr);
    let booksPages = await Promise.all(getAllPagesUrls
        .map((currentUrl) => getBooksUrl(currentUrl, bookSelector, bookAttr)));

    booksPages = booksPages.reduce((a, b) => a.concat(b), []);
    await getBookUrlsOnParts(booksPages, stack, getBookInfo);
    stack = stack.reduce((a, b) => a.concat(b), []);
    stack.forEach((book) => pushInfoToDatabase(book));
};
module.exports = {
    run,
};

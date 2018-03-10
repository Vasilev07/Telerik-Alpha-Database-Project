const {
    allPages,
} = require('../parser/get-through-pages-parserer');

const {
    getBooksUrl,
} = require('../parser/book-parser');

const {
    getBookInfo,
} = require('../crawlers/chitanka-crawler');

const {
    getBookUrlsOnParts,
} = require('../handle-requests/handle-req-queue');

const {
    pushInfoToDatabase,
} = require('../push-info-to-database/push-info');

const url = 'http://chitanka.info/books/category/fantasy.html/1';
const selector = '.pagination a';
const attr = '/';

const bookSelector = 'div.media-body a.booklink';
const bookAttr = 'href';
let stack = [];
const run2 = async () => {
    const getAllPagesUrls = await allPages(url, selector, attr);
    let booksPages = await Promise.all(getAllPagesUrls
        .map((currentUrl) => getBooksUrl(currentUrl, bookSelector, bookAttr)));

    booksPages = booksPages.reduce((a, b) => a.concat(b), []);
    await getBookUrlsOnParts(booksPages, stack, getBookInfo);
    stack = stack.reduce((a, b) => a.concat(b), []);
    stack.forEach((book) => pushInfoToDatabase(book));
};
module.exports = {
    run2,
};

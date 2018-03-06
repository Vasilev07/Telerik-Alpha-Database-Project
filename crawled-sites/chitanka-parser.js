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

const url = 'http://chitanka.info/books/category/fantasy.html/1';
const selector = '.pagination a';
const attr = '/';

const bookSelector = 'div.media-body a.booklink';
const bookAttr = 'href';
const stack = [];
const run = async () => {
    const getAllPagesUrls = await allPages(url, selector, attr);

    let booksPages = await Promise.all(getAllPagesUrls
        .map((currentUrl) => getBooksUrl(currentUrl, bookSelector, bookAttr)));

    booksPages = booksPages.reduce((a, b) => a.concat(b), []);
    await getBookUrlsOnParts(booksPages, stack, getBookInfo);
    console.log(stack.length);
    return stack;
};
run();
module.exports = {
    run,
};

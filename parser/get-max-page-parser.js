/* globals Set */
const {
    getPagesUrl,
} = require('../parser/page-parser');

const uniquePageValues = new Set();

const getMaxPage = async (url, selector, attr) => {
    const pageUrls = await getPagesUrl(url, selector);
    pageUrls.result.forEach((pageUrl) => {
        const endIndex = pageUrl.lastIndexOf(attr);
        const pageNumber = pageUrl.substring(endIndex + 1, pageUrl.length);
        if (!isNaN(pageNumber)) {
            uniquePageValues.add(pageNumber);
        }
    });
    const lastPage = Math.max(...uniquePageValues);

    return lastPage;
};

module.exports = {
    getMaxPage,
};

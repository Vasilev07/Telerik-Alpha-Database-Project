const {
    getMaxPage,
} = require('../parser/get-max-page-parser');


const allPages = async (url, selector, attr) => {
    const maxLength = await getMaxPage(url, selector, attr);
    url = url.slice(0, url.length - 1);
    const allPagesUrls = Array.from({
        length: maxLength,
    }).fill(url);

    allPagesUrls.forEach((baseUrl, pageNumber) => {
        allPagesUrls[pageNumber] = baseUrl + (pageNumber + 1);
    });
    return allPagesUrls;
};

module.exports = {
    allPages,
};

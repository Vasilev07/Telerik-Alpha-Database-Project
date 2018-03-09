const {
    JSDOM,
} = require('jsdom');

const $init = require('jquery');

const getBookInfo = async (bookUrl) => {
    const baseUrl = 'http://chitanka.info';
    const fullUrl = await `${baseUrl}${bookUrl}`;
    const dom = await JSDOM.fromURL(fullUrl);
    const $ = $init(dom.window);
    const authorSelector = $('#first-heading h1 span a')
        .text();
    const bookSelector = $('#first-heading h1 a.selflink')
        .text();
    const bookImageSelector = $('.media-object')
        .attr('src');
    const correctImageUrl = bookImageSelector
        .substring(9, bookImageSelector.length);
    const descriptionSelector = $('div.book-anno')
        .text()
        .replace(/\t?\n|\t/g, '');
    const informationSelector = $('div.book-extra-info p');

    let isbn = 'no ISBN';

    let publishingInfo = 'no publishing info';

    const getFoundInfo = (tag, info) => {
        const index = [...$(informationSelector)];
            index.map((p) => {
                const exists = $(p)
                    .text()
                    .indexOf(tag);
                if (exists !== -1) {
                    info = $(p)
                        .text()
                        .replace(/\t?\n|\t/g, '');
                }
            });
        return info;
    };

    isbn = getFoundInfo('ISBN', isbn);
    publishingInfo = getFoundInfo('ИК', publishingInfo);
    const bookInformation = {
        author: authorSelector,
        title: bookSelector,
        image: correctImageUrl,
        description: descriptionSelector,
        ISBN: isbn,
        publishing: publishingInfo,
        website: 'Chitanka',
    };
    return bookInformation;
};

module.exports = {
    getBookInfo,
};

// const regex = /(ISBN)/;
// const isbnSelector = informationSelector
//     .search(regex);
// let isbnFound = 'no ISBN';

// if (isbnSelector !== -1) {
//     isbnFound = informationSelector
//         .substring(isbnSelector + 5, isbnSelector + 23)
//         .replace(/\t?\n|\t/g, '');
// }

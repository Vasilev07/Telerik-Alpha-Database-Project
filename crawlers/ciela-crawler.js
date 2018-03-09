const {
    JSDOM,
} = require('jsdom');

const $init = require('jquery');

const getBookInfo = async (bookUrl) => {
    // const baseUrl = 'https://ciela.com';
    // const fullUrl = await `${baseUrl}${bookUrl}`;
    // console.log(fullUrl);
    const dom = await JSDOM.fromURL(bookUrl);
    const $ = $init(dom.window);
    const authorSelector = $('.leftInfo .productAttribute')
        .children(':first')
        .text()
        .replace(/\t?\n|\t/g, '');
    const publishSelector = $('.leftInfo .productAttribute')
        .children(':last')
        .text()
        .replace(/\t?\n|\t/g, '');
    const imageSelector = $('.sp-image')
        .attr('src');
    const titleSelector = $('.productDetailedInfo h1')
        .text();
    const descriptionSelector = $('div.textPage p')
        .text()
        .replace(/\t?\n|\t/g, '');
    const ISBN =
        $('.productDetailedInformation .infoRow:contains("ISBN") .attributeValue')
        .text();
    const bookInformation = {
        author: authorSelector,
        title: titleSelector,
        image: imageSelector,
        description: descriptionSelector,
        ISBN: ISBN,
        publishing: publishSelector,
        website: 'Ciela',
    };
    // infoSelector.forEach((element) => {
    //     const currentKey = element[0].text();
    //     const currentValue = element[1].text();
    //     if (currentKey === 'Автор') {
    //         bookInformation.author = currentKey;
    //     } else if (currentKey === 'Издателство') {
    //         bookInformation.publishing = currentValue;
    //     } else if (currentKey === 'ISBN') {
    //         bookInformation.ISBN = currentValue;
    //     }
    // });
    return bookInformation;
};

module.exports = {
    getBookInfo,
};
// change author selector@!!!!

// const regex = /(ISBN)/;
// const isbnSelector = informationSelector
//     .search(regex);
// let isbnFound = 'no ISBN';

// if (isbnSelector !== -1) {
//     isbnFound = informationSelector
//         .substring(isbnSelector + 5, isbnSelector + 23)
//         .replace(/\t?\n|\t/g, '');
// }

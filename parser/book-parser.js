const {
    JSDOM,
} = require('jsdom');

const $init = require('jquery');


const getBooksUrl = async (pageUrl, selector, attr) => {
    const dom = await JSDOM.fromURL(pageUrl);
    const $ = $init(dom.window);
    const pageLinksSelector = selector;
    return [...$(pageLinksSelector)].map((link) => $(link))
        .map(($link) => $link.attr(attr));
};

module.exports = {
    getBooksUrl,
};


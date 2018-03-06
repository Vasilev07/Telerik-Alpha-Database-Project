const {
    JSDOM,
} = require('jsdom');
const init = require('jquery');

const getPagesUrl = async (url, selector) => {
    const dom = await JSDOM.fromURL(url);
    const $ = init(dom.window);
    const pagesLinkSelector = selector;
    const result = [...$(pagesLinkSelector)].map((link) => $(link))
    .map(($link) => $link.attr('href'));
    return {
        result,
        $,
    };
};

module.exports = {
    getPagesUrl,
};

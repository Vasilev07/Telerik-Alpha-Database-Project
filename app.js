const {
    run,
} = require('./crawled-sites/ciela-parser');

const {
    run2,
} = require('./crawled-sites/chitanka-parser');

const bigRun = async () => {
    run();
    run2();
};

bigRun();

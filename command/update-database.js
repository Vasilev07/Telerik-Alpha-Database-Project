const {
    Info,
    Books,
} = require('../models');
const {
    bigRun,
} = require('../app');

const deleteInformationFrom = async () => {
    await Info.destroy({
        where: {},
    });
    await Books.destroy({
        where: {},
    });
};

deleteInformationFrom();
bigRun();

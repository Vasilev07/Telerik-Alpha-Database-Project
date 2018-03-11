/* globals process */
const {
    Info,
    InformationHolder,
    Books,
} = require('../models');
const command = process.argv[2].split('-').join(' ');
const getCharacteristicsByTitle = async (title) => {
    const curentTitle = await Books.findAll({
        where: {
            Title: {
                $like: `%${title}%`,
            },
        },
    });
    // const titleIdFromBooks = curentTitle[1].dataValues.id;
    // const title1 = curentTitle[1].dataValues.Title;
    // console.log(title1);
    curentTitle.map(async (titleIdFromBooks) => {
        const result = {};
        const getBookInfoId = await InformationHolder.findAll({
            where: {
                BookId: titleIdFromBooks.dataValues.id,
            },
        });
        const getInfoIdInMiddleTable = [];
        getBookInfoId.forEach((bookInfo) => {
            getInfoIdInMiddleTable.push(bookInfo.dataValues.InfoId);
        });
        result.Title = titleIdFromBooks.dataValues.Title;
        const info = await Info.findAll({
            where: {
                id: getInfoIdInMiddleTable.map((value) => value),
            },
        });
        info.forEach((element) => {
            const key = element.dataValues.info;
            const value = element.dataValues.value;
            result[key] = value;
        });
        console.log(result);
    });
};
getCharacteristicsByTitle(command);

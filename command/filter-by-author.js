/* globals process */
const {
    Info,
    InformationHolder,
    Books,
} = require('../models');
const command = process.argv[2].split('-').join(' ');
const getCharacteristicsByAuthor = async (author = 'Роулинг') => {
    const curentAuthor = await Info.findAll({
        where: {
            value: {
                $like: `%${author}%`,
            },
        },
    });
    curentAuthor.map(async (authorsFromInfos) => {
        const result = {};
        const getAuthorId = await InformationHolder.findAll({
            where: {
                InfoId: authorsFromInfos.dataValues.id,
            },
        });
        const getInfoIdInMiddleTable = [];
        getAuthorId.forEach((currentAuthorId) => {
            getInfoIdInMiddleTable.push(currentAuthorId.dataValues.BookId);
        });
        // console.log(getInfoIdInMiddleTable);
        result.Author = authorsFromInfos.dataValues.value;
        const books = await Promise.all(getInfoIdInMiddleTable
            .map(async (curr) => {
                const info = await Books.find({
                    where: {
                        id: curr,
                    },
                });
                return info;
            }));

        books.forEach((element) => {
            const value = element.dataValues.Title;
            // const key = element.dataValues.title;
            result.Title = value;
            console.log(result);
        });
    });
};
getCharacteristicsByAuthor(command);
// console.log(command);

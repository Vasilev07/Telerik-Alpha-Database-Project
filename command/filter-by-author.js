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
        // console.log(getAuthorId);
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
            result.Title = element.dataValues.Title;
            result.Image = element.dataValues.Image;
            result.ISBN = element.dataValues.ISBN;
            console.log(result);
        });
    });
};
getCharacteristicsByAuthor(command);

/* globals process */
const {
    Info,
    InformationHolder,
    Books,
} = require('../models');
const command = process.argv[2].split('-').join(' ');
const getCharacteristicsByAuthor = async (publishing) => {
    const currentPublishing = await Info.findAll({
        where: {
            value: {
                $like: `%${publishing}%`,
            },
        },
    });
    // console.log(currentPublishing);
    currentPublishing.map(async (publishingFromInfos) => {
        const result = {};
        // console.log(publishingFromInfos);
        const publishId = await InformationHolder.findAll({
            where: {
                InfoId: publishingFromInfos.dataValues.id,
            },
        });
        // console.log(publishId);
        const getInfoIdInMiddleTable = [];
        publishId.forEach((currentPublishId) => {
            getInfoIdInMiddleTable.push(currentPublishId.dataValues.BookId);
        });
        // console.log(getInfoIdInMiddleTable);
        // console.log(publishingFromInfos);
        result.Publishing = publishingFromInfos.dataValues.value;
        const books = await Promise.all(getInfoIdInMiddleTable
            .map(async (current) => {
                const info = await Books.find({
                    where: {
                        id: current,
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
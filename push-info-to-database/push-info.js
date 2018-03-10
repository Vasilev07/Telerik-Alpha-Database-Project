const {
    Info,
    Books,
} = require('../models');

const pushInfoToDatabase = async (books) => {
    // const authors = await author.findCreateFind({
    //     where: {
    //         authorName: books.author,
    //     },
    // });
    // const publishings = await publishing.findCreateFind({
    //     where: {
    //         publishing: books.publishing,
    //     },
    // });
    // const websites = await website.findCreateFind({
    //     where: {
    //         websiteName: books.website,
    //     },
    // });
    const authors = await Info.findCreateFind({
        where: {
            info: 'Author',
            value: books.author,
        },
    });

    const publishings = await Info.findCreateFind({
        where: {
            info: 'Publishing',
            value: books.publishing,
        },
    });

    const websites = await Info.findCreateFind({
        where: {
            info: 'Website',
            value: books.website,
        },
    });

    const createdBook = await Books.create({
        Title: books.title,
        Image: books.image,
        Description: books.description,
        ISBN: books.ISBN,
        // authorId: authors[0].dataValues.id,
        // publishingId: publishings[0].dataValues.id,
        // websiteId: websites[0].dataValues.id,
    });
    // createdBook.setInfo([authors[0].dataValues.id,
    //  publishings[0].dataValues.id, websites[0].dataValues.id]);
    // await Books.create({
    //     Title: books.title,
    //     Image: books.image,
    //     Description: books.description,
    //     ISBN: books.ISBN,
    //         // authorId: authors[0].dataValues.id,
    //         // publishingId: publishings[0].dataValues.id,
    //         // websiteId: websites[0].dataValues.id,
    // });
    // Books.find({
    //         where: {
    //             Title: books.title,
    //         },
    //     })
    // .then((currentBook) => currentBook
    createdBook.setInfos([authors[0].dataValues.id, publishings[0]
        .dataValues.id, websites[0].dataValues.id,
    ]);
};

module.exports = {
    pushInfoToDatabase,
};

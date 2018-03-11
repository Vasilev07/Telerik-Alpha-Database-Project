const {
    Info,
} = require('../models');

const findAllAuthors = async () => {
    const findFullInfo = await Info.findAll({
        where: {
            info: 'Author',
        },
    });
    let authorNames = [];
    findFullInfo.forEach((currentAuthor) => {
        // if (currentAuthor.length > 2) {
        authorNames.push(currentAuthor.dataValues.value);
        // }
    });
    authorNames = authorNames.filter((authorName) => authorName.length > 2);
    authorNames.sort((a, b) => a.localeCompare(b));
    authorNames.map((author) => console.log(author));
};
findAllAuthors();
// }).then((projects) => {
//     console.log(projects);
// });

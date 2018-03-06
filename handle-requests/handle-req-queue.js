const getBookUrlsOnParts =
    async (bookLinks, bookInformation, getBookInfo) => {
        if (bookLinks.length === 0) {
            return;
        }
        const numberOfLinksToGet = 24;
        const partOfLinks = await bookLinks.splice(0, numberOfLinksToGet);
        const eachBook = await Promise.all(partOfLinks
            .map((bookLink) => getBookInfo(bookLink)));
        bookInformation.push(eachBook);
        await getBookUrlsOnParts(bookLinks, bookInformation, getBookInfo);
    };

module.exports = {
    getBookUrlsOnParts,
};

// const extractDetailsOnChunks = (videUrls) => {
//     const dataArr = videUrls.reduce(async (acc, data) => {
//         const accumolator = await acc;
//         // console.log(data);
//         const result = await Promise.all(data.map((videoUrl) => {
//             return getBookInfo(videoUrl);
//         }));
//         // console.log(result);
//         return Promise.resolve([...accumolator, ...result]);
//     }, Promise.resolve([]));
//     console.log(dataArr);
//     return dataArr;
// };

// module.exports = {
//     extractDetailsOnChunks,
// };

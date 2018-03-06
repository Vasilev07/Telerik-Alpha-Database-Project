'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "Author" from table "Books"
 * createTable "author_book_exrevs", deps: []
 *
 **/

var info = {
    "revision": 2,
    "name": "delete-author-column",
    "created": "2018-03-06T11:17:42.801Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["Books", "Author"]
    },
    {
        fn: "createTable",
        params: [
            "author_book_exrevs",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "authorId": {
                    "type": Sequelize.INTEGER
                },
                "bookId": {
                    "type": Sequelize.INTEGER
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};

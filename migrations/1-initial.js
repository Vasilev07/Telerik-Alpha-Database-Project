'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Books", deps: []
 * createTable "Infos", deps: []
 * createTable "informationHolder", deps: [Books, Infos]
 *
 **/

var info = {
    "revision": 1,
    "name": "initial",
    "created": "2018-03-09T17:03:57.961Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Books",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "Title": {
                    "type": Sequelize.STRING
                },
                "Image": {
                    "type": Sequelize.STRING
                },
                "Description": {
                    "type": Sequelize.TEXT
                },
                "ISBN": {
                    "type": Sequelize.STRING
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
    },
    {
        fn: "createTable",
        params: [
            "Infos",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "info": {
                    "type": Sequelize.STRING
                },
                "value": {
                    "type": Sequelize.STRING
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
    },
    {
        fn: "createTable",
        params: [
            "informationHolder",
            {
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "BookId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Books",
                        "key": "id"
                    },
                    "primaryKey": true
                },
                "InfoId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Infos",
                        "key": "id"
                    },
                    "primaryKey": true
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

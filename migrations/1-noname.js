'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Books", deps: []
 * createTable "Infos", deps: []
 * createTable "InformationHolders", deps: [Books, Infos]
 * addIndex ["info","value"] to table "Infos"
 *
 **/

var info = {
    "revision": 1,
    "name": "noname",
    "created": "2018-03-10T19:46:28.097Z",
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
            "InformationHolders",
            {
                "BookId": {
                    "type": Sequelize.INTEGER,
                    "allowNull": true,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Books",
                        "key": "id"
                    },
                    "unique": "InformationHolders_InfoId_BookId_unique",
                    "primaryKey": true
                },
                "InfoId": {
                    "type": Sequelize.INTEGER,
                    "allowNull": true,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Infos",
                        "key": "id"
                    },
                    "unique": "InformationHolders_InfoId_BookId_unique",
                    "primaryKey": true
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
        fn: "addIndex",
        params: [
            "Infos", ["info", "value"],
            {
                "indicesType": "UNIQUE"
            }
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

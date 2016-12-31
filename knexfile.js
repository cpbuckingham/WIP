// ADD A DATABASE

'use strict';

module.exports = {

    development: {
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            database: 'crud_dev'
        }
    },

    test: {
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            database: 'crud_test'
        }
    }

    // production: {
    //     client: 'pg',
    //     connection: process.env.DATABASE_URL
    // }
};

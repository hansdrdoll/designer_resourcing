const pgp = require('pg-promise')({});

const connectionURL = 'postgres://localhost:5432/designer_resourcing';

const db = pgp(connectionURL);

module.exports = db;

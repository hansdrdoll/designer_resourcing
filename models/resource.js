const db = require('../database/connection');

const Resource = {};

Resource.findAll = () => {
  return db.any('SELECT * FROM resources');
};

module.exports = Resource;

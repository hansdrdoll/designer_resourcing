const db = require('../database/connection');

const Resource = {};

Resource.findAll = () => {
  return db.any('SELECT * FROM resources');
};

Resource.create = (resourceData) => {
  return db.one('INSERT INTO resources (name, title, hourly_rate, slack_username) VALUES ($1, $2, $3, $4) RETURNING id', [resourceData.name, resourceData.title, resourceData.hourly_rate, resourceData.slack_username]);
};

Resource.findOne = (resourceId) => {
  return db.one('SELECT * from resources WHERE id = $1', resourceId.id);
};

module.exports = Resource;

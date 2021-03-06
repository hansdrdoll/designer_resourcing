const db = require('../database/connection');

const Resource = {};

Resource.findAll = () => db.any('SELECT * FROM resources WHERE archived = false ORDER BY title');

Resource.findAny = (ids) => {
  const newIds = [];
  let manySelector = '$1';
  let i = 1;
  if (typeof ids !== 'string') {
    ids.map((id) => {
      newIds.push(Number(id));
      if (i < ids.length) {
        i += 1;
        manySelector = `${manySelector}, $${i}`;
      }
    });
    return db.any(
      `SELECT * FROM resources WHERE id IN (${manySelector})`,
      ids,
    );
  }
  return db.any('SELECT * FROM resources WHERE id = $1', ids);
};

Resource.create = resourceData => db.one(
  'INSERT INTO resources (name, title, hourly_rate, slack_username) VALUES ($1, $2, $3, $4) RETURNING id',
  [resourceData.name,
    resourceData.title,
    resourceData.hourly_rate,
    resourceData.slack_username],
);

Resource.findOne = resourceId => db.one('SELECT * from resources WHERE id = $1', resourceId.id);

Resource.update = (resourceData, resourceId) => db.result(
  'UPDATE resources SET name = $1, title = $2, hourly_rate = $3, slack_username = $4 WHERE id = $5',
  [resourceData.name,
    resourceData.title,
    resourceData.hourly_rate,
    resourceData.slack_username,
    resourceId.id],
);

Resource.delete = resourceId => db.result(
  'UPDATE resources SET archived = true WHERE id = $1',
  resourceId.id,
);

module.exports = Resource;

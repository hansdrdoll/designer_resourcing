const db = require('../database/connection');

const Assignments = {};

Assignments.findAllInWeek = (week) => {
  console.log(week);
  return db.any('SELECT * FROM assignments WHERE day IN ($1, $2, $3, $4, $5)', week);
};

Assignments.create = (requestArr) => {
  requestArr.forEach(request => {
    db.one(
      'INSERT INTO assignments (resource_id, project_id, day, hours) VALUES ($1, $2, $3, $4) RETURNING id',
      [request.resource_id,
        request.project_id,
        request.day,
        request.hours],
    );
  });
};

module.exports = Assignments;

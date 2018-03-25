const db = require('../database/connection');

const Assignments = {};

Assignments.findAllInWeek = (week) => {
  console.log(week);
  return db.any('SELECT * FROM assignments WHERE day IN ($1, $2, $3, $4, $5)', week);
};

module.exports = Assignments;

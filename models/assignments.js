const db = require('../database/connection');

const Assignments = {};

Assignments.findAllInWeek = week => db.any(`
    SELECT assignments.id AS assignment_id,
    assignments.resource_id AS resource_id,
    assignments.project_id AS project_id,
    to_char(assignments.day, 'YYYY-MM-DD') AS day,
    assignments.hours,
    projects.cs_id,
    projects.client_name,
    projects.starting_budget,
    client_leads.name AS client_lead,
    resources.name AS resource_name,
    resources.title AS resource_title,
    resources.hourly_rate AS resource_rate
    FROM assignments
    JOIN resources ON assignments.resource_id = resources.id
    JOIN projects ON assignments.project_id = projects.id
    JOIN client_leads On projects.cs_id = client_leads.id
    WHERE assignments.day IN ($1, $2, $3, $4, $5)
    ORDER BY resource_id, cs_id, project_id, day;
    `, week);

Assignments.create = (requestArr) => {
  requestArr.forEach((request) => {
    db.one(
      'INSERT INTO assignments (resource_id, project_id, day, hours) VALUES ($1, $2, $3, $4) RETURNING id',
      [request.resource_id,
        request.project_id,
        request.day,
        request.hours],
    );
  });
};

Assignments.update = (requestArr) => {
  requestArr.forEach((request) => {
    db.one(
      'UPDATE assignments SET hours = $1 WHERE id = $2',
      [request.hours,
        request.id],
    );
  });
};

module.exports = Assignments;

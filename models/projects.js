const db = require('../database/connection');

const Projects = {};

Projects.findAll = () => {
  return db.any('SELECT projects.client_name, client_leads.name FROM projects JOIN client_leads on projects.cs_id = client_leads.id');
};

Projects.create = projectData => {
  return db.one(
    "INSERT INTO projects (client_name, starting_budget, created, cs_id) VALUES ($1, $2, $3, $4) RETURNING id",
    [projectData.client_name, projectData.budget, projectData.created, Number(projectData.cs_id)]
  );
};

module.exports = Projects;

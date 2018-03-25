const db = require('../database/connection');

const Projects = {};

Projects.findAll = () => {
  return db.any('SELECT projects.id, projects.client_name, client_leads.name FROM projects JOIN client_leads on projects.cs_id = client_leads.id WHERE projects.archived = false ORDER BY projects.cs_id');
};

Projects.create = (projectData) => {
  return db.one(
    'INSERT INTO projects (client_name, starting_budget, created, cs_id) VALUES ($1, $2, $3, $4) RETURNING id',
    [projectData.client_name, projectData.starting_budget, projectData.created, Number(projectData.cs_id)]
  );
};

Projects.findOne = (projectId) => {
  return db.one('SELECT projects.id, projects.client_name, client_leads.name FROM projects JOIN client_leads on projects.cs_id = client_leads.id WHERE projects.id = $1', projectId.id);
};

Projects.update = (projectData, projectId) => {
  return db.result('UPDATE projects SET client_name = $1, starting_budget = $2, cs_id = $3 WHERE id = $4', [projectData.client_name, projectData.starting_budget, Number(projectData.cs_id), projectId.id]);
};

Projects.delete = (projectId) => {
  console.log(projectId);
  return db.result('UPDATE projects SET archived = true WHERE id = $1', Number(projectId.id));
};

module.exports = Projects;

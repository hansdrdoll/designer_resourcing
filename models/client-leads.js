const db = require('../database/connection');

const ClientLeads = {};

ClientLeads.findAll = () => {
  return db.any('SELECT * FROM client_leads WHERE archived = false ORDER BY id');
};

ClientLeads.create = (clientData) => {
  return db.one('INSERT INTO client_leads (name, slack_username) VALUES ($1, $2) RETURNING id', [clientData.name, clientData.slack_username]);
};

ClientLeads.findOne = (clientId) => {
  return db.one('SELECT * from client_leads WHERE id = $1', clientId.id);
};

ClientLeads.update = (clientInfo, clientId) => {
  return db.one('UPDATE client_leads SET name = $1, slack_username = $2 WHERE id = $3', [clientInfo.name, clientInfo.slack_username, clientId.id]);
};

ClientLeads.delete = (clientId) => {
  return db.result('UPDATE client_leads SET archived = true WHERE id = $1', clientId.id);
};

module.exports = ClientLeads;

const db = require('../database/connection');

const ClientLeads = {};

ClientLeads.findAll = () => {
  return db.any('SELECT * FROM client_leads');
};

module.exports = ClientLeads;

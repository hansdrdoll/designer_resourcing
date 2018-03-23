CREATE DATABASE designer_resourcing;

\c designer_resourcing;

DROP TABLE resources CASCADE;
DROP TABLE client_leads CASCADE;
DROP TABLE projects CASCADE;
DROP TABLE assignments CASCADE;

CREATE TABLE resources (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  hourly_rate INTEGER NOT NULL,
  slack_username VARCHAR(255),
  archived BOOLEAN DEFAULT false
);

CREATE TABLE client_leads (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slack_username VARCHAR(255) NOT NULL,
  archived BOOLEAN DEFAULT false
);

CREATE TABLE projects (
  id BIGSERIAL PRIMARY KEY,
  client_name VARCHAR(255) NOT NULL,
  starting_budget INTEGER NOT NULL,
  created DATE NOT NULL,
  cs_id INTEGER REFERENCES client_leads(id),
  archived BOOLEAN DEFAULT false
);

CREATE TABLE assignments (
  id BIGSERIAL PRIMARY KEY,
  resource_id INTEGER REFERENCES resources(id),
  project_id INTEGER REFERENCES projects(id),
  day DATE NOT NULL,
  hours INTEGER NOT NULL
);

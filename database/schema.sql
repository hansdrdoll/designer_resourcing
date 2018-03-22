CREATE DATABASE designer_resourcing;

\c designer_resourcing;

DROP TABLE designers, client_services, projects, weeks;

CREATE TABLE designers (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slack_username VARCHAR(255),
  title VARCHAR(255),
  hourly_rate INTEGER
);

CREATE TABLE client_services (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE projects (
  id BIGSERIAL PRIMARY KEY,
  client_name VARCHAR(255) NOT NULL,
  starting_budget INTEGER,
  created DATE NOT NULL
);

CREATE TABLE weeks (
  id BIGSERIAL PRIMARY KEY,
  week_date DATE NOT NULL,
  designer_id INTEGER NOT NULL,
  cs_id INTEGER NOT NULL,
  project_id INTEGER NOT NULL,
  monday NUMERIC,
  tuesday NUMERIC,
  wednesday NUMERIC,
  thursday NUMERIC,
  friday NUMERIC
);

ALTER TABLE weeks ADD CONSTRAINT weeks_fk0 FOREIGN KEY (designer_id) REFERENCES designers(id);
ALTER TABLE weeks ADD CONSTRAINT weeks_fk1 FOREIGN KEY (cs_id) REFERENCES client_services(id);
ALTER TABLE weeks ADD CONSTRAINT weeks_fk2 FOREIGN KEY (project_id) REFERENCES projects(id);

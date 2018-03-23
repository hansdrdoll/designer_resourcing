\c designer_resourcing;

INSERT INTO resources
(name, title, hourly_rate, slack_username)
VALUES
('Genoveva Schaden', 'designer', '100', '@resource_username'),
('Horacio Boehm', 'senior designer', '100', '@resource_username'),
('Kamryn Schowalter', 'design director', '100', '@resource_username'),
('Kathlyn Bruen', 'art director', '100', '@resource_username'),
('Dolores Lueilwitz', 'creative director', '100', '@resource_username'),
('Felix Hilpert', 'executive creative director', '100', '@resource_username'),
('Godfrey Tillman', 'designer', '100', '@resource_username'),
('Macey Cronin', 'designer', '100', '@resource_username'),
('Lola Yundt', 'designer', '100', '@resource_username'),
('Jonathan Batz', 'designer', '100', '@resource_username'),
('Shyann Runte', 'designer', '100', '@resource_username'),
('Dayton Kshlerin', 'designer', '100', '@resource_username'),
('Mellie Hahn', 'designer', '100', '@resource_username');

INSERT INTO client_leads
(name, slack_username)
VALUES
('Eudora Welch', '@cs_username'),
('Violet Miller', '@cs_username'),
('Velma Kerluke', '@cs_username'),
('Zachery Ward', '@cs_username'),
('Alison Mraz', '@cs_username');

INSERT INTO projects
(client_name, starting_budget, created, cs_id)
VALUES
('Rice and Sons', 250000, '20180512', '1'),
('Harvey - MacGyver', 50000, '20180512', '1'),
('Eichmann LLC', 520000, '20180512', '2'),
('Prosacco LLC', 150000, '20180512', '3'),
('Klocko Group', 250000, '20180512', '1'),
('Grady LLC', 250000, '20180512', '1'),
('Maggio - Kuhn', 250000, '20180512', '2'),
('Carter, Olson and Mann', 250000, '20180512', '1');

INSERT INTO assignments
(resource_id, project_id, day, hours)
VALUES
(4, 3, '2018-03-19', 6),
(4, 3, '2018-03-20', 6),
(4, 3, '2018-03-21', 4),
(4, 3, '2018-03-22', 4),
(4, 3, '2018-03-23', 4),
(8, 6, '2018-03-19', 4),
(8, 6, '2018-03-20', 4),
(8, 6, '2018-03-21', 6),
(8, 6, '2018-03-22', 0),
(8, 6, '2018-03-23', 0),
(8, 8, '2018-03-19', 2),
(8, 8, '2018-03-20', 2),
(8, 8, '2018-03-21', 0),
(8, 8, '2018-03-22', 6),
(8, 8, '2018-03-23', 6),
(2, 3, '2018-03-19', 4),
(2, 3, '2018-03-20', 4),
(2, 3, '2018-03-21', 4),
(2, 3, '2018-03-22', 4),
(2, 3, '2018-03-23', 4),
(2, 5, '2018-03-19', 4),
(2, 5, '2018-03-20', 4),
(2, 5, '2018-03-21', 4),
(2, 5, '2018-03-22', 2),
(2, 5, '2018-03-23', 6);

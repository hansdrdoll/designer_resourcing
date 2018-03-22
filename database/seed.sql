\c designer_resourcing;

INSERT INTO designers
(name, title, hourly_rate)
VALUES
('Genoveva Schaden', 'designer', '100'),
('Horacio Boehm', 'senior designer', '100'),
('Kamryn Schowalter', 'design director', '100'),
('Kathlyn Bruen', 'art director', '100'),
('Dolores Lueilwitz', 'creative director', '100'),
('Felix Hilpert', 'executive creative director', '100'),
('Godfrey Tillman', 'designer', '100'),
('Macey Cronin', 'designer', '100'),
('Lola Yundt', 'designer', '100'),
('Jonathan Batz', 'designer', '100'),
('Shyann Runte', 'designer', '100'),
('Dayton Kshlerin', 'designer', '100'),
('Mellie Hahn', 'designer', '100');

INSERT INTO client_services
(name)
VALUES
('Eudora Welch'),
('Violet Miller'),
('Velma Kerluke'),
('Zachery Ward'),
('Alison Mraz');

INSERT INTO projects
(client_name, starting_budget, created)
VALUES
('Rice and Sons', 250000, '20180512'),
('Harvey - MacGyver', 50000, '20180512'),
('Eichmann LLC', 520000, '20180512'),
('Prosacco LLC', 150000, '20180512'),
('Klocko Group', 250000, '20180512'),
('Grady LLC', 250000, '20180512'),
('Maggio - Kuhn', 250000, '20180512'),
('Carter, Olson and Mann', 250000, '20180512');

INSERT INTO weeks
(week_date, designer_id, cs_id, project_id, monday, tuesday, wednesday, thursday, friday)
VALUES
('20180319', 1, 2, 1, 4, 4, 4, 4, 4),
('20180319', 2, 2, 2, 5.97, 5.97, 5.98, 7.14, 7.14),
('20180319', 3, 1, 1, 8, 8, 0, 0, 0),
('20180319', 3, 2, 3, 0, 0, 6, 2, 2),
('20180319', 3, 2, 2, 2.25, 2, 2.25, 2.25, 2.25),
('20180319', 4, 5, 4, 4, 6, 6, 6, 6),
('20180319', 4, 2, 2, 2.25, 2, 2.25, 2.25, 2.25),
('20180319', 5, 4, 5, 1, 1, 1, 1, 1),
('20180319', 5, 4, 6, 4, 4, 4, 4, 4),
('20180319', 6, 3, 1, 4, 4, 4, 4, 4),
('20180319', 6, 2, 7, 4, 4, 4, 4, 4),
('20180319', 7, 2, 1, 4, 4, 4, 4, 4),
('20180319', 7, 1, 8, 4, 4, 4, 4, 4);

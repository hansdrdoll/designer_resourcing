SELECT resources.name AS resource, client_leads.name AS client_lead, projects.client_name AS client, assignments.day, assignments.hours FROM assignments JOIN projects ON assignments.project_id = projects.id JOIN resources ON assignments.resource_id = resources.id JOIN client_leads ON projects.cs_id = client_leads.id WHERE resource_id = 4;


SELECT assignments.id AS assignment_id,
assignments.resource_id AS resource_id,
assignments.project_id AS project_id,
assignments.day,
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
ORDER BY cs_id, project_id, resource_id, day;


SELECT to_char(assignments.day, 'Day Month DD') AS day,
assignments.hours,
projects.client_name,
client_leads.name AS client_lead
FROM assignments
JOIN resources ON assignments.resource_id = resources.id
JOIN projects ON assignments.project_id = projects.id
JOIN client_leads On projects.cs_id = client_leads.id
WHERE resources.id = 2
ORDER BY assignments.day, assignments.project_id, projects.cs_id;


SELECT  assignments.hours,
        projects.client_name,
        client_leads.name AS client_lead
        FROM assignments
        JOIN resources ON assignments.resource_id = resources.id
        JOIN projects ON assignments.project_id = projects.id
        JOIN client_leads On projects.cs_id = client_leads.id
        WHERE resources.id = $1 AND assignments.day = CURRENT_DATE
        ORDER BY assignments.day, assignments.project_id, projects.cs_id;

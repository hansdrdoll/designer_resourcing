const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const methodOverride = require('method-override');
const Resource = require('./models/resource');
const ClientLeads = require('./models/client-leads');
const Projects = require('./models/projects');
const Assignments = require('./models/assignments');
const moment = require('moment');

// const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/static', express.static(__dirname + '/client'));
app.use('/uikit', express.static(__dirname + '/node_modules/uikit/dist/'));
app.use('/moment', express.static(__dirname + '/node_modules/moment/min/'));

app.set('view engine', 'ejs');

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

// redirect user to a good starting point until i make a landing page
app.route('/').get((request, response) => {
  response.redirect('/projects');
});

// this view shows all designers in the database
app.route('/resources')
  .get((request, response) => {
    // show all resources
    Resource.findAll()
      .then(allResources =>
        response.render('resources', { resources: allResources, newResource: '' }));
  })
  .post((request, response) => {
    // add a new resource
    const resourceData = request.body;
    Resource.create(resourceData)
      .then(newId =>
        Resource.findAll()
          .then(resources =>
            Resource.findOne(newId)
              .then(newResource =>
                response.render('resources', { resources, newResource }))));
  });

// the view/edit and update paths for individual designers/resources
app
  .route('/resources/:id')
  // show a specific resource
  .get((request, response) => {
    const resourceId = { id: request.params.id };
    Resource.findAll()
      .then(resources =>
        Resource.findOne(resourceId)
          .then(resource =>
            response.render('resource', { resources, resource, newResource: '' })));
  })
  .put((request, response) => {
    const resourceId = { id: request.params.id };
    const resourceData = request.body;
    Resource.update(resourceData, resourceId)
      .then(result =>
        Resource.findAll()
          .then(resources =>
            Resource.findOne(resourceId)
              .then(resource =>
                response.render('resource', { resources, resource, newResource: result }))));
  })
  .delete((request, response) => {
    const resourceId = { id: request.params.id };
    Resource.delete(resourceId)
      .then(response.redirect('/resources'));
  });

// the list/add views for new CS (client leads)
app
  .route('/client-leads')
  // show all clients
  .get((request, response) => {
    ClientLeads.findAll()
      .then(clientLeads => response.render('client-leads', { clientLeads, newClient: '' }));
  })
  // add a new client
  .post((request, response) => {
    const clientData = request.body;
    ClientLeads.create(clientData)
      .then(newClientId =>
        ClientLeads.findAll()
          .then(clientLeads =>
            ClientLeads.findOne(newClientId)
              .then(newClient =>
                response.render('client-leads', { clientLeads, newClient }))));
  });

// view or edit a specific CS person
app
  .route('/client-leads/:id')
  // show a specific clientleads
  .get((request, response) => {
    const clientId = { id: request.params.id };
    ClientLeads.findOne(clientId)
      .then(clientLead =>
        ClientLeads.findAll()
          .then(clientLeads =>
            response.render('client-lead', { clientLeads, clientLead })));
  })
  .put((request, response) => {
    const clientId = { id: request.params.id };
    const clientInfo = request.body;
    ClientLeads.update(clientInfo, clientId)
      .then(ClientLeads.findOne(clientId)
        .then(clientLead =>
          ClientLeads.findAll()
            .then(clientLeads =>
              response.render('client-leads', { clientLeads, clientLead }))));
  })
  .delete((request, response) => {
    const clientId = { id: request.params.id };
    ClientLeads.delete(clientId)
      .then(response.redirect('/client-leads'));
  });

// view/add new projects
app.route('/projects')
  // show all projects
  .get((request, response) => {
    Projects.findAll()
      .then(projects =>
        ClientLeads.findAll()
          .then(clientLeads =>
            response.render('projects', { projects, clientLeads, newProject: '' })));
  })
  // add a new project
  .post((request, response) => {
    const projectData = request.body;
    Projects.create(projectData)
      .then(projectId =>
        Projects.findAll()
          .then(projects =>
            ClientLeads.findAll()
              .then(clientLeads =>
                Projects.findOne(projectId)
                  .then(newProject =>
                    response.render('projects', { projects, clientLeads, newProject })))));
  });

// edit/delete projects
app.route('/projects/:id')
  .get((request, response) => {
    const projectId = { id: request.params.id };
    Projects.findAll()
      .then(projects =>
        ClientLeads.findAll()
          .then(clientLeads =>
            Projects.findOne(projectId)
              .then(thisProject =>
                response.render('project', { projects, clientLeads, thisProject }))));
  })
  .put((request, response) => {
    const projectId = { id: request.params.id };
    const projectData = request.body;
    Projects.update(projectData, projectId)
      .then(Projects.findAll()
        .then(projects =>
          ClientLeads.findAll()
            .then(clientLeads =>
              Projects.findOne(projectId)
                .then(thisProject =>
                  response.render('project', { projects, clientLeads, thisProject })))));
  })
  .delete((request, response) => {
    const projectId = { id: request.params.id };
    Projects.delete(projectId)
      .then(response.redirect('/projects'));
  });

// start the process of assigning resources to projects
app.route('/assign-resources')
  .get((request, response) => {
    Projects.findAll()
      .then(projects => response.render('assign-resources-get-project', { projects }));
  })
  .post((request, response) => {
    // add assignment to db
    Assignments.create(request.body);
    response.sendStatus(201);
  });

app.route('/assign-resources/project/:id')
  .get((request, response) => {
    const projectId = { id: request.params.id };
    Resource.findAll()
      .then(resources =>
        Projects.findOne(projectId)
          .then(project =>
            response.render('assign-resources-get-resources', { resources, project })));
  });

//
app.route('/assign-resources/week')
  // show a specific assignment
  .get((request, response) => {
    const reqResources = request.query.resources;
    const monday = request.query.monday;
    const projectId = { id: request.query.project_id };

    const tues = moment(monday).add(1, 'days').format('YYYY-MM-DD');
    const wed = moment(monday).add(2, 'days').format('YYYY-MM-DD');
    const thurs = moment(monday).add(3, 'days').format('YYYY-MM-DD');
    const fri = moment(monday).add(4, 'days').format('YYYY-MM-DD');
    const week = [monday, tues, wed, thurs, fri];

    Resource.findAny(reqResources)
      .then(resources =>
        Projects.findOne(projectId)
          .then(project =>
            response.render('make-assignments', { resources, project, week })));
  });

// view the report for the current week
app.route('/report')
  .get((request, response) => {
    // redirect to current week
    const lastMonday = moment().day('Monday').format('YYYY-MM-DD');
    response.redirect(`/report/${lastMonday}`);
  })
  .put((request, response) => {
    console.log(request.body);
    Assignments.update(request.body);
    response.sendStatus(201);
  });

// actually view the report for the week
app.route('/report/:week')
  // show a specific assignment
  .get((request, response) => {
    const monday = request.params.week;
    const tues = moment(monday).add(1, 'days').format('YYYY-MM-DD');
    const wed = moment(monday).add(2, 'days').format('YYYY-MM-DD');
    const thurs = moment(monday).add(3, 'days').format('YYYY-MM-DD');
    const fri = moment(monday).add(4, 'days').format('YYYY-MM-DD');
    const week = [monday, tues, wed, thurs, fri];
    Assignments.findAllInWeek(week)
      .then((assignmentData) => {
        console.log(assignmentData);
        if (assignmentData[0]) {
          response.render('report', { assignmentData });
        } else {
          const lastMonday = moment(monday).subtract(1, 'weeks').format('YYYY-MM-DD');
          response.send(`no data for this week. <a href="/assign-resources">Add some</a>, or see <a href="/report/${lastMonday}">last week?</a>`);
        }
      });
  });

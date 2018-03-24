const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const methodOverride = require('method-override');
const Resource = require('./models/resource');
const ClientLeads = require('./models/client-leads');
const Projects = require('./models/projects');

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

app.route('/').get((request, response) => {
  // show main view
  // response.render('index');
  response.render('index')
});

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
              .then(resource => {
                console.log(result)
                response.render('resource', { resources, resource, newResource: result })})));
              }
  )
  .delete((request, response) => {
    const resourceId = { id: request.params.id };
    Resource.delete(resourceId)
      .then(response.redirect('/resources'));
  });

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
              response.render('client-lead', { clientLeads, clientLead }))));
  })
  .delete((request, response) => {});

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

app.route('/projects/:id')
  .get((request, response) => {
    const projectId = { id: request.params.id };
    Projects.findAll()
      .then(projects =>
        ClientLeads.findAll()
          .then(clientLeads =>
            Projects.findOne(projectId)
              .then(thisProject =>
                response.render('project', { projects, clientLeads, thisProject }))))})
  .put((request, response) => {
    // update a project
  })
  .delete((request, response) => {})

app.get('/projects/:id/edit', (request, response) => {
  // show the edit project view
});

app.route('/assign-resources')
  .get((request, response) => {
    // redirect to current week
  })
  .post((request, response) => {
    // add assignment to db
  });

app.route('/assign-resources/:week')
  // show a specific assignment
  .get((request, response) => {
    // show
  })
  .put((request, response) => {
    // update method
  })
  .delete((request, response) => {
    // delete?
  });

app.route('/report')
  .get((request, response) => {
    // redirect to current week
  })
  .post((request, response) => {
    // add assignment to db
  });

app.route('/report/:week')
  // show a specific assignment
  .get((request, response) => {
    // week editor
  })
  .put((request, response) => {
    // update method
  })
  .delete((request, response) => {
    // delete?
  });

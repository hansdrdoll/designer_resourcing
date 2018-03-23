const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const methodOverride = require('method-override');
const Resource = require('./models/resource');
const ClientLeads = require('./models/client-leads');
// const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

app.route('/').get((request, response) => {
  // show main view
  response.render('index');
});

app.route('/resources')
  .get((request, response) => {
    // show all resources
    Resource.findAll()
      .then(resources => response.render('resources', { resources }));
  })
  .post((request, response) => {
    // add a new resource
  });

app
  .route('/resources/:id')
  // show a specific resource
  .get((request, response) => {
    //
  })
  .put((request, response) => {})
  .delete((request, response) => {});

app.get('/resources/:id/edit', (request, response) => {
  // show the edit resource view
});

app
  .route('/client-leads')
  // show all clients
  .get((request, response) => {
    ClientLeads()
      .then(clientLeadsData => response.render('client-leads', { clientLeadsData }));
  })
  // add a new client
  .post((request, response) => {});

app
  .route('/client-leads/:id')
  // show a specific clientleads
  .get((request, response) => {
    //
  })
  .put((request, response) => {})
  .delete((request, response) => {});

app.get('/client-leads/:id/edit', (request, response) => {
  // show the edit client leads view
});

app
  .route('/projects')
  // show all projects
  .get((request, response) => {
    response.render('projects/index');
  })
  // add a new project
  .post((request, response) => {});

app
  .route('/projects/:id')
  // show a specific project
  .get((request, response) => {
    //
  })
  .put((request, response) => {})
  .delete((request, response) => {});

app.get('/projects/:id/edit', (request, response) => {
  // show the edit project view
});

app
  .route('/assign-resources')
  .get((request, response) => {
    // redirect to current week
  })
  .post((request, response) => {
    // add assignment to db
  });

app
  .route('/assign-resources/:week')
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

app
  .route('/report')
  .get((request, response) => {
    // redirect to current week
  })
  .post((request, response) => {
    // add assignment to db
  });

app
  .route('/report/:week')
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

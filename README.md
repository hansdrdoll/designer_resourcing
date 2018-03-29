# designer_resourcing
An app for Studio Directors to assign working hours per week to their designers.

Demo:
https://still-thicket-36728.herokuapp.com

### Description:
Use this app to assign working hours per day, per week, per project to your creative staff (resources). The assignment process is built on the information you feed to the database about your projects, resources, and client leads.


### Features:

- Create, view, edit and delete resources, projects, and client leads.
- Use the "assign resources" view to connect your resources (designers) to a project, then assign working hours to your selected designers.
- A Slack bot is available to reply to requests for database information. 
- AirBNB linted

### Dependencies:

- Vanilla JS
- Express *including helmet, body-parser, and method-override*
- EJS
- PG-Promise
- Moment JS for date parsing
- Botkit for Slack Bot
- UIKit for CSS styling

### Code examples:

- A method to extract an unknown number of parameters from a SQL Select statement:
```javascript
Resource.findAny = (ids) => {
  const newIds = [];
  let manySelector = '$1';
  let i = 1;
  if (typeof ids !== 'string') {
    ids.forEach((id) => {
      newIds.push(Number(id));
      if (i < ids.length) {
        i += 1;
        manySelector = `${manySelector}, $${i}`;
      }
    });
    return db.any(
      `SELECT * FROM resources WHERE id IN (${manySelector})`,
      newIds,
    );
  }
  return db.any('SELECT * FROM resources WHERE id = $1', ids);
};
```

- Slackbot to return user schedule, based on botkit
```javascript
// tell the user their schedule
controller.hears('schedule', 'direct_message', function (bot, message) {
  bot.startConversation(message, function(err, convo) {
    convo.ask('Sure, what\'s your id number?', function(response, convo) {
      const id = response.text;
      db.any(`SELECT to_char(assignments.day, 'FMDay FMMonth FMDD') AS day,
        assignments.hours,
        projects.client_name,
        client_leads.name AS client_lead
        FROM assignments
        JOIN resources ON assignments.resource_id = resources.id
        JOIN projects ON assignments.project_id = projects.id
        JOIN client_leads On projects.cs_id = client_leads.id
        WHERE resources.id = $1
        ORDER BY assignments.day, assignments.project_id;`, id)
      .then(ass => {
        if (ass[1]) {
          for (let i = 0; i < ass.length; i++) {
            convo.next();
            convo.say(`On ${ass[i].day}, you're working ${ass[i].hours} hours on ${ass[i].client_name} with ${ass[i].client_lead}`)
          }
        }
      })
    })
  })
})
```

### User Stories:

- As a studio director, I want a uniform input method to collect requests, so I spend less time in 
meetings.
- As a studio director, I want to add my designers and their info to a database, so I can easily assign them to projects.
- As a studio director, I want create a project by selecting designers and assigning them hours, so I can later review all the assignments I've made.
- As a studio director, I want to assign hours to a designers based on specific numbers, a percentage of their time, or just select all day; so I can allocate their time however I'm thinking about it.
- As a studio director, I want an aggregated view all the requests for the week, so that I can easily see how my resources are divided.
- As a studio director, I want to see when there are conflicts between hours requested and who their CS is, so I can talk to their project lead and decide who to reassign.
- As a studio director, I want to see all the hours my designers are assigned per day and per project, so I can identify who may be over or under utilized.
- As a client lead, I want to see how my time requests impact my project budget, so I can plan based on more accurate projections.
- As a financial director, I want my studio director and client leads to include the budget in their request considerations, so that we don't wait until everyone puts in their timesheets to realize we're over budget.

### Planned Future Functionality:

- More robust error handling
- User authentication
- Input views for Client Leads (users) to make requests to the admin (Studio Director)
- Redesign report view to allow for reordering based on different criteria
- Use budget and hourly rate information to scope high-level project costs

### DB Schema

<img width="575" alt="db schema" src="https://git.generalassemb.ly/storage/user/9428/files/d88e1e00-31b9-11e8-8c16-cfd574d40fe0">

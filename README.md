# designer_resourcing
An app for Studio Directors to assign working hours per week to their designers.

### Description:
Use this app to assign working hours per day, per week, per project to your creative staff (*resources*). The assignment process is built on the information you feed to the database about your projects, resources, and client leads.


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
```
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

### User Stories:


### Planned Future Functionality:

- User authentication
- Redesign report view to allow for reordering based on different criteria
- Use budget and hourly rate information to scope high-level project costs

### DB Schema

<img width="575" alt="db schema" src="https://git.generalassemb.ly/storage/user/9428/files/d88e1e00-31b9-11e8-8c16-cfd574d40fe0">

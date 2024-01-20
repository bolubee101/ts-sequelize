import express from 'express';
const app = express();
const port = process.env.PORT || 3000;
import db from './server/models';
import { users } from './server/seeders/users';
import { projects } from './server/seeders/projects';
import { projectassignments } from './server/seeders/projectsassignments';

// const createProjectAssignments = () => {
//   projectassignments.map((assignment) => {
//     db.ProjectAssignment.create(assignment);
//   });
// };

// createProjectAssignments();

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Appp listening on port ${port}`);
  });
});

app.get('/', async (req, res) => {
  const users = await db.User.findAll({
    include: {
      model: db.Projects,
    },
  });
  res.json(users);
});

app.get('/seed', async (req, res) => {
  const createUsers = () => {
    users.map((user) => {
      db.User.create(user);
    });
  };

  const createProjects = () => {
    projects.map((project) => {
      db.Projects.create(project);
    });
  };

  createUsers();
  createProjects();

  res.json({
    message: 'data seeded successfully',
  });

  // const createProjectAssignments = () => {
  //   projectassignments.map((assignment) => {
  //     db.ProjectAssignment.create(assignment);
  //   });
  // };

  // createProjectAssignments();
});

app.get('/clear', async (req, res) => {
  db.User.destroy();
  db.Projects.destroy();

  res.json({
    message: 'data cleared successfully',
  });
});

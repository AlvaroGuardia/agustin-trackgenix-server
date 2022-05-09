// use "import" to import libraries
import express from 'express';
import projects from './resources/projects';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/projects', projects.getAll);
app.get('/projects/:id', projects.getById);

app.put('/projects/update/:id', projects.putById);

app.post('/projects/add', projects.create);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${port}`);
});

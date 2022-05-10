// use "import" to import libraries
import express from 'express';
import superAdmins from './resources/super-admins';

// import router
const employeesRouter = require('./resources/employees');

// use "require" to import JSON files
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/super-admins', superAdmins.getAll);
app.get('/super-admins/:id', superAdmins.getById);
app.get('/super-admins/byStatus/:status', superAdmins.getByStatus);
app.get('/super-admins/byName/:name', superAdmins.getByName);
app.get('/super-admins/byEmail/:email', superAdmins.getByEmail);
app.get('/super-admins/byPassword/:password', superAdmins.getByPassword);
app.get('/super-admins/byLastName/:lastName', superAdmins.getByLastName);
app.post('/super-admins/add', superAdmins.create);
app.put('/super-admins/update/:id', superAdmins.putById);
app.delete('/super-admins/delete/:id', superAdmins.deleteById);

app.use('/employees', employeesRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${port}`);
});

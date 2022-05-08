const fs = require('fs');
const projects = require('../data/projects.json');

function deleteById(req, res) {
  const { id } = req.params;
  const projectIndex = projects.findIndex((proj) => proj.id === parseInt(id, 10));
  if (projectIndex !== -1) {
    projects.splice(projectIndex, 1);
    fs.writeFileSync('./src/data/projects.json', JSON.stringify(projects));
    res.status(200).json({ msg: 'Project deleted', projects });
  } else {
    res.status(404).json({ msg: 'Project not found' });
  }
}

function getByFilterStatus(req, res) {
  // const { status } = req.params;
  const projectsFilter = projects.filter((proj) => proj.status === true);
  if (projectsFilter) {
    res.status(200).json(projectsFilter);
  } else {
    res.status(404).json({ msg: 'Project not found' });
  }
}

function getAll(req, res) {
  res.status(200).json(projects);
}

function getById(req, res) {
  const { id } = req.params;
  const project = projects.find((proj) => proj.id === parseInt(id, 10));
  if (project) {
    res.status(200).json(project);
  } else {
    res.status(404).json({ msg: 'Project not found' });
  }
}
function putById(req, res) {
  const { id } = req.params;
  const {
    name, description, status, exployees, tasks, timesheet, rates,
  } = req.body;
  const updatedProject = {
    id: parseInt(id, 10),
    name: name || '',
    description: description || '',
    status: status || '',
    exployees: exployees || '',
    tasks: tasks || '',
    timesheet: timesheet || '',
    rates: rates || '',
  };
  const projectIndex = projects.findIndex((proj) => proj.id === parseInt(id, 10));
  if (projectIndex !== -1) {
    projects[projectIndex] = updatedProject;
    fs.writeFileSync('./src/data/projects.json', JSON.stringify(projects));
    res.status(200).json({ msg: 'Project updated', updatedProject });
  } else {
    res.status(404).json({ msg: 'Project not found' });
  }
}
function create(req, res) {
  const {
    id, name, description, status, exployees, tasks, timesheet, rates,
  } = req.body;
  if (id && name && description && status && exployees && tasks && timesheet && rates) {
    const newProject = {
      id: parseInt(id, 10),
      name: name || '',
      description: description || '',
      status: status || '',
      exployees: exployees || '',
      tasks: tasks || '',
      timesheet: timesheet || '',
      rates: rates || '',
    };
    projects.push(newProject);
    fs.writeFile('./src/data/projects.json', JSON.stringify(projects), (err) => {
      if (err) {
        res.status(404).json({ msg: err });
      } else {
        res.status(201).json({ msg: 'Project created', newProject });
      }
    });
  } else {
    res.status(404).json({ msg: 'Data missing' });
  }
}
module.exports = {
  getAll,
  getById,
  putById,
  create,
  deleteById,
  getByFilterStatus,
};

/*
Crear un Project
Editar un Project
Obtener un Project
Eliminar un Project
Obtener la lista de Projects con la opción de usar filtros
Asignar un Employee a un Projects con un rol(QA, PM, DEV, TL)

Create — POST
Read/Retrieve — GET
Update — PUT/PATCH
Delete — DELETE
*/

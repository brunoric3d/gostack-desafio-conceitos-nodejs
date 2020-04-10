const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];


app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);

});


app.post("/repositories", (request, response) => {
  const {title, url, techs } = request.body;

  const repository = {id: uuid(), title, url, techs, likes: 0};

  repositories.push(repository)

  return response.status(200).json(repository);
});


app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const {title, url, techs } = request.body;

  const repositoryId = repositories.findIndex(repository => repository.id === id);

  if(repositoryId < 0) {
    return response.status(400).json({error:'Repository not found'});
  }

  const repository = { id, title, url, techs, likes: repositories[repositoryId].likes};

  repositories[repositoryId] = repository;

  return response.status(200).json(repository);
});


app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryId = repositories.findIndex(repository => repository.id === id);

  if(repositoryId < 0) {
    return response.status(400).json({error:'Repository not found'});
  }

  repositories.splice(repositoryId, 1);

  return response.status(204).json({message:'Deleted successfully'});
});


app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryId = repositories.findIndex(repository => repository.id === id);

  if(repositoryId < 0) {
    return response.status(400).json({error:'Repository not found'});
  }
  const repository = repositories[repositoryId];

  repository.likes++;

  return response.status(200).json(repository);
});

module.exports = app;

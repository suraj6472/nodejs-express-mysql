import Tutorial from "../models/tutorial.model.js";
const tutorial = {};

tutorial.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "content is required" });
  }

  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published,
  });
  Tutorial.create(tutorial, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || "something went wrong" });
    } else {
      res.send(data);
    }
  });
};

tutorial.getAll = (req, res) => {
  const title = req.params.title;
  Tutorial.getAll(title, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || "Something went wrong" });
    } else {
      res.send(data);
    }
  });
};

tutorial.getById = (req, res) => {
  Tutorial.getById(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || "Something went wrong" });
    } else {
      res.send(data);
    }
  });
};

tutorial.remove = (req, res) => {
  Tutorial.remove(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || "Something went wrong" });
    } else {
      res.send({
        message:
          data.affectedRows > 0
            ? "Tutorial deleted successfully"
            : "No data deleted",
      });
    }
  });
};

tutorial.updateById = (req, res) => {
  if (!req.body) {
    res.status(400).send("content is required");
  }

  const updatedData = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published,
  });

  Tutorial.updateById(req.params.id, updatedData, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || "something went wrong" });
    } else {
      res.send({
        message: "Tutotrial details updated successfully",
        data,
      });
    }
  });
};

tutorial.removeAll = (req, res) => {
  Tutorial.removeAll((err, data) => {
    if (err) {
      res.send({ message: err.message || "something went wrong" });
    } else {
      res.send({
        message:
          data.affectedRows > 0
            ? "Tutorials deleted successfully"
            : "No record deleted.",
      });
    }
  });
};

export default tutorial;

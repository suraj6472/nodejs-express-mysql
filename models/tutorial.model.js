import sql from "./db.js";

const Tutorial = function (tutorial) {
  this.title = tutorial.title;
  this.description = tutorial.description;
  this.published = tutorial.published;
};

Tutorial.create = (new_tutorial, result) => {
  sql.query("INSERT INTO tutorials SET ?", new_tutorial, (err, res) => {
    if (err) {
      console.log("error ", err);
      result(err, null);
      return;
    }
    const created_record = { id: res.insertId, ...new_tutorial };
    console.log("create tutorial ", created_record);
    result(null, created_record);
  });
};

Tutorial.getAll = (title, result) => {
  let query = "SELECT * FROM tutorials";
  if (title) {
    query += "WHERE title LIKE %" + title + "%";
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error ", err);
      result(err, null);
      return;
    }
    console.log("found tutorials: ", res);
    result(null, res);
  });
};

Tutorial.getById = (id, result) => {
  let query = "SELECT * FROM tutorials WHERE id = " + id;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      const data = res[0];
      console.log("found tutorials: ", data);
      result(null, data);
    }

    result({ kind: "not_found" }, null);
  });
};

Tutorial.updateById = (id, tutorial, result) => {
  let query =
    "UPDATE tutorials SET title = ?, description = ?,  published = ? WHERE id = ?";
  sql.query(
    query,
    [tutorial.title, tutorial.description, tutorial.published, id],
    (err, res) => {
      if (err) {
        console.log("error ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      const data = { id: id, ...tutorial };
      console.log("updated tutorial: ", data);
      result(null, data);
    }
  );
};

Tutorial.remove = (id, result) => {
  let query = "DELETE FROM tutorials WHERE id = ?";
  sql.query(query, id, (err, res) => {
    if (err) {
      console.log("error ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("tutorial deleted with id: ", id);
    result(null, res);
  });
};

Tutorial.removeAll = (result) => {
  let query = "DELETE FROM tutorials";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error ", err);
      result(null, res);
      return;
    }

    console.log(`deleted ${res.affectedRows} tutorials`);
    result(null, res);
  });
};

export default Tutorial;

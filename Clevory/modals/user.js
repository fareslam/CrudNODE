const sql = require("../config/connection.js");
// constructor
const User = function(user) {
  this.name = user.name;
  this.email = user.email;
  this.password = user.password;
  this.idc=user.idc;
};
User.create = (newUser, result) => {
  sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created tutorial: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};
User.findById = (id, result) => {
  sql.query(`SELECT * FROM user WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};
User.getAll = (result) => {
  let query = "SELECT * FROM user";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("user s: ", res);
    result(null, res);
  });
};
 
User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE user SET name = ?, email = ?, password = ? WHERE id = ?",
    [user.name, user.email, user.password, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated tutorial: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};
User.remove = (id, result) => {
  sql.query("DELETE FROM user WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted user with id: ", id);
    result(null, res);
  });
};
/*Tutorial.removeAll = result => {
  sql.query("DELETE FROM tutorials", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} tutorials`);
    result(null, res);
  });
};*/
module.exports = User;
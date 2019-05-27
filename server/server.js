require("dotenv").config();
var express = require("express");
var app = express();
var path = require("path");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var bcrypt = require("bcryptjs");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var logger = require("morgan");

// getting the mysql connection from config
var config = require("./config");

app.use(methodOverride("_method"));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.use(express.static("public"));

app.use(session({
  secret: "app",
  cookie: {
    maxAge: 1 * 1000 * 60 * 60 * 24 * 365
  },
  resave: true,
  saveUninitialized: true
}));

app.use(cookieParser());

// Set the app up with morgan
app.use(logger("dev"));

//allow the api to be accessed by other apps
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  next();
});

config.connection.connect();

app.get("/users/:user_id", function(req, res) {
  config.connection.query("SELECT * FROM users WHERE id = ?", [req.params.user_id], function(error, results, fields) {
    if (error) throw error;

    res.json(results[0]);
  });
});

app.post("/signup/:username/:password", function(req, res) {

  bcrypt.genSalt(10, function(err, salt) {
    // res.send(salt);
    bcrypt.hash(req.params.password, salt, function(err, p_hash) {

      // res.send(p_hash);

      config.connection.query("INSERT INTO users (username, password_hash) VALUES (?, ?)", [req.params.username, p_hash], function(error, results, fields) {

        var what_user_sees = "";
        if (error) {
          what_user_sees = "Username already exists.";
        } else {
          what_user_sees = "Account successfully created. Login to continue.";
        }

        res.json(what_user_sees);

      });
    });
  });
});

app.post("/login/:username/:password", function(req, res) {

  config.connection.query("SELECT * FROM users WHERE username = ?", [req.params.username], function(error, results, fields) {

    if (error) throw error;

    // res.json(results);

    if (results.length == 0) {
      res.json("Username does not exist.");
    } else {
      bcrypt.compare(req.params.password, results[0].password_hash, function(err, result) {

        if (result == true) {

          req.session.user_id = results[0].id;
          req.session.username = results[0].username;

          res.json(
            {msg: "You are logged in.",
            user_id: results[0].id,
            username: results[0].username}
            );

        } else {

          res.json("Username and password does not match.");
        }
      });
    }
  });
});

// inserts info into notebooks table
app.post("/add-notebook/:user_id", function(req, res) {

  config.connection.query("INSERT INTO notebooks (notebook_name, user_id) VALUES (?, ?)", [req.body.notebook_name, req.params.user_id], function(error, results, fields) {

      if (error) res.send(error)
      else res.send(results.insertId.toString());

  });

});

// inserts info into notes table
app.post("/add-notes/:notebook_id", function(req, res) {

  config.connection.query("INSERT INTO notes (title,ingredients,instructions,image,source,notebook_id) VALUES (?,?,?,?,?,?)",
    [req.body.title,req.body.ingredients,req.body.instructions,req.body.image,req.body.source,req.params.notebook_id],
    function(error, results, fields) {

      if (error) res.send(error)
      else res.send(results.insertId.toString());

  });
});

// gets all notes for specified notebook
app.get("/get-notebook-notes/:notebook_id", function(req, res) {

  config.connection.query("SELECT * FROM notes WHERE notebook_id = ?", [req.params.notebook_id], function(error, results, fields) {

    if (error) res.send(error)
    else res.json(results);

  });
});

// gets all notes for specified user
app.get("/get-all-notes/:user_id", function(req, res) {

  var allNotes = `SELECT notes.id AS Notes_Id,
                        notes.title,notes.ingredients,
                        notes.instructions,
                        notes.image,notes.source,
                        notes.notebook_id AS notesNb_Id,
                        notebooks.id AS Notebooks_Id,
                        notebooks.notebook_name 
                  FROM notes
                  RIGHT JOIN notebooks 
                  ON notes.notebook_id = notebooks.id
                  WHERE notebooks.user_id = ?
                  ORDER BY notebooks.notebook_name`

  config.connection.query(allNotes, [req.params.user_id], function(error, results, fields) {

    if (error) res.send(error)
    else res.json(results);

  });
});

// gets all notebooks for specified user
app.get("/get-all-notebooks/:user_id", function(req, res) {

  var allNotebooks = `SELECT notebooks.id,notebooks.notebook_name 
                      FROM notebooks
                      LEFT JOIN users 
                      ON notebooks.user_id = users.id 
                      WHERE users.id = ?`

  config.connection.query(allNotebooks, [req.params.user_id], function(error, results, fields) {

    if (error) res.send(error)
    else res.json(results);

  });
});

// gets recipe for specified note
app.get("/get-note/:noteId", function(req, res) {

  var recipe = `SELECT * 
                FROM notes
                WHERE id = ?`

  config.connection.query(recipe, [req.params.noteId], function(error, results, fields) {

    if (error) res.send(error)
    else res.json(results);

  });
});

app.post("/recipe-update/:noteId", function(req, res) {

  var updateRecipe = `UPDATE notes SET 
                      title = ?, 
                      ingredients = ?, 
                      instructions = ?,
                      image = ?,
                      source = ?
                      WHERE id = ?`
  console.log(updateRecipe);
  config.connection.query(updateRecipe, [req.body.title,req.body.ingredients,req.body.instructions,req.body.image,req.body.source,req.params.noteId], function(error, results, fields) {

    if (error) res.send(error)
    else res.json(results);

  });
});

app.get("/get-session", function(req, res) {
  var user_info = {
    user_id: req.session.user_id,
    username: req.session.username
  }

  res.json(user_info);
});

// app.get('/get-session', function(req, res) {
//   console.log(req.session.uname)
//   res.send([req.session.uname, req.session.uid, req.session.tid, req.session.tname, req.session.uscore])
// });

app.get("/logout", function(req, res) {
  req.session.destroy(function(err) {
    res.json("you are logged out");
  })
});

var PORT = process.env.PORT || 5000
app.listen(PORT, function() {
  console.log(`listening on ${PORT}`);
});
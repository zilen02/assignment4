import bodyParser from "body-parser";
import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import initialize, {
  getStudentsData,
  getCoursesData,
  getTAs,
  getStudentsByCourse,
  getStudentByNum,
  addStudent,
} from "./modules/collegeData.js";

var app = express();
var HTTP_PORT = process.env.PORT || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// setup a 'route' to listen on the default url path
app.get("/students", (req, res) => {
  getStudentsData()
    .then((value) => {
      res.send(value);
    })
    .catch((err) => {
      res.send({ message: "no results" });
    });
});

app.get("/tas", (req, res) => {
  getTAs()
    .then((value) => {
      res.send(value);
    })
    .catch((err) => {
      res.send({ message: "no results" });
    });
});

app.get("/courses", (req, res) => {
  getCoursesData()
    .then((value) => {
      res.send(value);
    })
    .catch((err) => {
      res.send({ message: "no results" });
    });
});

app.get("/students/:course", (req, res) => {
  getStudentsByCourse(req.params.course)
    .then((value) => {
      res.send(value);
    })
    .catch((err) => {
      res.send({ message: "no results" });
    });
});

app.get("/student/:id", (req, res) => {
  getStudentByNum(req.params.id)
    .then((value) => {
      res.send(value);
    })
    .catch((err) => {
      res.send({ message: "no results" });
    });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/home.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/about.html"));
});

app.get("/htmlDemo", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/htmlDemo.html"));
});

app.get("/studentss/add", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/addStudent.html"));
});

app.post("/studentss/add", (req, res) => {
  addStudent(req.body)
    .then((value) => {
      res.send(value);
    })
    .catch((err) => {
      res.send({ message: "no results" });
    });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/error.html"));
});

// setup http server to listen on HTTP_PORT
initialize()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log("server listening on port: " + HTTP_PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

import { promises as fs } from 'fs';
import bodyParser from 'body-parser';
import express from 'express';

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

const port = 3001; // You can choose any port

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  next();
});

app.get("/students", async (req, res) => {
  const { search } = req.query;
  const studentsFileContent = await fs.readFile("./data/students.json");
  let studentList = JSON.parse(studentsFileContent);

  if (search) {
    studentList = studentList.filter((student) => {
      const searchableText = `${student.firstName} ${student.lastName}`;
      return searchableText.toLowerCase().includes(search.toLowerCase());
    });
  }

  res.json({
    students: studentList.map((student) => ({
      indId: student.indId,
      id: student.id,
      firstName: student.firstName,
      lastName: student.lastName,
      gender: student.gender,
      birthday: student.birthday,
      allergies: student.allergies,
      specialNotes: student.specialNotes,
      parentContact: student.parentContact,
    })),
  });
});

app.get("/students:id", async (req, res) => {
  const { id } = req.params;

  const studentsFileContent = await fs.readFile("./data/students.json");
  let studentList = JSON.parse(studentsFileContent);

  const student = student.find((student) => student.indId === id);

  if (search) {
    studentList = studentList.filter((student) => {
      const searchableText = `${student.firstName} ${student.lastName}`;
      return searchableText.toLowerCase().includes(search.toLowerCase());
    });
  }

  if (!student) {
    return res
      .status(404)
      .json({ message: `For the id ${id}, no student could be found.` });
  }

  setTimeout(() => {
    res.json({ student });
  }, 1000);
});

app.post("/students", async (req, res) => {
  const { student } = req.body;

  if (!student) {
    return res.status(400).json({ message: "Student is required" });
  }

  console.log(student);
  console.log('student.indId', !student.intId?.trim());
  console.log('student.id', !student.id?.trim());
  console.log('student.lastName', !student.lastName?.trim());
  console.log('student.gender', !student.gender?.trim());
  console.log('student.birthday', !student.birthday?.trim());
  console.log('student.parentContact', !student.parentContact);


  if (
    !student.intId?.trim() ||
    !student.id?.trim() ||
    !student.firstName?.trim() ||
    !student.lastName?.trim() ||
    !student.gender?.trim() ||
    !student.birthday?.trim() ||
    !student.parentContact
  ) {
    return res.status(400).json({ message: "Invalid data provided." });
  }

  const studentsFileContent = await fs.readFile("./data/students.json");
  const studentList = JSON.parse(studentsFileContent);

  const newStudent = {
    intId: Math.round(Math.random() * 10000).toString(),
    ...student,
  };

  studentList.push(newStudent);

  await fs.writeFile("./data/students.json", JSON.stringify(studentList));

  res.json({ student: newStudent });
});

app.listen(port, () => {
  console.log(`Server is running on port number ${port}`);
});

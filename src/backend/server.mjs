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
      profileImgUrl: student.profileImgUrl
    })),
  });
});

app.get("/students/:id", async (req, res) => {
  console.log('req.params', req.params);

  const { id } = req.params;
  const studentsFileContent = await fs.readFile("./data/students.json");
  let studentList = JSON.parse(studentsFileContent);

  const student = studentList.find((student) => student.id === id);

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

  if (
    !student.id?.trim() ||
    !student.firstName?.trim() ||
    !student.lastName?.trim() ||
    !student.gender?.trim() ||
    !student.birthday?.trim() ||
    !student.profileImgUrl?.trim() ||
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

app.get("/chats", async (req, res) => {
  const chatFileContent = await fs.readFile("./data/chats.json");
  let chatList = JSON.parse(chatFileContent);

  res.json({
    chat: chatList
  });
});

app.get("/chats/:id", async (req, res) => {
  const { id } = req.params;

  const chatFileContent = await fs.readFile("./data/chats.json");
  let chatList = JSON.parse(chatFileContent);

  const selectedChat = chatList.find((c) => c.conversation_id === id);
  console.log('selectedChat',selectedChat);
  if (!selectedChat) {
    return res
      .status(404)
      .json({ message: `For the id ${id}, no student could be found.` });
  }

  res.json({
    chat: selectedChat
  });
});

app.listen(port, () => {
  console.log(`Server is running on port number ${port}`);
});

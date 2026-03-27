const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// Data dummy
let students = [
  { id: 1, nama: "Andi", jurusan: "Informatika" },
  { id: 2, nama: "Budi", jurusan: "Sistem Informasi" },
  { id: 3, nama: "Citra", jurusan: "Teknik Komputer" },
];

// Home
app.get("/", (req, res) => {
  res.send("API Mahasiswa berjalan");
});

// GET semua
app.get("/students", (req, res) => {
  res.json(students);
});

// GET by ID
app.get("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.send("Mahasiswa tidak ditemukan");
  }

  res.json(student);
});

// POST
app.post("/students", (req, res) => {
  const { nama, jurusan } = req.body;

  const newStudent = {
    id: students.length + 1,
    nama,
    jurusan
  };

  students.push(newStudent);
  res.json(newStudent);
});

// PUT
app.put("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nama, jurusan } = req.body;

  const student = students.find(s => s.id === id);

  if (!student) {
    return res.send("Mahasiswa tidak ditemukan");
  }

  student.nama = nama;
  student.jurusan = jurusan;

  res.json(student);
});

// DELETE
app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.send("Mahasiswa tidak ditemukan");
  }

  students.splice(index, 1);
  res.send("Mahasiswa berhasil dihapus");
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});

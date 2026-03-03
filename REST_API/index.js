const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const dir_path = path.join(__dirname, 'userData');
const file_path = `${dir_path}/users.json`;
PORT = 8100;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const Data = [];

app.post("/api/addUser", (req, res) => {
    const body = req.body;

    const newUser = { ...body, id: Data.length + 1 };
    Data.push(newUser);

    fs.writeFile(file_path, JSON.stringify(Data), (err, data) => {
        if (err) {
            return res.json("may be some error.")
        }
        return res.json({ status: "success", id: Data.length });
    })
})

app.get("/api/users", (req, res) => {
    fs.readFile(file_path, "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json({ message: "File read error" });
        }

        if (!data) {
            return res.json([]);
        }

        const users = JSON.parse(data);
        return res.status(200).json(users);
    });
});

app.get("/api/user/:id", (req, res) => {
    const user = req.params;
    res.json(user);
})

app.listen(PORT, () => {
    console.log(`server is running on Port http://localhost:${PORT}`);
})
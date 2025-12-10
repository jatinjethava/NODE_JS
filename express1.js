const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const publicPath = path.join(__dirname, 'public');

// app.use(express.static(publicPath));
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(`${publicPath}/about.html`);
});

app.set('view engine', 'ejs');

app.get('/profile', (req, res) => {
    const user = {
        name: 'Jatin Jethava',
        age: 30,
        email: 'jatin@gmail.com'
    };
    res.render('profile', { user });
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(publicPath, '404.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


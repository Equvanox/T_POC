const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(dashboardRoutes);

console.log("Reached Server");

const users = [
    { username: 'MxAdmin', password: '1' },
    { username: 'r.tawase2@tegna.com', password: '1' }
];

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);
    if (!user || user.password !== password) {
        return res.status(401).send('Invalid username or password');
    }

    const token = jwt.sign({ username: user.username }, 'secret-key', { expiresIn: '1h' });
    res.json({ token });
});


const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.sendStatus(403);
    }

    jwt.verify(token, 'secret-key', (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};

app.get('/home', authenticateJWT, (req, res) => {
    res.send('This is the protected home page');
});

app.listen(3000, () => {
    console.log('\nNode Server running on port 3000...\n');
});
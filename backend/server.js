const express = require(`express`);
const session = require(`express-session`);
const cors = require(`cors`);

// App config
const app = express();
const port = process.env.PORT || 3030;

// Middlewares
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(session({
    secret: `secret-key`,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: "none",
    },
}))

// DB config
const users = [];

app.get(`/users`, (req, res) => {
    res.status(200).send(users);
})

// API endpoints
app.post(`/register`, (req, res) => {
    const newUser = {
        id: Date.now().toString(),
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    users.push(newUser);

    req.session.user = newUser;
    res.status(201).send(req.session.user);
})

app.post(`/login`, (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = users.find(acc => acc.email === email);

    if (password === user.password) {
        req.session.user = user;
        res.status(200).send(req.session.user);
    }

    if (password !== user.password) {
        res.status(401).send(`Incorrect password.`);
    }
})

app.get(`/user`, (req, res) => {
    
    if (!req.session.user) {
        res.status(401).send({ redirect: true });
    }

    if (req.session.user) {
        res.status(200).send({
            username: req.session.user.username,
            email: req.session.user.email
        });
    }
})

app.post(`/log-out`, (req, res) => {
    const logOut = req.body.logOut;

    if (logOut) {
        req.session.destroy();
    }
})

// Listener
app.listen(
    port,
    console.log(`Server is running on port http://localhost:${port}`)
)
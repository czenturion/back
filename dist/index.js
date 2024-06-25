"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const jsonBodyMiddleware = express_1.default.json();
app.use(jsonBodyMiddleware);
const db = {
    users: [
        { id: 1, name: 'first' },
        { id: 2, name: 'second' },
        { id: 3, name: 'third' },
        { id: 4, name: 'fourth' }
    ]
};
app.get('/', (req, res) => {
    res.json({ message: [{ id: 1 }, { id: 2 }, { id: 3 }] });
});
app.get('/users', (req, res) => {
    let foundUsers = db.users;
    if (req.query.name) {
        foundUsers = foundUsers
            .filter(u => u.name.indexOf(req.query.name) > -1);
    }
    if (foundUsers.length === 0) {
        res.sendStatus(404);
        return;
    }
    res.send(foundUsers);
});
app.get('/users/:id', (req, res) => {
    const foundUser = db.users.find(u => u.id === +req.params.id);
    if (!foundUser) {
        res.sendStatus(404);
        return;
    }
    res.json(foundUser);
});
app.post('/users', (req, res) => {
    if (!req.body.name) {
        res.sendStatus(400);
        return;
    }
    const createdUser = {
        id: +(new Date()),
        name: req.body.name
    };
    db.users.push(createdUser);
    res
        .status(201)
        .json(createdUser);
});
app.delete('/users/:id', (req, res) => {
    db.users = db.users.filter(u => u.id !== +req.params.id);
    res.sendStatus(204);
});
app.put('/users/:id', (req, res) => {
    if (!req.body.name) {
        res.sendStatus(400);
        return;
    }
    const foundUser = db.users.find(u => u.id === +req.params.id);
    if (!foundUser) {
        res.sendStatus(404);
        return;
    }
    foundUser.name = req.body.name;
    res.sendStatus(204);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

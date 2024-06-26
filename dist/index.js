"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = process.env.port || 5000;
const jsonBodyMiddleware = express_1.default.json();
app.use(jsonBodyMiddleware);
const db = {
    users: [
        { id: 1, name: 'first' },
        { id: 2, name: 'second' },
        { id: 3, name: 'third' },
        { id: 4, name: 'fourth' },
        { id: 5, name: 'fifth' }
    ]
};
const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
};
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '/pages/home.html'));
});
app.get('/users', (req, res) => {
    const name = req.query.name;
    let foundUsers = db.users;
    if (name) {
        foundUsers = foundUsers
            .filter(u => u.name.indexOf(name) > -1);
    }
    if (foundUsers.length === 0) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    res.send(foundUsers);
});
app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const foundUser = db.users.find(u => u.id === +id);
    if (!foundUser) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    res.json(foundUser);
});
app.post('/users', (req, res) => {
    const name = req.body.name;
    if (!name) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }
    const createdUser = {
        id: +(new Date()),
        name: name
    };
    db.users.push(createdUser);
    res
        .status(HTTP_STATUSES.CREATED_201)
        .json(createdUser);
});
app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    db.users = db.users.filter(u => u.id !== +id);
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});
app.put('/users/:id', (req, res) => {
    const name = req.body.name;
    if (!name) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }
    const id = req.params.id;
    const foundUser = db.users.find(u => u.id === +id);
    if (!foundUser) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    foundUser.name = name;
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("@zodios/express");
const api_1 = require("../api");
const cors_1 = __importDefault(require("cors"));
const PORT = 5000;
const app = (0, express_1.zodiosApp)(api_1.api);
app.use((0, cors_1.default)());
const router = (0, express_1.zodiosRouter)(api_1.api);
router.get("/api/inner/v1/user", (req, res) => {
    return res.status(200).json({
        name: "lightscrool",
        avatar: "https://sun9-31.userapi.com/impg/JVZN-arcHtZVnlFxglTpLHOi4BM3kUNkBnLd7A/uPuypOEXvcg.jpg?size=1000x1501&quality=95&sign=f3f3e077fcbd1e4e14506c431fc1f327&type=album",
    });
});
const projects = [
    {
        alias: "alias1",
        name: "Проект",
        presets: [],
    },
    {
        alias: "alias2",
        name: "Проект 2",
        description: "Ещё один проект",
        presets: [],
    },
];
router.get("/api/inner/v1/user/projects", (req, res) => {
    return res.status(200).json(projects.map((project) => ({
        alias: project.alias,
        name: project.name,
        description: project.description,
    })));
});
router.post("/api/inner/v1/projects", (req, res) => {
    projects.push(Object.assign(Object.assign({}, req.body), { presets: [] }));
    return res.status(200).json("ok");
});
router.delete("/api/inner/v1/projects/:projectAlias", (req, res) => {
    const index = projects.findIndex((el) => el.alias === req.params.projectAlias);
    if (index === -1) {
        return res.status(404);
    }
    projects.splice(index);
    return res.status(200).json("ok");
});
router.get("/api/inner/v1/projects/:projectAlias", (req, res) => {
    const index = projects.findIndex((el) => el.alias === req.params.projectAlias);
    if (index === -1) {
        return res.status(404);
    }
    return res.status(200).json(projects[index]);
});
const genKey = () => new Array(16)
    .fill(0)
    .map(() => Math.round(Math.random() * 10))
    .join("");
let apiKey = genKey();
router.get("/api/inner/v1/projects/:projectAlias/apiKey", (req, res) => {
    return res.status(200).json({ apiKey });
});
router.delete("/api/inner/v1/projects/:projectAlias/apiKey", (req, res) => {
    apiKey = genKey();
    return res.status(200).json("ok");
});
app.use(router);
app.listen(PORT, () => console.log(`Listening to port=${PORT}`));

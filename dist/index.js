"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const port = 9400;
const app = (0, express_1.default)();
app.get("/edit", (req, res) => {
    console.log("Connection established");
    res.send("Hello world!");
});
app.listen(port, () => {
    console.log(`Server started at localhost:${port}`);
});

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs = __importStar(require("fs"));
// import PDFDocument from "pdfkit";
const PDFDocument = require("pdfkit-table");
const port = 9400;
const app = (0, express_1.default)();
app.get("/edit", (req, res) => {
    console.log("Connection established");
    res.send("Hello world!");
});
app.get("/print", (req, res) => {
    createPDF();
    console.log("Created PDF file.");
    res.send("File created, see ./output");
});
app.listen(port, () => {
    console.log(`Server started at localhost:${port}`);
});
function createPDF() {
    const doc = new PDFDocument({ margin: 20, size: "A4" });
    doc.pipe(fs.createWriteStream(".\\output\\out.pdf"));
    const table = {
        title: "Titel",
        headers: [
            { label: "Mitglied", headerColor: "#FFFFFF" },
            { label: "Wohnort", headerColor: "#FFFFFF" },
            { label: "Telefonnummer", headerColor: "#AAAAAA" }
        ],
        rows: [
            ["Erika Mustermann", "Berlin", "01234/567890"],
            ["Max Mustermann", "Dresden", "01234/567890"],
            ["Laura Mustermann", "Leipzig", "01234/567890"],
        ]
    };
    doc
        // .font("Arial")
        .fontSize(12)
        .text("Some text in a pdf!", 100, 100)
        .table(table, { width: 300 })
        .end();
}

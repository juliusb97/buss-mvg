import express, { application } from "express";
import * as pdf from "pdfkit";
import * as fs from "fs";
// import PDFDocument from "pdfkit";
const PDFDocument = require("pdfkit-table");

const port = 9400;
const app = express();

app.get("/edit", (req: any, res: any) =>{
	console.log("Connection established");
	res.send("Hello world!");
});

app.get("/print", (req: any, res: any) => {

	createPDF();

	console.log("Created PDF file.");
	res.send("File created, see ./output");
})

app.listen(port, () =>{
	console.log(`Server started at localhost:${ port }`);
});

function createPDF(){
	const doc = new PDFDocument({ margin: 20, size: "A4"});
	doc.pipe(fs.createWriteStream(".\\output\\out.pdf"));

	const table = {
		title: "Titel",
		headers: [
			{ label: "Mitglied", headerColor: "#FFFFFF"},
			{ label: "Wohnort", headerColor: "#FFFFFF"},
			{ label: "Telefonnummer", headerColor: "#AAAAAA"}
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
		.table(table, { width: 300})
		.end();
}
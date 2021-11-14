import express, { application } from "express";
import * as pdf from "pdfkit";
import * as fs from "fs";
import { Member, conventToColor, date, Address, Convent, Retirement, Mail } from "./member.entity.js";
import path from "path";
import PDFDocument from "pdfkit-table";
import cors from "cors";
// const PDFDocument = require("pdfkit-table");
// import PDFDocument from "pdfkit";

const port = 9400;
const app = express();

app.use(cors({
	origin: "*"
}));

app.get("/edit", (req: any, res: any) =>{
	console.log("Connection established");
	res.send("Hello world!");
});

app.get("/print", (req: any, res: any) => {

	createPDF();

	console.log("Created PDF file.");
	res.send("File created, see ./output");
});

app.get("/test", (req: any, res: any) => {
	res.setHeader("Content-Type", "application/json");

	let serialized = muster.serialize();

	res.status(200).send(serialized);
})

app.use(express.static('public'));
app.get('*', (req, res) => {
	const __dirname = path.resolve();
   	res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port, () =>{
	console.log(`Server started at localhost:${ port }`);
});

function createPDF(){
	const doc = new PDFDocument({ margin: 20, size: "A5"});
	doc.pipe(fs.createWriteStream(".\\output\\out.pdf"));

	const table = tableMaker(muster);

	doc
		// .lineWidth(0.5)
		// .moveTo(19.75, 16)
		// .lineTo(19.75, 192)
		// .stroke("#C0C0C0")
		// .stroke("#666666")
		.image("./assets/person.png", 180, 25, {width: 75})
		.table(table, { width: 300})
		.end();
}

function tableMaker(member: Member): any {
	return {
		options: {x: 70, y: 100},
		headers: [
			// { label: "", width: 5, headerColor: conventToColor(member.convent)},
			{ label: member.firstName + " " + member.lastName, width: 200, headerColor: conventToColor(member.convent)},
			{ label: "geb.", width: 35, headerColor: conventToColor(member.convent)},
			{ label: member.dob.toString(), width: 80, headerColor: conventToColor(member.convent)},
			// { label: "", width: 5, headerColor: conventToColor(member.convent)},
		],
		rows: [
			[member.title, "Mitgl.", member.joinDate],
			[member.description, "Diak.", member.diakon],
			["", "Tel. d.", member.telWork],
			["", "Fax", member.faxPrivate],
			["", "Fax. d.", member.telPrivate],
			[member.marriageDate.toString(), "Mobil", member.telPrivate],
			[member.marriage, "geb.", member.dobPartner.toString()],
			[member.location.toString()[0], "Mail", member.mailPrivat],
			[member.location.toString()[1], "Mail d.", member.mailWork]
		]
	}

	// return {
	// 	options: {x: 70, y: 100},
	// 	headers: [
	// 		{ label: "", width: 5, headerColor: conventToColor(member.convent)},
	// 		{ label: member.firstName + " " + member.lastName, width: 200, headerColor: conventToColor(member.convent), options: {fontSize: 15}},
	// 		{ label: "geb.", width: 35, headerColor: conventToColor(member.convent), options: {fontSize: 15}},
	// 		{ label: member.dob.toString(), width: 80, headerColor: conventToColor(member.convent), options: {fontSize: 15}},
	// 		{ label: "", width: 5, headerColor: conventToColor(member.convent)},
	// 	],
	// 	rows: [
	// 		["", member.title, "Mitgl.", member.joinDate, ""],
	// 		["", member.description, "Diak.", member.diakon, ""],
	// 		["", "", "Tel. d.", member.telWork, ""],
	// 		["", "", "Fax", member.faxPrivate, ""],
	// 		["", "", "Fax. d.", member.telPrivate, ""],
	// 		["", member.marriageDate.toString(), "Mobil", member.telPrivate, ""],
	// 		["", member.marriage, "geb.", member.dobPartner.toString(), ""],
	// 		["", member.location.toString()[0], "Mail", member.mailPrivat, ""],
	// 		["", member.location.toString()[1], "Mail d.", member.mailWork, ""]
	// 	]
	// }
}

let muster = new Member(
	"Max",
	"Mustermann",
	new date(1, 2, 1960),
	new Address("Berlin", "01219", "Schlossallee 10"),
	Convent.N, "Diakon",
	new date(11, 2, 1996),
	new date(15, 7, 200),
	"verh. mit Mustermann, Erika geb. Schmidt",
	new Mail("max.muster@t-online.de"),
	new Mail("max.muster@musterfirma.de"),
	new date(21, 8, 1985),
	new date(19, 2, 1997),
	"Dipl. Sozialpädagoge",
	Retirement.nicht,
	"01234/567890",
	"01234/567890",
	"01234/567890",
	"01234/567890"
);
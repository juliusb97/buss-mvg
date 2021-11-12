import express, { application } from "express";

const port = 9400;
const app = express();

app.get("/edit", (req, res) =>{
	console.log("Connection established");
	res.send("Hello world!");
});

app.listen(port, () =>{
	console.log(`Server started at localhost:${ port }`);
});
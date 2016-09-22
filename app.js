var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();

var vballTerms = [
	{
		term: "Volley",
		def: "When the ball is passed back and forth over the net."
	},
	{
		term: "Pepper",
		def: "A warm-up exercise in which two (or more) players pass the ball in between one another, setting each other up to set, spike and pass."
	},
	{
		term: "Rally",
		def: "The play taking place between when the ball is served and the point is earned."
	}
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(function(req, res, next) {
	
	console.log(`${req.method} request for '${req.url}' -${JSON.stringify(req.body)}`);
	next();
});

app.use(express.static("./public"));

app.use(cors());

app.get("/dictionary-api", function(req, res) {
	res.json(vballTerms);
});

app.post("/dictionary-api", function(req, res) {
	vballTerms.push(req.body);
	res.json(vballTerms);
});

app.delete("/dictionary-api/:term", function(req, res) {
	vballTerms = vballTerms.filter(function(definition) {
		return definition.term.toLowerCase() !== req.params.term.toLowerCase();
	});
	res.json(vballTerms);
});

app.listen(3000);

console.log("Vballdictionary app running on port 3000");

module.exports = app;
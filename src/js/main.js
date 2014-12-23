//Use CommonJS style via browserify to load other modules

var ich = require("icanhaz");
var quizTemplate = require("./_quizTemplate.html");
ich.addTemplate("quizTemplate", quizTemplate);

document.body.innerHTML = ich.quizTemplate(quizData);
//Use CommonJS style via browserify to load other modules

var ich = require("icanhaz");
var quizTemplate = require("./_quizTemplate.html");

// Set up quiz box template
ich.addTemplate("quizTemplate", quizTemplate);
document.querySelector(".quiz-box").innerHTML = ich.quizTemplate(quizData[0]);

//Use CommonJS style via browserify to load other modules

var $ = require("jquery");
var ich = require("icanhaz");
var quizTemplate = require("./_quizTemplate.html");

// Set up quiz box template
ich.addTemplate("quizTemplate", quizTemplate);

var showQuestion = function(index) {
  $(".question-box").html(ich.quizTemplate(quizData[index]));
};

var answers = [];
var questionIndex = 0;
showQuestion(questionIndex);

$(".next").click(function() {
  if ($("input:checked")) {
    answers.push($("input:checked")[0].id);

    if (questionIndex < quizData.length - 1) { 
      questionIndex += 1; 
      showQuestion(questionIndex);
    } else {
      $(".quiz-box").html(answers);
    }
  }
});


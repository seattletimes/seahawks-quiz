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
      compareAnswers();
    }
  }
});

var compareAnswers = function() {
  var scores = {};
  for (var index in answers) {
    var answer = answers[index];
    for (var player in playerData) {
      var playerAnswers = playerData[player].answers;
      var match = $.inArray(answer, playerAnswers);
      if (match > -1) {
        var name = playerData[player].name;
        if (!scores[name]) scores[name] = 0;
        scores[name] += 1;
      }
    }
  }
  console.log(scores)
}
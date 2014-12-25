//Use CommonJS style via browserify to load other modules

var $ = require("jquery");
var ich = require("icanhaz");
var quizTemplate = require("./_quizTemplate.html");
var resultTemplate = require("./_resultTemplate.html");

// Set up templates
ich.addTemplate("quizTemplate", quizTemplate);
ich.addTemplate("resultTemplate", resultTemplate);

var showQuestion = function(index) {
  $(".index").html((index + 1) + " of " + quizData.length);
  $(".question-box").html(ich.quizTemplate(quizData[index]));
};

var calculateResult = function() {
  // compare user answers with player answers
  var scores = {};
/*
Three reasons why using for...in for arrays (as opposed to objects) is a bad idea:
  - you're not guaranteed the keys will show up in the right order
  - if someone shims new properties on Array.prototype, they'll show up in your loop
  - it's slower than regular numerical looping
You're better off sticking with either `for (var i = 0; i < arr.length; i++) { ... }` or forEach(). I think the latter is easier to follow, personally.

 --Thomas
*/
  answers.forEach(function(answer) {
    var answer = answers[index];
    playerData.forEach(function(player) {
      var playerAnswers = player.answers;
      //$.inArray just calls indexOf, but in a slower and more annoying way
      var match = playerAnswers.indexOf(answer);
      if (match > -1) {
        var name = playerData[player].name;
        if (!scores[name]) scores[name] = 0;
        scores[name] += 1;
      }
    });
  });
  // find highest match(es)
  var highestScore = 0;
  var highestNames = [];
  for (var player in scores) {
    if (scores[player] >= highestScore) {
      highestNames.push(player);
      highestScore = scores[player];
    }
  }
  // choose randomly from highest matches
  var random = Math.round(Math.random() * (highestNames.length - 1));
  var result = highestNames[random];
  // display result
  $(".quiz-box").html(ich.resultTemplate(playerData[result]));
};

// setup
var answers = [];
var questionIndex = 0;
showQuestion(questionIndex);

// show next button when answer is selected
$(".quiz-box").on("click", "input", (function(){
  $(".next").addClass("active");
  $(".next").attr("disabled", false);
}));

// record answer and move on to next question
$(".next").click(function() {
  if ($("input:checked")) {
    answers.push($("input:checked")[0].id);

    if (questionIndex < quizData.length - 1) {
      questionIndex += 1;
      showQuestion(questionIndex);
      $(".next").removeClass("active");
      $(".next").attr("disabled", true);
      // Change button text on last question
      if (questionIndex == quizData.length - 1) {
        $(".next").html("FINISH");
      }
    } else {
      calculateResult();
    }
  }
});
//Use CommonJS style via browserify to load other modules

var $ = require("jquery");
var ich = require("icanhaz");
var quizTemplate = require("./_quizTemplate.html");
var questionTemplate = require("./_questionTemplate.html");

// Set up templates
ich.addTemplate("quizTemplate", quizTemplate);
ich.addTemplate("questionTemplate", questionTemplate);

var setup = function() {
  answers = [];
  questionIndex = 0;
  $(".quiz-container").html(ich.quizTemplate());
  showQuestion(questionIndex);
  watchInput();
  watchNext();
};

var showQuestion = function(index) {
  $(".index").html((index + 1) + " of " + quizData.length);
  $(".question-box").html(ich.questionTemplate(quizData[index]));
};

var watchInput = function() {
// show next button when answer is selected
  $(".quiz-box").on("click", "input", (function(){
    $(".next").addClass("active");
    $(".next").attr("disabled", false);
  }));
};

var watchNext = function() {
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
    for (var name in playerData) {
      var player = playerData[name];
      var playerAnswers = player.answers;
      //$.inArray just calls indexOf, but in a slower and more annoying way
      var match = playerAnswers.indexOf(answer);
      if (match > -1) {
        if (!scores[name]) scores[name] = 0;
        scores[name] += 1;
      }
    };
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
  var redirect = window.location.href + playerData[result].url + ".html";
  window.location.href = redirect;
};

// setup
var answers;
var questionIndex;
setup();

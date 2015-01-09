//Use CommonJS style via browserify to load other modules

var $ = require("jquery");
var ich = require("icanhaz");
var quizTemplate = require("./_quizTemplate.html");
var questionTemplate = require("./_questionTemplate.html");
var resultTemplate = require("./_resultTemplate.html");

// Set up templates
ich.addTemplate("quizTemplate", quizTemplate);
ich.addTemplate("questionTemplate", questionTemplate);
ich.addTemplate("resultTemplate", resultTemplate);

// Share button
var Share = require("share");
new Share(".share-button", {
  ui: {
    flyout: "bottom left"
  }
});

var setup = function() {
  scores = {};
  id = 1;
  $(".quiz-container").html(ich.quizTemplate());
  showQuestion(questionIndex);
  watchInput();
  watchNext();
};

var showQuestion = function(questionId) {
  $(".index").html(id + " of " + Object.keys(quizData).length);
  $(".question-box").html(ich.questionTemplate(quizData[id]));
};

var watchInput = function() {
// show next button when answer is selected
  $(".quiz-box").on("click", "input", (function(){
    $(".next").addClass("active");
    $(".next").attr("disabled", false);
  }));
};

var watchNext = function() {
  $(".next").click(function() {
    // score answer
    var playerPoints = $("input:checked").val().split(" ");
    playerPoints.forEach(function(point) {
      if (point == "") return;
      if (!scores[point]) { scores[point] = 0 }
        scores[point] += 1;
    });

    // move on to next question
    if (id < Object.keys(quizData).length) {
      id += 1;
      showQuestion(id);
      $(".next").removeClass("active");
      $(".next").attr("disabled", true);
      // Change button text on last question
      if (id == Object.keys(quizData).length) {
        $(".next").html("FINISH");
      }
    } else {
      calculateResult();
    }
  });
};

var calculateResult = function() {
  // find highest match(es)
  var highestScore = 0;
  var highestPlayers = [];
  for (var score in scores) {
    if (scores[score] >= highestScore) {
      highestPlayers.push(score);
      highestScore = scores[score];
    }
  }

  var random = Math.round(Math.random() * (highestPlayers.length - 1));
  var resultId = highestPlayers[random];
  var result;
  playerData.forEach(function(player) {
    if (player.playerid != resultId) return;
    result = player;
  });

  // display result
  $(".quiz-box").html(ich.resultTemplate(result));
};

// setup
var scores;
var questionIndex;
setup();

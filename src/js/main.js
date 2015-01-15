//Use CommonJS style via browserify to load other modules

var $ = require("jquery");
var ich = require("icanhaz");
var questionTemplate = require("./_questionTemplate.html");
var resultTemplate = require("./_resultTemplate.html");

var scores = {};
var questionIndex;
var id = 1;

// Set up templates
ich.addTemplate("questionTemplate", questionTemplate);
ich.addTemplate("resultTemplate", resultTemplate);

var Share = require("share");
new Share(".share-button", {
  ui: {
    flyout: "bottom left"
  }
});

var showQuestion = function(questionId) {
  $(".index").html(id + " of " + Object.keys(window.quizData).length);
  $(".question-box").html(ich.questionTemplate(window.quizData[id]));
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
      if (point === "") return;
      if (!scores[point]) { scores[point] = 0 }
      scores[point] += 1;
    });

    // move on to next question
    if (id < Object.keys(window.quizData).length) {
      id += 1;
      showQuestion(id);
      $(".next").removeClass("active");
      $(".next").attr("disabled", true);
      // Change button text on last question
      if (id == Object.keys(window.quizData).length) {
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
  for (var player in scores) {
    if (scores[player] >= highestScore) {
      highestScore = scores[player];
    }
  }

  //loop again to find ties
  var highestPlayers = [];
  for (var player in scores) {
    if (scores[player] == highestScore) {
      highestPlayers.push(player);
    }
  }

  var random = Math.round(Math.random() * (highestPlayers.length - 1));
  var resultId = highestPlayers[random];
  var result;
  window.playerData.forEach(function(player) {
    if (player.playerid != resultId) return;
    result = player;
  });

  // display result
  $(".quiz-box").html(ich.resultTemplate(result));
  $(".retake").removeClass("hidden");
  $(".quiz-container").addClass("results");
  new Share(".share-button", {
    description: "I got " + result.player + "! Which Seahawk are YOU?",
    image: result.image,
    ui: {
      flyout: "bottom left",
      button_text: "SHARE RESULTS"
    },
    facebook: {
      caption: "I got " + result.player + "! Which Seahawk are YOU?"
    }
  });
  $(".share-button").addClass("share-results");
};

showQuestion(questionIndex);
watchInput();
watchNext();
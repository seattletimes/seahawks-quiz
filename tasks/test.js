module.exports = function(grunt) {
  grunt.registerTask("test", "Does this quiz even make sense?", function() {
   
    var data = grunt.data.json.SeahawksQuiz2015_Answers;
    
    var playerCounts = {};
    var playerPossible = {};
    var playerCorrelations = {};

    data.forEach(function(answer) {
      var players = answer.playerids.split(" ");
      players = players.filter(function(p) {return p != "72" && p != ""});
      var fraction = players.length;
      players.forEach(function(player) {
        if (!playerCounts[player]) { playerCounts[player] = 0 }
        playerCounts[player] += (1 / fraction);

        if (!playerPossible[player]) { playerPossible[player] = 0 }
        playerPossible[player] += 1;

        if (!playerCorrelations[player]) { playerCorrelations[player] = {} }
        players.forEach(function(player2) {
          if (player == player2) { return }
          if (!playerCorrelations[player][player2]) { playerCorrelations[player][player2] = 0 }
          playerCorrelations[player][player2] += 1;
        });
      });
    });

    console.log("playerCounts", playerCounts);
    console.log("playerPossible", playerPossible);
    console.log("playerCorrelations", JSON.stringify(playerCorrelations, null, 2));

  });
};
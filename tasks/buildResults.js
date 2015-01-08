/*

Build static, shareable results pages based on a collection of possible results.

*/

var path = require("path");

module.exports = function(grunt) {

  grunt.registerTask("buildResults", "Build results pages", function() {
    var template = grunt.file.read("src/_result.html");
    var players = grunt.data.json.SeahawksQuiz2015_Players;
    players.forEach(function(player) {
      var output = grunt.template.process(template, { data: player });
      grunt.file.write("build/" + player.url + ".html", output);
    });
  });
}
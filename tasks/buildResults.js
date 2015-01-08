/*

Build static, shareable results pages based on a collection of possible results.

*/

var path = require("path");

module.exports = function(grunt) {

  grunt.registerTask("buildResults", "Build results pages", function() {
    var template = grunt.file.read("src/_result.html");
    console.log(grunt.data.json)
    var answers = grunt.data.json.player_answers;
    for (var name in answers) { 
      var player = answers[name];
      var output = grunt.template.process(template, { data: player });
      grunt.file.write("build/" + player.url + ".html", output);
    }


  });

}
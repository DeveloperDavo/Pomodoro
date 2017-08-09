module.exports = function (grunt) {
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      jasmine: {
        src: ['src/**/*.js'],
        options: {
          specs: ['spec/**/*Spec.js'],
          vendor: [
              'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js',
              'js/jquery.plugin.js',
              'js/jquery.countdown.js'
          ]
        }
      }
    });
  grunt.loadNpmTasks('grunt-contrib-jasmine');
};

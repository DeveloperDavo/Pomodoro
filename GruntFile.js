module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jasmine: {
            src: ['dist/**/*.js'],
            options: {
                specs: ['distSpec/**/*Spec.js'],
                vendor: [
                    'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js'
                ]
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['env']
            },
            dist: {
                files: {
                    'dist/application.js': 'src/application.js',
                    'distSpec/applicationSpec.js': 'spec/applicationSpec.js',
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.registerTask("default", ["babel"]);
};

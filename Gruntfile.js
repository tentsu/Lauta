'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        sass: {
            dev: {
                src: ['web/css/*.scss'],
                dest: 'web/css/*.css',
            },
        },
        concurrent: {
            dev: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    nodeArgs: ['--debug'],
                    env: {
                        PORT: '1337'
                    },
                    // omit this property if you aren't serving HTML files and 
                    // don't want to open a browser tab on start
                    callback: function (nodemon) {
                        nodemon.on('log', function (event) {
                            console.log(event.colour);
                        });

                        // opens browser on initial server start
                        nodemon.on('config:update', function () {
                            // Delay before server listens on port
                            setTimeout(function () {
                                require('open')('http://localhost:1337');
                            }, 1000);
                        });

                        // refreshes browser when server reboots
                        nodemon.on('restart', function () {
                            // Delay before server listens on port
                            setTimeout(function () {
                                require('fs').writeFileSync('.rebooted', 'rebooted');
                            }, 1000);
                        });
                    }
                }
            }
        },
        react: {
            jsx: {
                files: [
                    {
                        expand: true,
                        cwd: 'web/js/components',
                        src: ['**/*.jsx'],
                        dest: 'web/js/build',
                        ext: '.js'
                    }
                ]
            }
        },
        watch: {
            server: {
                files: ['.rebooted'],
                options: {
                    livereload: true
                }
            },
            sass: {
                files: ['web/css/*.scss'],
                tasks: ['sass']
            },
            react: {
                files: 'web/js/components/**/*.jsx',
                tasks: ['react']
            },
            livereload: {
                options: {
                    livereload: true,
                },
                files: ['web/**/*'],
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-react');

    grunt.registerTask('default', ['watch']);
};
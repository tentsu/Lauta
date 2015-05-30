module.exports = function (grunt) {
    grunt.initConfig({
        watch: {
            css: {
                files: 'web/css/*.scss',
                tasks: ['sass']
            }
        },
        sass: {
            dev: {
                files: {
                    'web/css/base.css': 'web/css/base.scss'
                }
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'web/*.html',
                        'web/css/*.css',
                        'web/js/*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: "./web"
                }
            }
        }
        // react: {
        //     dynamic_mappings: {
        //         files: [
        //             {
        //                 expand: true,
        //                 cwd: 'web/js/components',
        //                 src: ['**/*.js'],
        //                 dest: 'web/js/build',
        //                 ext: '.js'
        //             }
        //         ]
        //     }
        // }
    });
    
    grunt.loadNpmTasks ('grunt-contrib-sass');
    grunt.loadNpmTasks ('grunt-contrib-watch');
    // grunt.loadNpmTasks ('grunt-react');
    grunt.loadNpmTasks ('grunt-browser-sync');

    grunt.registerTask ('default', ['browser-sync', 'watch']);
};
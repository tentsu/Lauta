module.exports = function (grunt) {
    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'web/css/base.css': 'web/css/base.scss'
                }
            }
        },
        watch: {
            css: {
                files: ['web/css/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                },
            },
        },
    });
    
    grunt.loadNpmTasks ('grunt-contrib-watch')
    grunt.loadNpmTasks ('grunt-contrib-sass')

    grunt.registerTask ('default', ['watch', 'sass'])
};
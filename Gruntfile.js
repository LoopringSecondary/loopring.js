module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },

        browserify: {
            options: {
                // transform: [require("ethereumjs-util")]
            },
            dev: {
                options: {
                    // Add source maps
                    browserifyOptions: {
                        debug: true
                    }
                },
                src: ['src/**/*.js'],
                dest: 'build/loopring.js'
            },

            dist: {
                options: {
                    browserifyOptions: {
                        debug: false
                    }
                },
                src: '<%= browserify.dev.src %>',
                dest: '<%= browserify.dev.dest %>',
            }
        },

        uglify: {
            options: {
                mangle: false,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            my_target: {
                files: {
                    'build/loopring.min.js': ['build/loopring.js']
                }
            }
        },

        watch: {
            files: ['gruntfile.js', 'src/**/*.js'],
            tasks: ['browserify:dev']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browserify');

    // Default task(s).
    grunt.registerTask('default', ['browserify:dev', 'watch']);
    grunt.registerTask('dist', ['browserify:dist', 'uglify']);

};
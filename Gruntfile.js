'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'
// templateFramework: 'lodash'

module.exports = function (grunt) {

    // show elapsed time at the end
    require('time-grunt')(grunt);

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // configurable paths
    var buildConfig = {
        app: 'app',
        dist: 'dist'
    };

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.initConfig({

        buildConfig: buildConfig,

        watch: {
            compass: {
                files: '<%= buildConfig.app %>/styles/sass/**/*.scss',
                tasks: ['compass:dev']
            }
        },

        uglify: {
          options: {
            compress : true
          },
          files : {
            src: '<%= buildConfig.app %>/scripts/build.js',
            dest: '<%= buildConfig.dist %>/scripts/prod.js'
          }
        },

        browserify: {
            dev: {
                    options: {
                        transform: [
                            [
                                'babelify',
                                {
                                    presets: [
                                        'es2015', 'react'
                                    ]
                                }
                            ]
                        ],
                        watch : true, // use watchify for incremental builds!
                        // keepAlive : true, // watchify will exit unless task is kept alive
                        browserifyOptions : {
                            debug : true // source mapping
                        }
                    },
                    src: ['<%= buildConfig.app %>/scripts/global.js'],
                    dest: '<%= buildConfig.app %>/local/build.js'
                },
            dist: {
                    options: {
                        transform: [
                            [
                                'babelify',
                                {
                                    presets: [
                                        'es2015', 'react'
                                    ]
                                }
                            ]
                        ],
                    },
                    src: ['<%= buildConfig.app %>/scripts/global.js'],
                    dest: '<%= buildConfig.dist %>/scripts/prod.js'
            }
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= buildConfig.app %>',
                    dest: '<%= buildConfig.dist %>',
                    src: [
                        '*.{ico,txt}',
                        '.htaccess',
                        'images/{,*/}*.{webp,gif,png,jpg}',
                        'styles/fonts/{,*/}*.*',
                        '*.html',
                        '*.json'
                    ]
                }]
            }
        },

        rev: {
            dist: {
                files: {
                    src: [
                        '<%= buildConfig.dist %>/scripts/{,*/}*.js',
                        '<%= buildConfig.dist %>/styles/{,*/}*.css',
                        '<%= buildConfig.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                        '/styles/fonts/{,*/}*.*',
                    ]
                }
            }
        },

        browserSync: {
            bsFiles: {
                src : [
                    'app/**/*',
                    'app/scripts/**/*.js'
                ],
                tasks: [
                    'compass:dev',
                    'browserify:dev'
                ]
            },
            options: {
                watchTask : true,
                server: {
                    baseDir: "./app"
                }
            }
        },

        compass: {
            dist: {
                options: {
                    javascriptsDir: '<%= buildConfig.dist %>/scripts/{,*/}*.*',
                    sassDir: '<%= buildConfig.app %>/styles/sass',
                    imageDir: '<%= buildConfig.dist %>/images',
                    cssDir: '<%= buildConfig.dist %>/styles/',
                    outputStyle: 'compressed',
                    fontsDir: '<%= buildConfig.dist %>/fonts/',
                    // relativeAssets: true,
                    noLineComments: true,
                }
            },
            dev: {
                options: {
                    sassDir: '<%= buildConfig.app %>/styles/sass',
                    imagesDir: '<%= buildConfig.app %>/images',
                    cssDir: '<%= buildConfig.app %>/styles/css',
                    fontsDir: '<%= buildConfig.app %>/fonts'
                }
            }
        }

    });

    // Build Dist Task
    grunt.registerTask('build', [
        'compass:dist',
        'uglify',
        'browserify:dist',
        'copy',
        'rev'
    ]);

    // Default Build App Task
    grunt.registerTask('default', [
        'browserSync',
        'browserify:dev',
        'watch'
    ]);

};
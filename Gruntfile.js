// Generated on 2013-11-21 using generator-angular 0.4.0
'use strict';
var mountFolder = function (connect, dir) {
    return connect.static(require('path')
        .resolve(dir));
};

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    // configurable paths
    var yeomanConfig = {
        app: 'dev',
        dist: 'public'
    };

    try {
        yeomanConfig.app = require('./bower.json')
            .appPath || yeomanConfig.app;
    } catch (e) {}

    grunt.initConfig({
        yeoman: yeomanConfig,
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            coffee: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.coffee'],
                tasks: ['coffee:dist']
            },
            coffeeTest: {
                files: ['test/spec/{,*/}*.coffee'],
                tasks: ['coffee:test']
            },
            compass: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass:server', 'autoprefixer'],
                options: {
                    livereload: true,
                }
            },
            test: {
                files: ['test/**/*.*'],
                tasks: ['test']
            },
            html: {
                files: ['<%= yeoman.app %>/views/**']
            },
            js: {
                files: ['<%= yeoman.app %>/scripts/**'],
                tasks: ['jshint'],
            },
            files: [
                '<%= yeoman.app %>/{,*/}*.html',
                '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
                '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
            ],
            options: {
                livereload: true,
            },
        },
        autoprefixer: {
            options: ['last 1 version'],
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/css/',
                    src: '{,*/}*.css',
                    dest: '<%= yeoman.app %>/css/'
                }]
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*',
                        '<%= yeoman.app %>/css'
                    ]
                }]
            },
            server: ['.tmp', '<%= yeoman.app %>/css', '<%= yeoman.app %>/img']
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js'
            ]
        },
        coffee: {
            options: {
                sourceMap: true,
                sourceRoot: ''
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/scripts',
                    src: '{,*/}*.coffee',
                    dest: '.tmp/scripts',
                    ext: '.js'
                }]
            },
            test: {
                files: [{
                    expand: true,
                    cwd: 'test/spec',
                    src: '{,*/}*.coffee',
                    dest: '.tmp/spec',
                    ext: '.js'
                }]
            }
        },
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles',
                cssDir: '<%= yeoman.app %>/css',
                generatedImagesDir: '<%= yeoman.app %>/img/generated',
                imagesDir: '<%= yeoman.app %>/images',
                javascriptsDir: '<%= yeoman.app %>/scripts',
                fontsDir: '<%= yeoman.app %>/styles/fonts',
                importPath: '<%= yeoman.app %>/bower_components',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false
            },
            dist: {},
            server: {
                options: {
                    debugInfo: false
                }
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%= yeoman.dist %>/css/fonts/*'
                    ]
                }
            }
        },
        useminPrepare: {
            html: '<%= yeoman.app %>/app.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/css/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: '<%= yeoman.app %>/css',
                src: ['*.css'],
                dest: '<%= yeoman.dist %>/css/'
            }
        },
        htmlmin: {
            dist: {
                options: {},
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: ['*.html', 'views/*.html'],
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'views/**/*',
                        'images/{,*/}*.{gif,webp}',
                        'styles/fonts/*'
                    ]
                }, {
                    expand: true,
                    cwd: '<%= yeoman.app %>/img',
                    dest: '<%= yeoman.dist %>/images',
                    src: [
                        'generated/*'
                    ]
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '<%= yeoman.app %>/css/',
                src: '{,*/}*.css'
            }
        },
        concurrent: {
            server: {
                tasks: ['coffee:dist', 'compass:server', 'copy:styles', 'watch', 'nodemon'],
                options: {
                    logConcurrentOutput: true
                }
            },
            dist: [
                'coffee',
                'compass:dist',
                'copy:styles',
                'imagemin',
                'svgmin',
                'htmlmin'
            ]
        },
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },
        ngmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>/scripts',
                    src: '*.js',
                    dest: '<%= yeoman.dist %>/scripts'
                }]
            }
        },
        nodemon: {
            dev: {
                options: {
                    file: 'server.js',
                    args: [],
                    ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['app', 'config'],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            },
            exec: {
                options: {
                    exec: 'less'
                }
            }
        },
        mochaTest: {
            options: {
                reporter: 'spec'
            },
            src: ['test/**/*.js']
        },
        env: {
            test: {
                NODE_ENV: 'test'
            }
        }
    });

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'autoprefixer',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'env:test',
        'mochaTest'
    ]);

    grunt.registerTask('lint', [
        'jshint',
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'copy:dist',
        'cdnify',
        'ngmin',
        'cssmin',
        'uglify',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'server'
    ]);
};
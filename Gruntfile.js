module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      html: {
        files: ['src/html/*.html'],
        tasks: 'includeSource'
      },
      less: {
        files: ['src/**/*.less'],
        tasks: 'exec:compile_less'
      },
      includeNewSources: {
        files: ['src/**/*.js'],
        tasks: 'includeSource'
      },
      includeNewSpecs: {
        files: ['spec/**/*.js'],
        tasks: 'includeSource:spec'
      },
      buildTemplates: {
        files: ['src/viewTemplates/**/*.html'],
        tasks: 'jst:compile'
      }
    },
    exec: {
      compile_less: './node_modules/.bin/lessc ./src/less/styles.less ./src/css/styles.css'
    },
    includeSource: {
      app: {
        files: {
          'index.html': 'src/html/index.template.html',
          'game.html': 'src/html/game.template.html'
        }
      },
      spec: {
        files: {
          'SpecRunner.html': 'src/html/SpecRunner.template.html'
        }
      }
    },

    jst: {
      compile: {
        files: {
          "templates.js": ["src/viewTemplates/**/*.html"]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-include-source');
//  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.registerTask('default', ['includeSource', 'jst:compile', 'watch']);
};

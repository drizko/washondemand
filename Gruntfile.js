module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      dist: {
        src: [
          'washondemand/www/app/config.js',
          'washondemand/www/app/services/services.js',
          'washondemand/www/app/auth/customerAuth/signin.controller.js',
          'washondemand/www/app/auth/customerAuth/signup.controller.js',
          'washondemand/www/app/auth/providerAuth/signin.controller.js',
          'washondemand/www/app/auth/providerAuth/signup.controller.js',
          'washondemand/www/app/auth/authFactory.js',
          'washondemand/www/app/auth/authMaster.js',
          'washondemand/www/app/mainViews/customerView/customer.controller.js',
          'washondemand/www/app/mainViews/providerView/provider.controller.js',
          'washondemand/www/app/mainViews/mainViews.factory.js',
          'washondemand/www/app/washHistory/custHistory/custWashHistory.controller.js',
          'washondemand/www/app/washHistory/custHistory/custHistoryEntry.directive.js',
          'washondemand/www/app/washHistory/provHistory/provWashHistory.controller.js',
          'washondemand/www/app/washHistory/provHistory/provHistoryEntry.directive.js',
          'washondemand/www/app/washHistory/washHistory.factory.js',
          'washondemand/www/app/washHistory/washHistoryMaster.js',
          'washondemand/www/app/washHistory/historyDirectives/expandHistoryEntry.directive.js',
          'washondemand/www/app/currentWashViews/currentWashViews.factory.js',
          'washondemand/www/app/currentWashViews/providerWashView/providerWashView.controller.js',
          'washondemand/www/app/currentWashViews/customerRequestView/customerRequestView.controller.js',
          'washondemand/www/app/home/home.controller.js',
          'washondemand/www/app/nav/nav.controller.js',
          'washondemand/www/app/routes.js',
          'washondemand/www/app/app.js'
        ],
        dest: 'washondemand/www/built.js',
      },
    },

    removelogging: {
      dist: {
        src: 'washondemand/www/built.js',
        dest: 'washondemand/www/wod.min.clean.js',
        options: {}
      }
    },

    uglify: {
      my_target: {
        files: {
          'washondemand/www/wod.min.clean.ugly.js': ['washondemand/www/wod.min.clean.js']
        }
      }
    },

    clean: ['washondemand/www/built.js', 'washondemand/www/wod.min.clean.js'],

    watch: {
      scripts: {
        files: ['**/*.js'],
        tasks: ['uglify'],
        options: {
          spawn: true
        },
      },
    },


  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-remove-logging');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('build', ['concat', 'removelogging', 'uglify', 'clean']);

  // grunt.registerTask('default', ['jshint']);

};

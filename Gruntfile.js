module.exports = function(grunt) {

  grunt.initConfig({
    uglify: {
      my_target: {
        files: {
          'washondemand/www/wod.min.js': [
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
            'washondemand/www/app/app.js',
          ]
        }
      }
    },

    watch: {
      scripts: {
        files: ['**/*.js'],
        tasks: ['uglify'],
        options: {
          spawn: true,
        },
      },
    },

    removelogging: {
      dist: {
        src: 'washondemand/www/wod.min.js',
        dest: 'washondemand/www/wod.min.clean.js',
        options: {}
      }
    }

  });

  grunt.loadNpmTasks('grunt-remove-logging');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('build', ['uglify', 'removelogging']);

  // grunt.registerTask('default', ['jshint']);

};

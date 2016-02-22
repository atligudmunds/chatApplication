module.exports = function ( grunt ) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  var taskConfig = {
    jshint: {
    	options: {
    		jshintrc: '.jshintrc'
  		},
      	all: ['Gruntfile.js' , 'src/**/*.js']
    },
    watch: {
          files: ['src/**/*.js'],
          tasks: ['jshint']
      },
  };

  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.registerTask('default', ['watch']);

  grunt.initConfig ( taskConfig );

};
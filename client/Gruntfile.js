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
    uglify: {
    	src: [],
    	dest: ''
    }
  };

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  grunt.registerTask('default', ['watch']);

  grunt.initConfig ( taskConfig );

};
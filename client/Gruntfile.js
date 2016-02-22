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
    concat: {
    	options: {
      		separator: ';',
   		},
    	js: {
    		src: ['src/**/*.js', 'HeaderController.js', 'app.js', 'HomeController.js'],
    		dest: 'build/app.js',
    	},

    },
    uglify: {
    	js: {
    		// take concatenated file and minify to itself
    		src: ['build/app.js'],
    		dest: 'build/app.js'
    	}
    }
  };

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  grunt.registerTask('default', ['watch']);
  //grunt.registerTask('default', ['watch']);


  grunt.initConfig ( taskConfig );

};
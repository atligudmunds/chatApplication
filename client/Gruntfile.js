module.exports = function ( grunt ) {
	grunt.loadNpmTasks('grunt-contrib-jshint');
	var taskConfig = {
		jshint: {
			all: ['Gruntfile.js' , 'src/**/*.js']
		},
		watch: {
        	files: ['Gruntfile.js', 'src/**/*.js'],
        	tasks: ['jshint']
    }
	};

	grunt.loadNpmTasks('grunt-contrib-watch');
	//grunt.registerTask('default', ['jshint']);
	//grunt.registerTask('default', ['watch']);


	grunt.initConfig ( taskConfig );

};

module.exports = function ( grunt ) {
	grunt.loadNpmTasks('grunt-contrib-jshint');
	var taskConfig = {
		jshint: {
			//src: ['**/*.js'],
			//gruntfile: ['Gruntfile.js'],
			//options: {
			//}
			all: ['Gruntfile.js' , 'src/**/*.js']
		}
	};
	grunt.initConfig ( taskConfig );
};

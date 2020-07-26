//Variables
const gulp = require('gulp'),
zip = require('gulp-zip')

//File Paths
const buildFiles = ['build']


// Compile built files into a zip file to upload as a plugin
function build() {
	sassy();

	buildFiles.forEach(file => {
		gulp.src(`${file}/*`)
	.pipe(gulp.dest(`./dist/${file}`))
	})

	// gulp.src('./index.php')
	// 	.pipe(gulp.dest('./dist/'))

	return gulp.src('./dist/**')
		.pipe(zip('aimhigher.zip'))
		.pipe(gulp.dest('.'))
}

exports.build = build
require('dotenv').config()

//Variables
const gulp = require('gulp'),
sass = require('gulp-sass'),
sourcemaps = require('gulp-sourcemaps'),
prettier = require('gulp-prettier'),
replace = require('gulp-replace'),
browserSync = require('browser-sync').create(),
reload = browserSync.reload,
zip = require('gulp-zip')

//File Paths
const sassFiles = 'src/scss/**/*.scss',
	mainSassFile = 'src/scss/style.scss',
	cssFiles = '.',
	sourceMaps = '/src/maps',
	styleSheet = `<?php echo get_template_directory_uri(); ?>/style.css`,
	currentDate = Date.now(),
	buildFiles = {
		folders: ['functions', 'layouts', 'src/fonts', 'src/img', 'src/js'],
		files: ['footer.php', 'functions.php', 'header.php', 'index.php', 'single.php']
	},
	buildFolder = './_dist/'

//Compile main sass into css
function sassy() {
	return gulp
		.src(mainSassFile)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError)) //Using gulp-sass
		.pipe(sourcemaps.write(sourceMaps))
		.pipe(gulp.dest(cssFiles))
}

//Watch for changes in sass files and running sass compile

function watch() {
	browserSync.init({
		port: process.env.PORT || 3000,
		proxy: process.env.WP_URL,
		open: false
	})

	gulp.watch(sassFiles, sassy)
	gulp.watch([
		'./*.php',
		'./layouts/**/*.php',
		'./partials/**/*.php',
		'./woocommerce/**/*.php',
		'./src/scss/**/*.scss',
	]).on('change', reload)
}

function styleVersion() {
	const thisVersion = styleSheet + '?v=' + currentDate

	return gulp
		.src(`${buildFolder}header.php`)
		.pipe(replace(styleSheet, thisVersion))
		.pipe(gulp.dest(buildFolder))
}

async function build() {
	await sassy();

	console.log('Compiled Sass')

	await buildFiles.folders.forEach(file => {
		gulp.src(`${file}/*`)
			.pipe(gulp.dest(`${buildFolder}${file}`))
		console.log(`Copied ${file}/`)
	})

	await buildFiles.files.forEach(file => {
		gulp.src(`./${file}`)
			.pipe(gulp.dest(buildFolder))
		console.log(`Copied ${file}`)
	})

	setTimeout(() => {
		styleVersion();
		console.log(`Added version to css file`)
	}, 2000)

	setTimeout(() => {
		return gulp.src(`${buildFolder}**`)
		.pipe(zip(`${process.env.THEME_NAME}.zip`))
		.pipe(gulp.dest('.'))
	}, 4000)

	

	// if(gulp.src(`${buildFolder}**`).length) {
	// 	console.log('folder is there')
	// 	return gulp.src(`${buildFolder}**`)
	// 	.pipe(zip(`${process.env.THEME_NAME}.zip`))
	// 	.pipe(gulp.dest('.'))
	// }
	// else {
	// 	console.log('folder not there yet')
	// }

	
}

exports.sassy = sassy
exports.watch = watch
exports.styleVersion = styleVersion
exports.build = build

const { src, dest, series, watch } = require('gulp');
const gulpif = require('gulp-if');
const browserSync = require('browser-sync');
const del = require('del');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const webp = require('gulp-webp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const svgSprite = require('gulp-svg-sprite');
const notify = require('gulp-notify');
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');
const ttfToWoff = require("gulp-ttf-to-woff");
const ttf2woff2 = require('gulp-ttf2woff2');

let env = process.env.NODE_ENV || 'dev';

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist',
    },
    open: false,
  })
}

const cleanDist = () => {
  return del(['dist/**', '!dist']);
}

const htmlMinify = () => {
  return src('src/**/*.html')
    .pipe(gulpif(env === 'prod',
      htmlMin({
        collapseWhitespace: true,
      })
    ))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const convertImgs = () => {
  return src([
    'src/**/*.jpg',
    'src/**/*.png',
  ])
    .pipe(webp())
    .pipe(dest('dist'))
}


const copyImgs = () => {
  return src('src/**/*.svg')
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const copyIcons = () => {
  return src('.src/images/icons/*.*')
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const convertFontsToWoff = () => {
  return src('src/**/*.ttf')
    .pipe(ttfToWoff())
    .pipe(dest('dist'))
}

const convertFontsToWoff2 = () => {
  return src('src/**/*.ttf')
    .pipe(ttf2woff2())
    .pipe(dest('dist'))
}

const makeSpriteSvg = () => {
  return src('src/images/icons/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: 'sprite.svg',
        }
      }
    }))
    .pipe(dest('src/images/'))
}

const styles = () => {
  return src('src/styles/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(concat('styles.min.css'))
    .pipe(autoprefixer({
      cascade: false,
    })).on('error', sass.logError)
    .pipe(gulpif(env !== 'prod',
      sourcemaps.write('.')
    ))
    .pipe(gulpif(env === 'prod',
      cleanCss()
    ))
    .pipe(dest('dist/styles'))
    .pipe(browserSync.stream())
}

const scripts = () => {
  return src(['src/js/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env'],
    }))
    .pipe(concat('script.js'))
    .pipe(uglify().on('error', notify.onError()))
    .pipe(gulpif(env !== 'prod',
      sourcemaps.write('.')
    ))
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream())
}

watch('src/**/*.html', htmlMinify);
watch('src/styles/**/*.scss', styles);
watch('src/js/**/*.js', scripts);
watch('src/image/icons/*.*', copyIcons);

exports.htmlMinify = htmlMinify;
exports.sprite = makeSpriteSvg;

exports.default = series(cleanDist, copyImgs, copyIcons, convertImgs, convertFontsToWoff, convertFontsToWoff2, htmlMinify, styles, scripts, watchFiles);

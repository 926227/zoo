const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const flatten = require('gulp-flatten');

// Static server
function server() {
    browserSync.init({
        server: {
            baseDir: "src",
            index: "./index.html",
            // routes: {
            //     "/pages/landing": "/pages/langing"
            // }
        },
        notify: false,
        online: true,
    });
}

function styles() {
    return src("src/scss/style.scss")
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(flatten())
        // .pipe(autoprefixer({
        //     overrideBrowserslist: ['last 2 versions'],
        //     grid: true,
        //     cascade: false
        // }))
        // .pipe(dest(function (file) {
        //     /* направляе результат на верхний уровень своей страницы */
        //     const baseDir = 'pages';
        //     const regexp = new RegExp(`${baseDir}(\\\\)(\\w+)`);
        //     let subdir = file.history[0].match(regexp);
        //     return file.base + "\\" + subdir[2];
        // }))
        .pipe(dest("./src/"))
        .pipe(browserSync.stream());
}

function startWatch() {
    watch("./src/**/*.scss", parallel("styles"));
    watch("./src/**/*.html").on("change", browserSync.reload);
    watch("./src/**/*.js").on("change", browserSync.reload);
}

//сжатие картинок
// function images () {
//     return src ("/images/")
//         .pipe(newer("/dest/")) //чтобы оптимизировать изображения, которые еще не были добавлены в /dest/
//         .pipe(imagemin())
//         .pipe(dest("/dest/"));

// Удаляет содержимое папки назначания. Нужно делать перед каждой перезаписью.
function cleanDest() {
    return del('./public/**/*', { force: true });
}

//Построение финальной сборки в каталоге public
function buildPublic() {
    return src(['src/*.html', 'src/*.css', 'src/js/*', 'src/assets/**/*', 'src/zoos/*'], { base: 'src' })
        .pipe(dest('public'));
}

function test() {
    console.dir(src("./src/pages/**/scss/stylee.scss"));
}

exports.server = server;
exports.styles = styles;
exports.startWatch = startWatch;
exports.cleanDest = cleanDest;
exports.test = test;
exports.build = series(cleanDest, styles, buildPublic); //Последовательно все собираем.
exports.default = parallel(server, styles, startWatch);



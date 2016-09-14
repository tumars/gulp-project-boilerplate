var gulp = require('gulp');

var watch = require('gulp-watch'), 
    browserSync = require('browser-sync'), 
    less = require('gulp-less'), 
    autoprefixer = require('gulp-autoprefixer'), 
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'),
    spritesmith = require('gulp.spritesmith'),
    merge = require('merge-stream'),
    concat = require('gulp-concat'), 
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    minifyHTML = require('gulp-minify-html'),
    usemin = require('gulp-usemin'),
    imagemin = require('gulp-imagemin').
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    path = require('path'); 


/*-------------------------------------------------------------------
    目录结构路径
-------------------------------------------------------------------*/
var rootPath = {
    src: './project/src',
    dist: './project/dist'
}
var srcPath = {
    js: rootPath.src + '/js',
    lib: rootPath.src + '/js/lib',
    images: rootPath.src + '/images',
    slice: rootPath.src + '/slice',
    sprite: rootPath.src + '/sprite',
    css: rootPath.src + '/css',
    fonts: rootPath.src + '/fonts'
}
var distPath = {
    js: rootPath.dist + '/js',
    lib: rootPath.dist + '/js/lib',
    images: rootPath.dist + '/images',
    sprite: rootPath.dist + '/sprite',
    css: rootPath.dist + '/css',
    fonts: rootPath.dist + '/fonts'
}
var watchfile = {
    js: srcPath.js + '/*.js',
    lib: srcPath.js + "/lib/*.js",
    images: srcPath.images + '/*',
    slice: srcPath.slice + '/*',
    less: srcPath.css + '/*.less',
    fonts: [srcPath.fonts + '/*', srcPath.fonts + '/**/*'],
    html: rootPath.src + '/*.html',
}
var watchArr = []



/*-------------------------------------------------------------------
  DEV TASKS 配置
-------------------------------------------------------------------*/

//打开浏览器
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: rootPath.src
        }
    })
})


//合并 lib 
gulp.task('mergelib', function() {
    gulp.src(watchfile.lib)
        .pipe(concat('lib.js'))
        .pipe(gulp.dest(srcPath.lib))
        .pipe(gulp.dest(distPath.lib))
        .pipe(browserSync.reload({
            stream: true
        }))
        .pipe(notify({
            message: 'mergelib task ok'
        }));
});


//编译优化 less 文件
gulp.task('less', function() {
    gulp.src(watchfile.less)
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(cssnano())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(srcPath.css))
        .pipe(browserSync.reload({
            stream: true
        }))
        .pipe(notify({
            message: 'less task ok'
        }));
});


// 合并精灵图片
gulp.task('sprite', function () {
  var spriteData = gulp.src(watchfile.slice).pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.less',
    imgPath:'../sprite/sprite.png',
    cssTemplate: 'less.sprite.template.mustache'
  }));

  var imgStream = spriteData.img
    .pipe(gulp.dest(srcPath.sprite));

  var cssStream = spriteData.css
    .pipe(gulp.dest(srcPath.css));

  return merge(imgStream, cssStream);
});


//合并 html 里 build 标签内 css、js, 并输出到 dist
//延迟8秒，保证所需文件都已生成
gulp.task('usemin', function () {
    setTimeout(function() {
        return gulp.src(watchfile.html)
            .pipe(usemin({
                css: [ rev ],
                html: [ function () {return minifyHTML({ empty: true });} ],
                js: [ uglify, rev ]
            }))
            .pipe(gulp.dest(rootPath.dist))
            .pipe(notify({
                message: 'usemin task ok'
            }));
    }, 8000)
});


//将图片压缩并输出到 dist
gulp.task('transferimg', function () {
    return gulp.src(watchfile.images)
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest(distPath.images))
});


//将 font 文件夹输出至 dist
gulp.task('transferfont', function () {
    return gulp.src(watchfile.fonts)
        .pipe(gulp.dest(distPath.fonts))
});


//执行打包
gulp.task('build', ['less', 'mergelib', 'transferfont', 'transferimg', 'usemin' ])


//监听文件变动
gulp.task('watch', ['mergelib', 'sprite', 'browserSync'], function() {
    gulp.watch(watchfile.less, ['less']);
    gulp.watch(watchfile.lib, ['mergelib']);
    gulp.watch(watchfile.sprite, ['sprite']);
})

var gulp = require('gulp'),
    del = require('del');;

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
    imagemin = require('gulp-imagemin'),
    tmodjs = require('gulp-tmod'),
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
    libuild: rootPath.src + '/js/lib/build',
    images: rootPath.src + '/images',
    slice: rootPath.src + '/slice',
    sprite: rootPath.src + '/sprite',
    css: rootPath.src + '/css',
    fonts: rootPath.src + '/fonts',
    tpl: rootPath.src + '/tpl',
    tplbuild: rootPath.src + '/tpl/build'
}
var distPath = {
    js: rootPath.dist + '/js',
    lib: rootPath.dist + '/js/lib',
    libuild: rootPath.dist + '/js/lib/build',
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
    tpl: srcPath.tpl + '/**/*.html',
    html: rootPath.src + '/*.html'
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

//  删除 dist 文件夹
gulp.task('cleanDist', function () {
   var stream = del([rootPath.dist + '/**/*'])
   return stream;
});


//合并 lib
gulp.task('mergeLib', function() {
    gulp.src(watchfile.lib)
        .pipe(concat('lib.js'))
        .pipe(gulp.dest(srcPath.libuild))
        .pipe(browserSync.reload({
            stream: true
        }))
        .pipe(notify({
            message: 'mergeLib task ok'
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

  return merge(imgStream, cssStream)
        .pipe(notify({
            message: 'sprite task ok'
        }));
});


//编译合并模板文件并输出 template.js
gulp.task('tpl', function(){
    var stream = gulp.src(watchfile.tpl)
            .pipe(tmodjs({
                templateBase: srcPath.tpl
            }))
            .pipe(gulp.dest(srcPath.tplbuild))
            .pipe(notify({
                message: 'tpl task ok'
            }));
    return stream;
});



/*-------------------------------------------------------------------
  打包与监听 
-------------------------------------------------------------------*/

//执行打包
gulp.task('build', ['cleanDist'], function() {
    //转移字体
    var transferFont = gulp.src(watchfile.fonts)
                    .pipe(gulp.dest(distPath.fonts));

    //转移雪碧图
    var transSprite = gulp.src(srcPath.sprite + '/**/*.*')
                .pipe(gulp.dest(distPath.sprite));

    //转移 lib.js
    var transLib = gulp.src(srcPath.libuild + '/lib.js')
                .pipe(gulp.dest(distPath.libuild));

    //压缩并转移图片
    var transferImg = gulp.src(watchfile.images)
                .pipe(imagemin({
                    progressive: true
                }))
                .pipe(gulp.dest(distPath.images));  

    // 合并 html 里 build 标签内 css、js，压缩 html，并输出到 dist        
    var useminHtml = gulp.src(watchfile.html)
            .pipe(usemin({
                css: [ rev ],
                html: [ function () {return minifyHTML({ empty: true });} ],
                js: [ uglify, rev ]
            }))
            .pipe(gulp.dest(rootPath.dist))

    return merge(transferFont, transSprite, transLib, transferImg, useminHtml)
        .pipe(notify({
            message: 'build task ok'
        }));

})


//监听文件变动
gulp.task('watch', ['mergeLib', 'tpl', 'sprite', 'browserSync'], function() {
    gulp.watch(watchfile.less, ['less']);
    gulp.watch(watchfile.lib, ['mergeLib']);
    gulp.watch(watchfile.tpl, ['tpl']);
    gulp.watch(watchfile.sprite, ['sprite']);
})

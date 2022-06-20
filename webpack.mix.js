let mix = require('laravel-mix');

mix.js('src/js/carousel.js', 'dist/js')
    .sass('src/sass/carousel.scss', 'dist/css/carousel.css')
    .disableNotifications();
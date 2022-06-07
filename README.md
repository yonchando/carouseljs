## About Carousel
Carousel is the simple slider responsive.

## Installation

This carousel.js is required [jquery](https://jquery.com "jquery.com") package.<br>

> npm i @yonchando/carouseljs

## Usage Example

> HTML add style and css

You need to import css/js to your project file.

> Noted import jquery before carousel.js

```html

<html>
<head>
    <-- add carouseljs style -->
    <link rel="stylesheet" href="node_modules/@yonchando/carouseljs/dist/css/carousel.js">
</head>
<body>
<div class="carousel">
    <div>Your Items</div>
    <div>Your Items</div>
    <div>Your Items</div>
    ...
</div>

<-- add carouseljs js -->
<script src="node_modules/@yonchando/carouseljs/dist/css/carousel.js"></script>

<-- usage -->
<script>
    $('.carousel').carousel({
        items: 4,
    });
</script>
</body>
</html>
```

> Webpack

Import style to your scss file.

```scss
@import "node_modules/@yonchando/carouseljs";
```

Import js to your js file.

```javascript
require('@yonchando/carouseljs');
```

## Configs

| Config                | Description                                                                        | Default | Type   | Example                                                            |
|:----------------------|:-----------------------------------------------------------------------------------|:--------|--------|:-------------------------------------------------------------------|
| items                 | Show items to visible on screen                                                    | 4       | Number |                                                                    |
| slideBy               | Slide item by click on botton control left/right                                   | 1       | Number |                                                                    |
| carouselContentClass  | Add your custom class to contents                                                  |         | String |                                                                    |
| controlClass          | Add your custom class to control button                                            |         | String |                                                                    |
| btnClass              | Add your custom class to button control left and right                             |         | String |                                                                    |
| btnIcon               | Custom icons to button control left and right                                      |         | Array  | `['<i class= "btn-left"></i>','<i class="btn-right"></i>']`        |
| responsive            | Custom Responsive items show and slide by. Example `{breakpoint: {items,slideBy}}` |         | object | `{ 0: { items:1 }, 768: {items: 2}, 1280: {items: 4,slideBy: 4} }` |


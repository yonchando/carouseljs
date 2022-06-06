## About Carousel
Carousel slide with button left/right side and button dot. easy to use.

## Installation
This carousel.js is required [jquery](https://jquery.com "jquery.com") package.<br>

> npm i @yonchando/carousel-js

## Usage
> Html

```html
<html>

    <body>
        <div class="carousel">
            <div>Your Items</div>   
            <div>Your Items</div>   
            <div>Your Items</div>   
            ...
        </div>
        <script >
    </body>
</html>
```

> javascript
```javascript
$('.carousel').carousel(configs);
```

## Configs
| Config      | Description | Default     |
| :---        |    :---   |          :--- |
| items | Show items to visible on screen | 4
| slideBy | Slide item by click on botton control left/right| 1

const carousel = function (options = {}) {
    return $.each(this, (i, el) => {
        const $this = $(el);
        const carouselContents = $(`<div class="carousel-contents ${options.carouselContentClass ?? ''}" style="position:relative;"></div>`);

        // wrap children to div
        carouselContents.append($this.children());
        $this.append(carouselContents);
        const carouselItem = carouselContents.children();

        /*
        * Control
        * */
        const controlClass = options.controllClass ?? '';
        const btnClass = options.btnClass ?? '';
        const control = $(`<div class="control ${controlClass}"></div>`);
        const btnControlLeft = $(`<button class="control-left btn btn-rounded w-[50px] h-[50px] rounded-full btn-default ${btnClass}">
                <i class="fa fa-arrow-left"></i>
            </button>`);
        const btnControlRight = $(`<button class="control-right btn btn-rounded w-[50px] h-[50px] rounded-full btn-default ${btnClass}">
                <i class="fa fa-arrow-right"></i>
            </button>`);
        control.append(btnControlLeft, btnControlRight);
        $this.append(control);

        // children calculation width
        let items = 1; // items to show in screen
        let slideBy = 1; // slide per item by click control button

        // options breakpoint
        if(!!options.breakpoints){
            const windowWidth = $(window).width();
            $.each(options.breakpoints,(breakpoint,option) =>{
                if(windowWidth >= +breakpoint){
                    items = option.items ?? 4;
                    slideBy = option.slideBy ?? 1;
                }
            })
        }else {
            items = options.items ?? 1; // items to show in screen
            slideBy = options.slideBy ?? 1; // slide per item by click control button
        }

        const width = $this.width();
        const carouselItemWidth = width / items;
        const carouselContentWidths = carouselItemWidth * carouselItem.length;
        let transition = 0;
        const lastItem = carouselContentWidths - (carouselItemWidth * items);

        // set width carousel content & items
        carouselContents.css('width', `${carouselContentWidths}px`);
        carouselItem.css('width', `${carouselItemWidth}px`);


        // event button slide left click
        btnControlLeft.on('click', function () {
            if (transition > 0) {
                transition -= carouselContentWidths - (carouselItemWidth * (carouselItem.length - slideBy));
                if (transition < 0)
                    transition = 0;
                carouselContents.animate({
                    right: `${transition}px`
                }, options ?? 4000);
            }
        });

        // event button slide right click
        btnControlRight.on('click', function () {
            if (transition < lastItem) {
                transition += carouselContentWidths - (carouselItemWidth * (carouselItem.length - slideBy));
                if (transition > lastItem)
                    transition = lastItem;
                carouselContents.animate({
                    right: `${transition}px`
                })
            }
        })
    });
}

module.export = carousel;
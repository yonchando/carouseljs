$.fn.carousel = function (options = {}) {
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
        const controlClass = options.controlClass ?? '';
        const btnClass = options.btnClass ?? '';
        let btnIconRight = '<svg style="width: 1.25rem" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M438.6 278.6l-160 160C272.4 444.9 264.2 448 256 448s-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L338.8 288H32C14.33 288 .0016 273.7 .0016 256S14.33 224 32 224h306.8l-105.4-105.4c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160C451.1 245.9 451.1 266.1 438.6 278.6z"></path></svg>';
        let btnIconLeft = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z"></path></svg>';

        const btnIcon = options.btnIcon ?? null;
        if (btnIcon !== null && typeof btnIcon === "object") {
            btnIconLeft = options.btnIcon[0] ?? btnIconLeft;
            btnIconRight = options.btnIcon[1] ?? btnIconRight;
        }

        const control = $(`<div class="control ${controlClass}"></div>`);
        const btnControlLeft = $(`<button class="control-left ${btnClass}">
                ${btnIconLeft}
            </button>`);
        const btnControlRight = $(`<button class="control-right ${btnClass}">
                ${btnIconRight}
            </button>`);
        control.append(btnControlLeft, btnControlRight);
        $this.append(control);

        // children calculation width
        let items = 1; // items to show in screen
        let slideBy = 1; // slide per item by click control button

        // options breakpoint
        if (!!options.responsive) {
            const windowWidth = $(window).width();
            $.each(options.responsive, (breakpoint, option) => {
                if (windowWidth >= +breakpoint) {
                    items = option.items ?? 4;
                    slideBy = option.slideBy ?? 1;
                }
            })
        } else {
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
                });
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
                });
            }
        })
    });
}
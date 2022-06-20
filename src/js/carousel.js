window.$ = window.jQuery = require('jquery');
(function ($) {

    let transition = 0;

    const ItemResponsive = function (options) {
        let {
            items = 1,
            slideBy = 1,
            sliderWidths,
            carouselItem,
            responsive,
        } = options;

        if (items === 1) {
            responsive = {
                640: {
                    items: 1,
                    slideBy: 1,
                },
                768: {
                    items: 2,
                    slideBy: 1,
                },
                1024: {
                    items: 2,
                    slideBy: 1,
                },
                1280: {
                    items: 4,
                    slideBy: 1,
                },
            };
        }

        // options breakpoint
        if (typeof responsive !== 'undefined' && typeof responsive === 'object') {
            const windowWidth = $(window).width();
            $.each(responsive, (breakpoint, option) => {
                if (windowWidth <= +breakpoint) {
                    items = option.items ?? 1;
                    slideBy = option.slideBy ?? 1;
                    return false;
                }else {
                    items = option.items ?? 1;
                    slideBy = option.slideBy ?? 1;
                }
            });

        }

        const carouselItemWidth = sliderWidths / items;
        const carouselContentWidths = carouselItemWidth * carouselItem.length;
        const lastItem = carouselContentWidths - (carouselItemWidth * items);

        return {
            slideBy: slideBy,
            lastItem: lastItem,
            carouselContentWidths: carouselContentWidths,
            carouselItemWidth: carouselItemWidth
        }
    }

    const ControlButton = function (options) {
        const {
            controlClass = '',
            btnClass = '',
            widthToScroll,
            carouselContents,
            lastItem,
        } = options;
        let btnIconRight = '<svg style="width: 1.25rem" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M438.6 278.6l-160 160C272.4 444.9 264.2 448 256 448s-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L338.8 288H32C14.33 288 .0016 273.7 .0016 256S14.33 224 32 224h306.8l-105.4-105.4c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160C451.1 245.9 451.1 266.1 438.6 278.6z"></path></svg>';
        let btnIconLeft = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z"></path></svg>';

        const {btnIcon} = options;
        if (btnIcon !== null && typeof btnIcon === "object") {
            btnIconLeft = btnIcon[0] ?? btnIconLeft;
            btnIconRight = btnIcon[1] ?? btnIconRight;
        }

        const control = $(`<div class="control ${controlClass}"></div>`);
        const btnControlLeft = $(`<button class="control-left ${btnClass}">
                ${btnIconLeft}
            </button>`);
        const btnControlRight = $(`<button class="control-right ${btnClass}">
                ${btnIconRight}
            </button>`);
        control.append(btnControlLeft, btnControlRight);

        // event button slide left click
        btnControlLeft.on('click', function (e) {
            e.preventDefault();
            if (transition > 0) {
                transition -= widthToScroll;
                if (transition < 0)
                    transition = 0;

                carouselContents.animate({
                    right: `${transition}px`
                });
            }
        });

        // event button slide right click
        btnControlRight.on('click', function (e) {
            e.preventDefault();
            if (transition < lastItem) {
                transition += widthToScroll;

                if (transition > lastItem)
                    transition = lastItem;

                carouselContents.animate({
                    right: `${transition}px`
                });
            }
        });
        return control;
    }

    const DragToScroll = function (element, lastItem) {
        let isDown = false;
        let pageX = 0;
        let scrollLeft = 0;
        let actualWidth = 0;
        let itemVisible = 0;

        const wrapper = $(element);
        const contents = wrapper.children('.carousel-contents');
        const childWidth = contents.width() / contents.children('.carousel-content-item').length;

        wrapper.on('mousedown', function (e) {
            isDown = true;
            $(this).addClass('active');
            pageX = e.originalEvent.pageX - wrapper.offset().left;
            scrollLeft = transition;
            actualWidth = transition;
        });

        wrapper.on('mouseleave mouseup', function () {
            if (!isDown) return;
            if (transition > scrollLeft) {
                const closest = transition - scrollLeft;
                const divider = (actualWidth / itemVisible) / 2;
                if (closest > divider) {
                    transition = actualWidth;
                } else
                    transition = scrollLeft;
            } else {
                const closest = scrollLeft - transition;
                const divider = (actualWidth / itemVisible) / 2;
                if (closest > divider) {
                    transition = actualWidth - (actualWidth / itemVisible);
                } else
                    transition = actualWidth;
            }
            if (lastItem < transition) {
                transition = lastItem;
            }
            if (transition < 0) {
                transition = 0;
            }
            scrollLeft = transition;
            contents.animate({
                'right': `${transition}px`
            });
            isDown = false;
            $(this).removeClass('active');
        });

        wrapper.on('mousemove', function (e) {
            if (!isDown) return;
            e.preventDefault();
            const x = e.originalEvent.pageX - wrapper.offset().left;
            transition = scrollLeft + pageX - x;
            itemVisible = Math.ceil(transition / childWidth);
            actualWidth = itemVisible * childWidth;

            if (lastItem < transition) {
                transition = lastItem;
            }
            if (transition < 0) {
                transition = 0;
            }
            contents.css('right', `${transition}px`);
        });
    }

    $.fn.carousel = function (options) {
        return $.each(this, (i, el) => {
            const {
                items = 1,
                carouselContentClass = '',
                responsive,
                slideBy = 1,
                controlClass = '',
                btnClass = '',
                draggable = true,
            } = options;

            const $this = $(el);
            const sliders = $(`<div class="carousel-slider"></div>`);
            const carouselContents = $(`<div class="carousel-contents ${carouselContentClass}" style="position:relative;"></div>`);
            const carouselItem = $this.children().addClass('carousel-content-item');

            // wrap children to div
            carouselContents.append(carouselItem);
            sliders.append(carouselContents);
            $this.append(sliders);

            // items responsive
            let {
                lastItem,
                carouselContentWidths,
                carouselItemWidth
            } = ItemResponsive({
                items,
                slideBy,
                sliderWidths: sliders.width(),
                carouselItem,
                responsive
            });

            // set width carousel content & items
            carouselContents.css('width', `${carouselContentWidths}px`);
            carouselItem.css('width', `${carouselItemWidth}px`);
            const widthToScroll = carouselContentWidths - (carouselItemWidth * (carouselItem.length - slideBy));

            // control button
            const control = ControlButton({
                controlClass: controlClass,
                btnClass: btnClass,
                widthToScroll,
                lastItem,
                carouselContents
            });
            $this.append(control);

            // draggable
            if (draggable) {
                $this.addClass('draggable');
                DragToScroll(sliders, lastItem);
            }
        });
    }
}(jQuery));


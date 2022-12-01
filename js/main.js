/*--GLOBAL--*/
var GLOBAL = GLOBAL || {};
GLOBAL.widthWindow = GLOBAL.widthWindow || {};
GLOBAL.FORMERROR = GLOBAL.FORMERROR || {};
GLOBAL.FORMERROR.REQUIRED = GLOBAL.FORMERROR.REQUIRED || '';
GLOBAL.FORMERROR.EMAIL = GLOBAL.FORMERROR.EMAIL || '';
GLOBAL.mobile = GLOBAL.mobile || 768;
GLOBAL.tablet = GLOBAL.tablet || 992;
GLOBAL.columnsStartLength = GLOBAL.columnsStartLength || 0;

GLOBAL.parseData = function parseData(data) {
    try {
        data = JSON.parse(data.replace(/'/gim, '"'));
    } catch(e) {
        data = {};
    }
    return data;
};


GLOBAL.owl = GLOBAL.owl || {};
GLOBAL.owl.common = GLOBAL.owl.common || {};
GLOBAL.owl.common.loop = true;
GLOBAL.owl.common.dots = false;
GLOBAL.owl.common.margin = 0;
GLOBAL.owl.common.responsiveClass = true;
GLOBAL.owl.common.autoHeight = true;
GLOBAL.owl.common.mouseDrag = true;
GLOBAL.owl.common.nav = false;
/*--/global--*/

function isMobile() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        return true;
    } else {
        return false;
    }
}

function initDropdown() {
    if (typeof(Dropdown) === 'undefined' || !jQuery.isFunction(Dropdown)) {
        return false;
    }

    var common = {};

    $('.JS-Dropdown').each(function(){
        var local = GLOBAL.parseData(jQuery(this).data('dropdown'));
        new Dropdown(this, jQuery.extend({}, common, local));
    });
}

function initScroll() {
    $('.js-custom-scroll').each(function(){
        var customScroll = this;
        new SimpleBar(customScroll, {
            autoHide: false
        });
    });
}

function initValidate($element) {
    if (typeof($element) == 'undefined') {
        $element = $('.js-form-validate');
    }

    $element.each(function() {
        var $element = jQuery(this),
            validator;

        validator = $element.validate({
            errorClass: 'form-error',
            validClass: 'form-success',
            submitHandler: function(form) {
                if (typeof(ajaxSubmit) == 'function') {
                    ajaxSubmit(form);
                }
            },
        });

        $.validator.messages.required = GLOBAL.FORMERROR.REQUIRED;
        $.validator.messages.email = GLOBAL.FORMERROR.EMAIL;
    });
}

function initMask() {
    $('.js-mask-phone').inputmask({
        mask: '+7 999 999 99 99',
        "tabThrough": true,
        "showMaskOnHover": false,
    });

    $('.js-mask-email').inputmask({
        alias: "email",
        "tabThrough": true,
        "showMaskOnHover": false,
    });
}

function initPopup() {
    $(".js-popup").fancybox({
        toolbar  : false,
        smallBtn : true,
        btnTpl: {
            smallBtn:
                '<button type="button" data-fancybox-close class="fancybox-close" title="{{CLOSE}}">' +
                '<i class="fancybox-close-icon"></i>' +
                '</button>'
        },
        lang: "ru",
        i18n: {
            ru: {
                CLOSE: "Закрыть",
            },
        },
    });
}

function initSelect() {
    $('.js-select').selectric({
        disableOnMobile: false,
        nativeOnMobile: false,
        arrowButtonMarkup: '<b class="selectric-button"><i class="selectric-icon"></i></b>',
    });
}

function initMobileMenu() {
    if (typeof(MobileMenu) === 'undefined' || !jQuery.isFunction(MobileMenu)) {
        return false;
    }

    var common = {};

    jQuery('.JS-MobileMenu').not('.JS-MobileMenu-ready').each(function() {
        var local = GLOBAL.parseData(jQuery(this).data('mobilemenu'));
        new MobileMenu(this, jQuery.extend({}, common, local));
    });
}

function initForm() {
    jQuery('.js-form').each(function() {
        var $checkbox = $(this).find('.js-form-checkbox'),
            $button = $(this).find('.js-form-button'),
            classDisabled = $(this).data('form-disabled');

        if ($checkbox.is(':checked')) {
            $button.removeClass(classDisabled);
        } else {
            $button.addClass(classDisabled);
        }

        $checkbox.on("change", function(e) {
            e.stopPropagation();
            if ($checkbox.is(':checked')) {
                $button.prop("disabled", false);
                $button.removeClass(classDisabled);
            } else {
                $button.prop("disabled", true);
                $button.addClass(classDisabled);
            }
        });
    });
}

function openPopupSuccess(url) {
    if (typeof(url) == 'undefined') {
        url = '/';
    }

    $.fancybox.open({
        src  : url,
        type : 'ajax',
        toolbar  : false,
        smallBtn : true,
        afterShow: function (data) {
        },
        btnTpl: {
            smallBtn:
                '<button type="button" data-fancybox-close class="fancybox-close" title="{{CLOSE}}">' +
                '<i class="fancybox-close-icon"></i>' +
                "</button>"
        },
        lang: "ru",
        i18n: {
            ru: {
                CLOSE: "Закрыть",
            },
        }
    });
}

function initAjaxMore() {
    if (typeof(AjaxMore) === 'undefined' || !jQuery.isFunction(AjaxMore)) {
        return false;
    }

    var common = {
        beforeSend: function () {
        },
        success: function () {
        }
    };

    $('.JS-AjaxMore').each(function(){
        var local = GLOBAL.parseData(jQuery(this).data('ajaxmore'));
        new AjaxMore(this, jQuery.extend({}, common, local));
    });
}

function initMainmenu() {
    $('.js-main-menu-item').each(function(){
        let $element = $(this),
            $switcher = $('.js-main-menu-switcher'),
            classActive = $switcher.data('mainmenu-class');

        $element.hover(
            function () {
                $switcher.removeClass(classActive);
            },
            function () {
            }
        );
    });
}

var sliderMainBanner;
function initSliderMainBanner() {
    jQuery('.js-slider-main-banner').each(function() {
        var $slider = $(this),
            sliderLength = $slider.find('.swiper-slide').length,
            $count = $slider.find('.js-slider-count');

        var isStart = sliderLength > 1 ? true : false;

        sliderMainBanner = new Swiper($slider[0], {
            loop: isStart,
            pagination: false,
            navigation: {
                nextEl: $slider.find('.js-slider-next')[0],
                prevEl: $slider.find('.js-slider-prev')[0],
                disabledClass: "slider-button_disabled",
            },
            slidesPerView: 'auto',
            threshold: 10,
            spaceBetween: 0,
            preloadImages: false,
            lazy: {
                loadPrevNext: true,
                loadPrevNextAmount: 3,
            },
            breakpoints: {
                0: {
                    simulateTouch: false,
                },
                768: {
                },
                992: {
                },
            },
            on: {
                beforeInit: function () {
                },
                init: function () {
                },
                slideChangeTransitionEnd: function () {
                    var index = $slider.find('.swiper-slide-active').data('slider-index');
                    $count.text(index);
                },
            },
        });
    });
}

var sliderProduction;
function initSliderProduction() {
    jQuery('.js-slider-production').each(function() {
        var $slider = $(this),
            $list = $(this).find('.js-slider-list'),
            sliderLength = $slider.find('.swiper-slide').length;

        var isStart = sliderLength > 1 ? true : false;

        sliderProduction = new Swiper($list[0], {
            loop: isStart,
            pagination: false,
            navigation: {
                nextEl: $slider.find('.js-slider-next')[0],
                prevEl: $slider.find('.js-slider-prev')[0],
                disabledClass: "slider-button_disabled",
            },
            threshold: 10,
            preloadImages: false,
            lazy: {
                loadPrevNext: true,
                loadPrevNextAmount: 10,
            },
            breakpoints: {
                0: {
                    simulateTouch: false,
                    spaceBetween: 25,
                    slidesPerView: "auto",
                },
                768: {
                    slidesPerView: "auto",
                    spaceBetween: 25,
                    loop: sliderLength > 3 ? true : false,
                },
                992: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                    loop: sliderLength > 4 ? true : false,
                },
            },
            on: {
                beforeInit: function () {
                },
                init: function () {
                },
            },
        });
    });
}

var sliderStories;
function initSliderStories() {
    jQuery('.js-slider-stories').each(function() {
        var $slider = $(this),
            $list = $(this).find('.js-slider-list'),
            sliderLength = $slider.find('.swiper-slide').length;

        var isStart = sliderLength > 1 ? true : false;

        sliderStories = new Swiper($list[0], {
            loop: isStart,
            pagination: false,
            navigation: {
                nextEl: $slider.find('.js-slider-next')[0],
                prevEl: $slider.find('.js-slider-prev')[0],
                disabledClass: "slider-button_disabled",
            },
            threshold: 10,
            preloadImages: false,
            lazy: {
                loadPrevNext: true,
                loadPrevNextAmount: 10,
            },
            breakpoints: {
                0: {
                    simulateTouch: false,
                    spaceBetween: 25,
                    slidesPerView: "auto",
                },
                768: {
                    slidesPerView: "auto",
                    spaceBetween: 25,
                    loop: sliderLength > 3 ? true : false,
                },
                992: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                    loop: sliderLength > 4 ? true : false,
                },
            },
            on: {
                beforeInit: function () {
                },
                init: function () {
                },
            },
        });
    });
}

var sliderAvail;
function initSliderAvail() {
    jQuery('.js-slider-avail').each(function() {
        var $slider = $(this),
            $list = $(this).find('.js-slider-list'),
            sliderLength = $slider.find('.swiper-slide').length;

        var isStart = sliderLength > 1 ? true : false;

        sliderAvail = new Swiper($list[0], {
            loop: false,
            pagination: false,
            navigation: {
                nextEl: $slider.find('.js-slider-next')[0],
                prevEl: $slider.find('.js-slider-prev')[0],
                disabledClass: "slider-button_disabled",
            },
            threshold: 10,
            slidesPerView: "auto",
            spaceBetween: 25,
            breakpoints: {
                0: {
                    simulateTouch: false,
                },
                768: {
                },
                992: {
                },
            },
            on: {
                beforeInit: function () {
                },
                init: function () {
                },
            },
        });
    });
}
function reInitSliderAvail() {
    if (sliderAvail) {
        sliderAvail.destroy();
    }
    sliderAvail = undefined;
}

function initPopupCallback() {
    $element = $('.js-popup-callback');

    $element.fancybox({
        src  : $element.data('src'),
        type : 'ajax',
        toolbar  : false,
        smallBtn : true,
        btnTpl: {
            smallBtn:
                '<button type="button" data-fancybox-close class="fancybox-close" title="{{CLOSE}}">' +
                '<i class="fancybox-close-icon"></i>' +
                '</button>'
        },
        lang: "ru",
        i18n: {
            ru: {
                CLOSE: "Закрыть",
            },
        },
        afterShow: function (data) {
            initValidate(data.$refs.container.find('.js-form-validate'));
            initForm();
            initMask();
        },
    });
}

function initNumerator() {
    jQuery('.js-numerator-item').each(function() {
        var $element = $(this),
            $value = $element.find('.js-numerator-value'),
            value = $value.text(),
            max = $element.data('numerator-max'),
            step = $element.data('numerator-step'),
            speed = $element.data('numerator-speed');

        function start() {
            if (value < max){
                value = Number(value) + Number(step);
                $value.html(value);
                setTimeout(start, speed);
            } else {
                if (value > 0){
                    if (value >= 1000000){
                        max = value/1000000;
                    }
                    $value.html(max);
                }
            }
        }
        start();
    });
}

function initAnimateSection() {
    var wow = new WOW(
        {
            boxClass:     'js-animate-section-1',
            animateClass: 'animated',
            offset:       200,
            mobile:       true,
            live:         true,
            callback:     function(box) {
                initNumerator();
            },
            scrollContainer: null,
        }
    );
    wow.init();
}

function initExpand() {
    jQuery('.js-expand').each(function() {
        var $element = $(this),
            $block = $element.find('.js-expand-block'),
            $link = $element.find('.js-expand-link'),
            local = GLOBAL.parseData(jQuery(this).data('expand')),
            classActive = local.classActive || 'active',
            classShow = local.classShow || 'show',
            heightParent = parseInt($block.css('min-height'),10) || 21,
            heightChild = $block.height();

        if (heightChild > heightParent) {
            $element.addClass(classActive);

            $link.on("click", function() {
                $element.addClass(classShow);
            });
        }
    });
}

var sliderCatalogCategory;
function initSliderCatalogCategory() {
    jQuery('.js-slider-catalog-category').each(function() {
        var $slider = $(this),
            $list = $(this).find('.js-slider-list'),
            sliderLength = $slider.find('.swiper-slide').length;

        var isStart = sliderLength > 1 ? true : false;

        sliderCatalogCategory = new Swiper($list[0], {
            loop: isStart,
            pagination: false,
            navigation: {
                nextEl: $slider.find('.js-slider-next')[0],
                prevEl: $slider.find('.js-slider-prev')[0],
                disabledClass: "slider-button_disabled",
            },
            threshold: 10,
            spaceBetween: 25,
            slidesPerView: "auto",
            freeMode: true,
            breakpoints: {
                0: {
                    simulateTouch: false,
                },
            },
            on: {
                beforeInit: function () {
                },
                init: function () {
                },
            },
        });
    });
}
function reInitSliderCatalogCategory() {
    if (sliderCatalogCategory) {
        sliderCatalogCategory.destroy();
    }
    sliderCatalogCategory = undefined;
}

function initAfterBefore() {
    $('.js-after-before').each(function(){
        let $element = $(this),
            $item = $element.find('.js-after-before-item'),
            classActive = $element.data('after-before-class');

        $item.hover(
            function () {
                $element.addClass(classActive);
            },
            function () {
                $element.removeClass(classActive);
            }
        );
    });
}

function initAjaxMoreCatalog() {
    if (typeof(AjaxMore) === 'undefined' || !jQuery.isFunction(AjaxMore)) {
        return false;
    }

    var common = {
        beforeSend: function () {
        },
        success: function () {
        }
    };

    $('.JS-AjaxMoreCatalog').each(function(){
        var local = GLOBAL.parseData(jQuery(this).data('ajaxmore'));
        new AjaxMore(this, jQuery.extend({}, common, local));
    });
}

let galleryThumbs,
    galleryTop;
function initGalleryCard() {
    let $slider = $(".js-gallery-card-thumbs"),
        $list = $slider.find('.js-slider-list'),
        sliderLength = $slider.find('.swiper-slide').length;

    let isStart = sliderLength > 1 ? true : false;

    galleryThumbs = new Swiper($list[0], {
        loop: false,
        slidesPerView: "auto",
        autoHeight: false,
        pagination: false,
        threshold: 10,
        watchSlidesProgress: true,
        direction: "vertical",
        breakpoints: {
            0: {
                spaceBetween: 6,
            },
            720: {
                spaceBetween: 12,
            },
            992: {
                spaceBetween: 15,
            },
            1250: {
                spaceBetween: 25,
            },
        }
    });
    galleryTop = new Swiper(".js-gallery-card-main", {
        loop: false,
        direction: "horizontal",
        spaceBetween: 40,
        navigation: {
            nextEl: $slider.find('.js-gallery-card-next')[0],
            prevEl: $slider.find('.js-gallery-card-prev')[0],
            disabledClass: "card-gallery-button_disabled",
        },
        pagination: false,
        thumbs: {
            swiper: isStart ? galleryThumbs : false,
        },
        slidesPerView: "auto",
        threshold: 10,
        breakpoints: {
            0: {
                spaceBetween: 20,
            },
            720: {
                spaceBetween: 15,
            },
            992: {
                spaceBetween: 15,
            },
        },
    });
};

var sliderCharacteristicsNav;
function initSliderCharacteristicsNav() {
    jQuery('.js-slider-characteristics-nav').each(function() {
        var $slider = $(this),
            $list = $slider.find('.js-slider-list');

        sliderCharacteristicsNav = new Swiper($list[0], {
            loop: false,
            pagination: false,
            navigation: false,
            slidesPerView: 'auto',
            threshold: 10,
            freeMode: true,
            breakpoints: {
                0: {
                    simulateTouch: false,
                    spaceBetween: 23,
                },
                768: {
                    spaceBetween: 23,
                },
                992: {
                },
            },
            on: {
                beforeInit: function () {
                },
                init: function () {
                },
                slideChangeTransitionEnd: function () {
                },
            },
        });
    });
}
function reInitSliderCharacteristicsNav() {
    if (sliderCharacteristicsNav) {
        sliderCharacteristicsNav.destroy();
    }
    sliderCharacteristicsNav = undefined;
}

function initTabCharacteristics() {
    if (typeof(Tab) === 'undefined' || !jQuery.isFunction(Tab)) {
        return false;
    }

    var common = {
        onToggle: function (elem) {
            if (sliderCharacteristicsNav) {
                let index = elem.index();
                sliderCharacteristicsNav.slideTo(index, 600, false);
            }
        },
    };

    jQuery('.JS-Tab-Characteristics').not('.JS-Tab-ready').each(function() {
        var local = GLOBAL.parseData(jQuery(this).data('tab'));
        new Tab(this, jQuery.extend({}, common, local));
    });
}

function initPopupGallery() {
    $(".js-popup-gallery").fancybox({
        loop: true,
        infobar: false,
        toolbar  : false,
        smallBtn : true,
        arrows : false,
        animationEffect: "fade",
        hash : false,
        backFocus: false,
        btnTpl: {
            smallBtn:
                '<button type="button" data-fancybox-close class="fancybox-close" title="{{CLOSE}}">' +
                '<i class="fancybox-close-icon"></i>' +
                '</button>'
        },
        beforeClose: function (instance) {
        },
        afterShow: function(instance, current) {
            if ( instance.group.length > 1 && current.$content ) {
                current.$content.append('' +
                    '<div class="fancybox-nav-block">' +
                    '<button class="fancybox-button fancybox-button--arrow_left prev" data-fancybox-prev>' +
                    '<span class="fancybox-button-icon fancybox-button-icon_left"><span class="fancybox-button-arrow"></span></span>\n' +
                    '</button>' +
                    '<button class="fancybox-button fancybox-button--arrow_right next" data-fancybox-next>' +
                    '<span class="fancybox-button-icon fancybox-button-icon_right"><span class="fancybox-button-arrow"></span></span>\n' +
                    '</button>' +
                    '</div>'
                );
            }
        },
        lang: "ru",
        i18n: {
            ru: {
                CLOSE: "Закрыть",
            },
        },
    });
}

var sliderCertificates;
function initSliderCertificates() {
    jQuery('.js-slider-certificates').each(function() {
        var $slider = $(this),
            $list = $(this).find('.js-slider-list'),
            sliderLength = $slider.find('.swiper-slide').length,
            $count = $slider.find('.js-slider-count');

        var isStart = sliderLength > 1 ? true : false;

        sliderCertificates = new Swiper($list[0], {
            loop: isStart,
            pagination: false,
            navigation: {
                nextEl: $slider.find('.js-slider-next')[0],
                prevEl: $slider.find('.js-slider-prev')[0],
                disabledClass: "slider-button_disabled",
            },
            threshold: 10,
            breakpoints: {
                0: {
                    simulateTouch: false,
                    spaceBetween: 20,
                    slidesPerView: "auto",
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 25,
                    loop: sliderLength > 2 ? true : false,
                },
                992: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                    loop: sliderLength > 2 ? true : false,
                },
            },
            on: {
                beforeInit: function () {
                },
                init: function () {
                },
                slideChangeTransitionEnd: function () {
                    var index = $slider.find('.swiper-slide-active').data('slider-index');
                    $count.text(index);
                },
            },
        });
    });
}

function initViewText() {
    jQuery('.js-view-text').not('.js-view-text-ready').each(function() {
        var $element = $(this),
            $parent = $element.find('.js-view-text-parent'),
            $child = $element.find('.js-view-text-child'),
            $switcher = $element.find('.js-view-text-switcher'),
            classStart = $element.data('view-start'),
            classActive = $element.data('view-active');

        $element.addClass('js-view-text-ready');

        $switcher.on('click', function(e) {
            if (!$element.hasClass(classActive)) {
                $element.addClass(classActive);
            } else {
                $element.removeClass(classActive);
            }
        });

        var heightParent = $parent.height(),
            heightChild = $child.height();

        if (heightChild > heightParent) {
            $element.addClass(classStart);
        }
    });
}

function initAjaxMoreReview() {
    if (typeof(AjaxMore) === 'undefined' || !jQuery.isFunction(AjaxMore)) {
        return false;
    }

    var common = {
        beforeSend: function () {
        },
        success: function () {
            initViewText();
        }
    };

    $('.JS-AjaxMoreReview').each(function(){
        var local = GLOBAL.parseData(jQuery(this).data('ajaxmore'));
        new AjaxMore(this, jQuery.extend({}, common, local));
    });
}

var sliderPartners;
function initSliderPartners() {
    jQuery('.js-slider-partners').each(function() {
        var $slider = $(this),
            $list = $(this).find('.js-slider-list'),
            sliderLength = $slider.find('.swiper-slide').length,
            $count = $slider.find('.js-slider-count');

        var isStart = sliderLength > 1 ? true : false;

        sliderPartners = new Swiper($list[0], {
            loop: isStart,
            pagination: false,
            navigation: {
                nextEl: $slider.find('.js-slider-next')[0],
                prevEl: $slider.find('.js-slider-prev')[0],
                disabledClass: "slider-button_disabled",
            },
            slidesPerView: 'auto',
            threshold: 10,
            spaceBetween: 0,
            preloadImages: false,
            lazy: {
                loadPrevNext: true,
                loadPrevNextAmount: 3,
            },
            breakpoints: {
                0: {
                    simulateTouch: false,
                },
                768: {
                },
                992: {
                },
            },
            on: {
                beforeInit: function () {
                },
                init: function () {
                },
                slideChangeTransitionEnd: function () {
                    var index = $slider.find('.swiper-slide-active').data('slider-index');
                    $count.text(index);
                },
            },
        });
    });
}

var sliderStructure;
function initSliderStructure() {
    jQuery('.js-slider-structure').each(function() {
        var $slider = $(this),
            $list = $(this).find('.js-slider-list'),
            sliderLength = $slider.find('.swiper-slide').length,
            $count = $slider.find('.js-slider-count');

        var isStart = sliderLength > 1 ? true : false;

        sliderStructure = new Swiper($list[0], {
            loop: false,
            pagination: false,
            navigation: {
                nextEl: $slider.find('.js-slider-next')[0],
                prevEl: $slider.find('.js-slider-prev')[0],
                disabledClass: "slider-button_disabled",
            },
            slidesPerView: 'auto',
            threshold: 10,
            spaceBetween: 0,
            breakpoints: {
                0: {
                    simulateTouch: false,
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 2,
                },
            },
            on: {
                beforeInit: function () {
                },
                init: function () {
                },
                slideChangeTransitionEnd: function () {
                    var index = $slider.find('.swiper-slide-active').data('slider-index');
                    $count.text(index);
                },
            },
        });
    });
}

var sliderStages;
function initSliderStages() {
    jQuery('.js-slider-stages').each(function() {
        var $slider = $(this),
            $list = $(this).find('.js-slider-list'),
            sliderLength = $slider.find('.swiper-slide').length,
            $description = $slider.find('.js-slider-description'),
            $current = $slider.find('.js-slider-val-current'),
            $next = $slider.find('.js-slider-val-next');

        var isStart = sliderLength > 1 ? true : false;

        sliderStages = new Swiper($list[0], {
            loop: false,
            pagination: false,
            navigation: {
                nextEl: $slider.find('.js-slider-next')[0],
                prevEl: $slider.find('.js-slider-prev')[0],
                disabledClass: "slider-button_disabled",
            },
            slidesPerView: 'auto',
            threshold: 10,
            spaceBetween: 0,
            centeredSlides: true,
            breakpoints: {
                0: {
                    simulateTouch: false,
                    direction: 'horizontal',
                },
                768: {
                    direction: "vertical",
                },
                992: {
                    direction: "vertical",
                },
            },
            on: {
                beforeInit: function () {
                },
                init: function () {
                    var current = $slider.find('.swiper-slide-active').html(),
                        next = $slider.find('.swiper-slide-next').html();

                    $current.html(current);
                    $next.html(next);
                },
                slideChangeTransitionEnd: function () {
                    var index = $slider.find('.swiper-slide-active').data('slider-index'),
                        current = $slider.find('.swiper-slide-active').html(),
                        next = $slider.find('.swiper-slide-next').html();

                    $description.removeClass('stages-list-item_active');
                    var item = $description.filter('[data-slider-index="' + index + '"]');
                    item.addClass('stages-list-item_active');

                    $current.html(current);
                    $next.html(next);
                },
            },
        });
    });
}

var sliderCooperation;
function initSliderCooperation() {
    jQuery('.js-slider-cooperation').each(function() {
        var $slider = $(this),
            $list = $(this).find('.js-slider-list'),
            sliderLength = $slider.find('.swiper-slide').length;

        var isStart = sliderLength > 1 ? true : false;

        sliderCooperation = new Swiper($list[0], {
            loop: false,
            pagination: false,
            navigation: {
                nextEl: $slider.find('.js-slider-next')[0],
                prevEl: $slider.find('.js-slider-prev')[0],
                disabledClass: "slider-button_disabled",
            },
            slidesPerView: 'auto',
            threshold: 10,
            spaceBetween: 0,
            watchSlidesProgress: true,
            breakpoints: {
                0: {
                    simulateTouch: false,
                    direction: "vertical",
                },
                768: {
                    direction: "horizontal",
                },
                992: {
                    direction: "horizontal",
                },
            },
            on: {
                beforeInit: function () {
                },
                init: function () {
                },
                slideChangeTransitionEnd: function () {
                },
            },
        });
    });
}

var sliderFactors;
function initSliderFactors() {
    jQuery('.js-slider-factors').each(function() {
        var $slider = $(this),
            $list = $(this).find('.js-slider-list'),
            sliderLength = $slider.find('.swiper-slide').length;

        var isStart = sliderLength > 1 ? true : false;

        sliderFactors = new Swiper($list[0], {
            loop: false,
            pagination: false,
            navigation: {
                nextEl: $slider.find('.js-slider-next')[0],
                prevEl: $slider.find('.js-slider-prev')[0],
                disabledClass: "slider-button_disabled",
            },
            slidesPerView: 'auto',
            threshold: 10,
            spaceBetween: 0,
            watchSlidesProgress: true,
            breakpoints: {
                0: {
                    simulateTouch: false,
                    direction: "vertical",
                },
                768: {
                    direction: "horizontal",
                },
                992: {
                    direction: "horizontal",
                },
            },
            on: {
                beforeInit: function () {
                },
                init: function () {
                },
                slideChangeTransitionEnd: function () {
                },
            },
        });
    });
}

var sliderService;
function initSliderService() {
    jQuery('.js-slider-service').each(function() {
        var $slider = $(this),
            $list = $(this).find('.js-slider-list'),
            sliderLength = $slider.find('.swiper-slide').length;

        var isStart = sliderLength > 1 ? true : false;

        sliderService = new Swiper($list[0], {
            loop: false,
            pagination: false,
            navigation: {
                nextEl: $slider.find('.js-slider-next')[0],
                prevEl: $slider.find('.js-slider-prev')[0],
                disabledClass: "slider-button_disabled",
            },
            slidesPerView: 'auto',
            threshold: 10,
            spaceBetween: 0,
            watchSlidesProgress: true,
            breakpoints: {
                0: {
                    simulateTouch: false,
                },
                768: {
                },
                992: {
                },
            },
            on: {
                beforeInit: function () {
                },
                init: function () {
                },
                slideChangeTransitionEnd: function () {
                },
            },
        });
    });
}
function reInitSliderService() {
    if (sliderService) {
        sliderService.destroy();
    }
    sliderService = undefined;
}

var sliderArticles;
function initSliderArticles() {
    jQuery('.js-slider-articles').each(function() {
        var $slider = $(this),
            $list = $(this).find('.js-slider-list'),
            sliderLength = $slider.find('.swiper-slide').length;

        var isStart = sliderLength > 1 ? true : false;

        sliderArticles = new Swiper($list[0], {
            loop: isStart,
            pagination: false,
            navigation: {
                nextEl: $slider.find('.js-slider-next')[0],
                prevEl: $slider.find('.js-slider-prev')[0],
                disabledClass: "slider-button_disabled",
            },
            slidesPerView: 'auto',
            threshold: 10,
            spaceBetween: 0,
            breakpoints: {
                0: {
                    simulateTouch: false,
                },
                768: {
                },
                992: {
                },
            },
            on: {
                beforeInit: function () {
                },
                init: function () {
                },
                slideChangeTransitionEnd: function () {
                },
            },
        });
    });
}
function reInitSliderArticles() {
    if (sliderArticles) {
        sliderArticles.destroy();
    }
    sliderArticles = undefined;
}

var sliderReview;
function initSliderReview() {
    jQuery('.js-slider-review').each(function() {
        var $slider = $(this),
            $list = $(this).find('.js-slider-list'),
            sliderLength = $slider.find('.swiper-slide').length;

        var isStart = sliderLength > 1 ? true : false;

        sliderReview = new Swiper($list[0], {
            loop: isStart,
            pagination: false,
            navigation: {
                nextEl: $slider.find('.js-slider-next')[0],
                prevEl: $slider.find('.js-slider-prev')[0],
                disabledClass: "slider-button_disabled",
            },
            slidesPerView: 'auto',
            threshold: 10,
            spaceBetween: 0,
            preloadImages: false,
            lazy: {
                loadPrevNext: true,
                loadPrevNextAmount: 10,
            },
            breakpoints: {
                0: {
                    simulateTouch: false,
                    loop: sliderLength > 1 ? true : false,
                    spaceBetween: 20,
                },
                768: {
                    loop: sliderLength > 3 ? true : false,
                    spaceBetween: 25,
                },
                992: {
                    loop: sliderLength > 3 ? true : false,
                    spaceBetween: 30,
                },
            },
            on: {
                beforeInit: function () {
                },
                init: function () {
                },
                slideChangeTransitionEnd: function () {
                },
            },
        });
    });
}

var sliderCatalogSubcategory;
function initSliderCatalogSubcategory() {
    jQuery('.js-slider-catalog-subcategory').each(function() {
        var $slider = $(this),
            $list = $(this).find('.js-slider-list'),
            sliderLength = $slider.find('.swiper-slide').length;

        var isStart = sliderLength > 1 ? true : false;

        sliderCatalogSubcategory = new Swiper($list[0], {
            loop: isStart,
            pagination: false,
            navigation: {
                nextEl: $slider.find('.js-slider-next')[0],
                prevEl: $slider.find('.js-slider-prev')[0],
                disabledClass: "slider-button_disabled",
            },
            slidesPerView: 'auto',
            threshold: 10,
            spaceBetween: 0,
            breakpoints: {
                0: {
                    simulateTouch: false,
                    spaceBetween: 20,
                    loop: sliderLength > 1 ? true : false,
                },
                768: {
                    spaceBetween: 20,
                    loop: sliderLength > 3 ? true : false,
                },
                992: {
                },
            },
            on: {
                beforeInit: function () {
                },
                init: function () {
                },
                slideChangeTransitionEnd: function () {
                },
            },
        });
    });
}
function reInitSliderCatalogSubcategory() {
    if (sliderCatalogSubcategory) {
        sliderCatalogSubcategory.destroy();
    }
    sliderCatalogSubcategory = undefined;
}

function initResizeWindow() {
    var width = $(window).outerWidth();
    if (width <= GLOBAL.mobile) {
        GLOBAL.widthWindow = 'isMobile';
        if (sliderAvail == undefined) {
            initSliderAvail();
        }
        if (sliderCatalogCategory == undefined) {
            initSliderCatalogCategory();
        }
        if (sliderCharacteristicsNav == undefined) {
            initSliderCharacteristicsNav();
        }
        if (sliderService == undefined) {
            initSliderService();
        }
        if (sliderArticles == undefined) {
            initSliderArticles();
        }
        if (sliderCatalogSubcategory == undefined) {
            initSliderCatalogSubcategory();
        }
    } else if (width <= GLOBAL.tablet) {
        GLOBAL.widthWindow = 'isTablet';
        if (sliderAvail) {
            reInitSliderAvail();
        }
        if (sliderCatalogCategory) {
            reInitSliderCatalogCategory();
        }
        if (sliderCharacteristicsNav == undefined) {
            initSliderCharacteristicsNav();
        }
        if (sliderService) {
            reInitSliderService();
        }
        if (sliderArticles) {
            reInitSliderArticles();
        }
        if (sliderCatalogSubcategory == undefined) {
            initSliderCatalogSubcategory();
        }
    } else {
        GLOBAL.widthWindow = '';
        if (sliderAvail) {
            reInitSliderAvail();
        }
        if (sliderCatalogCategory) {
            reInitSliderCatalogCategory();
        }
        if (sliderCharacteristicsNav) {
            reInitSliderCharacteristicsNav();
        }
        if (sliderService) {
            reInitSliderService();
        }
        if (sliderArticles) {
            reInitSliderArticles();
        }
        if (sliderCatalogSubcategory) {
            reInitSliderCatalogSubcategory();
        }
    }
}

$(document).ready(function () {
    initResizeWindow();
    $(window).resize(function(){
        initResizeWindow();
    });

    initDropdown();
    initScroll();
    initValidate();
    initMask();
    initPopup();
    initSelect();
    initMobileMenu();
    initForm();
    initAjaxMore();
    initMainmenu();
    initSliderMainBanner();
    initSliderProduction();
    initSliderStories();
    initPopupCallback();
    initAnimateSection();
    initExpand();
    initAfterBefore();
    initAjaxMoreCatalog();
    initGalleryCard();
    initTabCharacteristics();
    initPopupGallery();
    initSliderCertificates();
    initViewText();
    initAjaxMoreReview();
    ymaps.ready(initMap);
    initSliderPartners();
    initSliderStructure();
    initSliderStages();
    initSliderCooperation();
    initSliderFactors();
    initSliderService();
    initSliderReview();
});

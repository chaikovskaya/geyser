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
});

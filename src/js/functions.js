// =============================================================================
// LAZY LOAD
// =============================================================================

var myLazyLoad = new LazyLoad({
    elements_selector: ".lazy"
});

// =============================================================================
// SCROLL NAV
// =============================================================================

$(function() {
    //caches a jQuery object containing the header element
    var header = $(".navbar");
    header.addClass("no-scroll");
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (scroll >= 0) {
            header.removeClass("no-scroll").addClass("scroll");
        }
        if (scroll <= 0) {
            header.removeClass("scroll").addClass("no-scroll");
        }
    });
});

$(function() {
    //caches a jQuery object containing the header element
    var header2 = $(".no-scroll");
    var scroll2 = $(window).scrollTop();
    if (scroll2 > 0) {
        header2.removeClass('no-scroll').addClass("scroll");
    }
    if (scroll < 0) {
        header2.removeClass("scroll").addClass('no-scroll');
    }
});


// =============================================================================
// PRINT STYLING
// =============================================================================

if ($(".printArea").length) {
    $("<style>")
    .prop("type", "text/css")
    .html("\
    @media print {\
        body {\
            position: relative;\
        }\
        body * {\
            visibility: hidden;\
            position: absolute;\
            left: 0px;\
            right: 0px;\
            top: 0px;\
            width: 100%;\
        }\
        .printArea, .printArea *{\
            visibility: visible;\
            position: relative;\
            width: 100%;\
        }\
        @page {size: 100%;  margin: 0mm;}\
    }")
    .appendTo("body");
}

// =============================================================================
// EU COOKIE POLICY
// =============================================================================

$(document).ready(function(){
    $.cookieBar({
        message: 'Tato stránka používá cookies za účelem optimalizace efektivního poskytování služeb.',
        acceptText: 'Rozumím',
        fixed: true,
        bottom: true,
        policyButton: true,
        policyText: 'Více informací',
        policyURL: 'http://www.google.com/intl/en/policies/technologies/cookies/',
    });
});

// =============================================================================
// OBJECT FIT FALLBACK
// =============================================================================

$(document).ready(function(){
    var styletotest = "object-fit";
    if (styletotest in document.body.style){
        /*alert("The " + styletotest + " property is supported");*/
    }
    else {
        $('.b-bgCover__wrap').each(function () {
            $('.b-bgCover__img').each(function () {
                var $container = $(this),
                imgUrl = $container.find('img.b-bgCover__img').attr('src');

                if(imgUrl==undefined){imgUrl = $container.find('img.b-bgCover__img').attr('srcset');}

                if (imgUrl) {
                    $(this).css('backgroundImage', 'url(' + imgUrl + ')');
                    $('.b-bgCover__img').css('display','none');
                    $(this).css('background-size','cover');
                    $(this).css('background-position','center center');
                }  
            });
        });
    }
});

// =============================================================================
// HERO CAROUSEL CONTROL
// =============================================================================

var carousel_main = new Swiper('.m-heroCarousel__content', {
  lazy: true,
  autoplay: {
    delay: 59999000,
  },
  spaceBetween: 0,
  grabCursor: true,
  zoom: false,
  loop: true,
  pagination: {
      el: '.m-heroCarousel__pagination',
      clickable: true,
  },
  navigation: {
      nextEl: '.o-hero__swiperButton.-next',
      prevEl: 'o-hero__swiperButton.-prev',
  },
});

// =============================================================================
// VARIOUS TOGGLES AND CONTROLS
// =============================================================================

$("#js-navToggler, #js-navProductsClose").click(function() { 
    $("body").toggleClass("-noScroll");
    $("#js-navToggler, #js-navProducts, #js-darkOverlay").toggleClass("-active");
});

$("#js-darkOverlay").click(function() { 
    $("body").toggleClass("-noScroll");
    $("#js-navToggler, #js-navProducts, #js-darkOverlay").toggleClass("-active");
});

$("#js-navSearchToggler, #js-navSearchTogglerClose").click(function() { 
    $("#js-navSearch").toggleClass("-active");
    $("#searchbox").focus();
});

$("#js-filterToggler, #js-filterTogglerResponsive, #js-filterTogglerResponsive2").click(function() { 
    $("#js-filter").toggleClass("-active");
});

// =============================================================================
// FILTER 
// =============================================================================


$(document).ready(function(){
        $('#js-filter').change( function(e){
            var c = '';
            $('#js-filter input:checkbox:checked, #js-filter input[type="radio"]:checked, #js-filter input[type="range"]').each(function(){
                var name = ($(this).attr("name"));
                var value = ($(this).val());
                var data = encodeURIComponent(name) + "=" + encodeURIComponent(value);
                c += data + "&";
            });
   
                e.preventDefault();
                $.ajax({
                      
                        type: 'GET',
                        data: $('#js-filter').serialize(),
                        success: function(data){
                          
                                window.history.pushState("object or string", "Title", "?" + c);
                                $(".o-productGrid").load("?" + c + " .o-productGrid", function() {
                                    $(".o-productGrid > .o-productGrid").unwrap();
                                    var myLazyLoad = new LazyLoad({
                                        elements_selector: ".lazy"
                                    });
                                });
                                $(".m-filterBadges").load("?" + c + " .m-filterBadges", function() {
                                    $(".m-filterBadges > .m-filterBadges").unwrap();
                                });
                                $(".o-productPagination").load("?" + c + " .o-productPagination", function() {
                                    $(".o-productPagination > .o-productPagination").unwrap();
                                });
                        },
            error: function(data) { 
                alert('Chyba při odesílání')
            }
                });
        });
});


$(document).click(function(e){
	if (!$(e.target).is('.o-filter__single *')){
    	$('.o-filter__collapse').collapse('hide');	    
    }
});

$(document).click(function(e){
	if (!$(e.target).is('.m-navUser *')){
    	$('.m-navUser__collapse').collapse('hide');	    
    }
});

$(document).click(function(e){
	if (!$(e.target).is('.m-navCart *')){
    	$('.m-navCart__collapse').collapse('hide');	    
    }
});

$(document).ready(function(){
    var pricePhone = $(".m-productDetailMain__priceMain").text();
    $(".productDetailResponsive__price").text(pricePhone);
});

// =============================================================================
// FORM VALIDATION AND REQUIRED SETUP
// =============================================================================

$('#register_form_billing_toggler').click(function() {
    $('#formBillingCollapse input:not(#register_form_billing_name, #register_form_billing_dic)').each(function(){
        if(!$(this).prop('required')){
            $(this).prop('required',true);
        }
        else {
        $(this).prop('required',false);
        }
    });
});

$('#register_form_shipping_toggler').click(function() {
    $('#formShippingCollapse input:not(#register_form_shipping_company)').each(function(){
        if(!$(this).prop('required')){
            $(this).prop('required',true);
        }
        else {
        $(this).prop('required',false);
        }
    });
});

$('#register_form_register_toggler').click(function() {
    $('#formRegisterCollapse input').each(function(){
        if(!$(this).prop('required')){
            $(this).prop('required',true);
        }
        else {
        $(this).prop('required',false);
        }
    });
});

// =============================================================================
// SHOW PASSWORD
// =============================================================================

$('#show_password_toggler').click(function() {
    if($("#register_form_password, #register_form_register_password").prop("type") == "text"){
        $("#register_form_password, #register_form_register_password").prop("type","password");
    }
    else {
        $("#register_form_password, #register_form_register_password").prop("type","text");
    }
});

// =============================================================================
// FILTER PRICE RANGE
// =============================================================================


$(document).on('input change','#filter-range-input-1, #filter-range-input-2', function() {
    $("#filter-range-value-1").text($("#filter-range-input-1").val() + " Kč");

    $("#filter-range-value-2").text($("#filter-range-input-2").val() + " Kč");

});

// =============================================================================
// SEARCH AUTOCOMPLETE
// =============================================================================

/*
var options = {
    data: ["blue", "green", "pink", "red", "yellow"]
};
$("#searchbox").easyAutocomplete(options);
*/
$(document).ready(function() {
    $("#eac-container-searchbox").click(function() {
        $("#search-form").submit();
    });
});

// =============================================================================
// ANCHOR LINK SETUP
// =============================================================================

$('a[href*="#anchor"]').not('[href="#"]').not('[href="#0"]').click(function(event) {
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
});

// =============================================================================
// TOOLTIP SETUP
// =============================================================================

$(function () {
  $("[data-toggle='tooltip']").tooltip()
})

// =============================================================================
// SELECTBOX 
// =============================================================================

if($(".m-selectBox .m-selectBox__input:checked")){ 
    var value = $(".m-selectBox .m-selectBox__input:checked").siblings(".m-selectBox__content").find(".m-selectBox__name").text();

    var priceOld= $(".m-selectBox .m-selectBox__input:checked").siblings(".m-selectBox__content").find(".m-selectBox__priceOld").text();
    $(".m-productDetailMain__priceOld").text(priceOld);

    var price= $(".m-selectBox .m-selectBox__input:checked").siblings(".m-selectBox__content").find(".m-selectBox__priceNew").text();
    $(".m-productDetailMain__priceMain").text(price);

    var priceClean = parseInt($(".m-productDetailMain__priceMain").text().replace(/[^0-9\.]/g, ''));
    var priceDPH = priceClean-(priceClean*0.21).toFixed(2);
    $(".m-productDetailMain__priceDPH").text(priceDPH + " Kč bez DPH");

    var stock= $(".m-selectBox .m-selectBox__input:checked").siblings(".m-selectBox__content").find(".m-selectBox__stock").text();
    $(".m-productDetailMain__stockText").text(stock);

    $(".m-selectBox .m-selectBox__dropdownText").text("Vybráno: " + value);
}

$(".m-selectBox .m-selectBox__input").click(function () {   
    var value = $(this).siblings(".m-selectBox__content").find(".m-selectBox__name").text();

    var priceOld= $(".m-selectBox .m-selectBox__input:checked").siblings(".m-selectBox__content").find(".m-selectBox__priceOld").text();
    $(".m-productDetailMain__priceOld").text(priceOld);

    var price= $(".m-selectBox .m-selectBox__input:checked").siblings(".m-selectBox__content").find(".m-selectBox__priceNew").text();
    $(".m-productDetailMain__priceMain").text(price);
    
    var priceClean = parseInt($(".m-productDetailMain__priceMain").text().replace(/[^0-9\.]/g, ''));
    var priceDPH= priceClean-(priceClean*0.21).toFixed(2);
    $(".m-productDetailMain__priceDPH").text(priceDPH + " Kč bez DPH");

    var stock= $(".m-selectBox .m-selectBox__input:checked").siblings(".m-selectBox__content").find(".m-selectBox__stock").text();
    $(".m-productDetailMain__stockText").text(stock);

    $(".m-selectBox .m-selectBox__dropdownText").text("Vybráno: " + value);
});


// =============================================================================
// CART
// =============================================================================

var dopravaInput = '.o-cartDeliveryForm .m-formGroup__input[name="doprava"]';

if($(dopravaInput).is(':checked')){ 

    var name = $(dopravaInput+":checked").siblings(".m-formGroup__label").html();
    var nameClean= name.substr(0, name.indexOf('<span'));
    $(".m-cartOverview__shippingTitle").text(nameClean);

    var value = $(dopravaInput+":checked").siblings(".m-formGroup__price").text();
    $(".m-cartOverview__shippingNumber").text(value);

}

$(dopravaInput).click(function () { 
    
    var name = $(dopravaInput+":checked").siblings(".m-formGroup__label").html();
    var nameClean= name.substr(0, name.indexOf('<span'));
    $(".m-cartOverview__shippingTitle").text(nameClean);
    
    var value = $(dopravaInput+":checked").siblings(".m-formGroup__price").text();
    $(".m-cartOverview__shippingNumber").text(value);

});


var platbaInput = '.o-cartDeliveryForm .m-formGroup__input[name="platba"]';

if($(platbaInput).is(':checked')){ 

    var name = $(platbaInput+":checked").siblings(".m-formGroup__label").html();
    var nameClean= name.substr(0, name.indexOf('<span'));
    $(".m-cartOverview__paymentTitle").text(nameClean);
    
    var value = $(platbaInput+":checked").siblings(".m-formGroup__price").text();
    $(".m-cartOverview__paymentNumber").text(value);

}

$(platbaInput).click(function () { 
    
    var name = $(platbaInput+":checked").siblings(".m-formGroup__label").html();
    var nameClean= name.substr(0, name.indexOf('<span'));
    $(".m-cartOverview__paymentTitle").text(nameClean);
    
    var value = $(platbaInput+":checked").siblings(".m-formGroup__price").text();
    $(".m-cartOverview__paymentNumber").text(value);

});


$.fn.digits = function(){ 
    return this.each(function(){ 
        $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ") ); 
    })
}

$(window).bind("load", function() { 
    var cena = parseInt($(".m-cartOverview").data("price"));
    
    var doprava = parseInt($('.m-cartOverview__shippingNumber').text().replace(/[^0-9\.]/g, ''));
    if($.isNumeric(doprava)){

    }else{doprava = 0;}
    
    var platba = parseInt($('.m-cartOverview__paymentNumber').text().replace(/[^0-9\.]/g, ''));
    if($.isNumeric(platba)){
        
    }else{platba = 0;}
    
    $(".m-cartOverview__priceTitle").text((doprava+platba+cena) + " Kč").digits(); ;

});


$('.o-cartDeliveryForm .m-formGroup__input[name="doprava"], .o-cartDeliveryForm .m-formGroup__input[name="platba"]').click(function () { 
    var cena = parseInt($(".m-cartOverview").data("price"));

    var doprava = parseInt($('.m-cartOverview__shippingNumber').text().replace(/[^0-9\.]/g, ''));
    if($.isNumeric(doprava)){

    }else{doprava = 0;}

    var platba = parseInt($('.m-cartOverview__paymentNumber').text().replace(/[^0-9\.]/g, ''));
    if($.isNumeric(platba)){
        
    }else{platba = 0;}
    
    $(".m-cartOverview__priceTitle").text((doprava+platba+cena) + " Kč").digits(); ;

});


$(".o-cartDeliveryForm__item input[name='platba']").prop("disabled", true);

$(".o-cartDeliveryForm__item input[name='doprava']").click(function () {
    $(".o-cartDeliveryForm__item input[name='platba']").load(location.href +".o-cartDeliveryForm__item input[name='platba']>*","");
});

// =============================================================================
// CART FREE DELIVERY BAR
// =============================================================================

$("body").on('DOMSubtreeModified', ".m-cartPriceOverview__priceNumber", function(){
    var valueNum = $(".m-cartPriceOverview__priceNumber").text();
    var valueMax = $(".m-cartFreeShipping__progressBar").attr("aria-valuemax");
    var valueFin = (valueNum / valueMax)*100;
    if(valueFin <= 100){
        $(".m-cartFreeShipping__progressBar").css("width", valueFin + "%");
    }else{
        $(".m-cartFreeShipping__progressBar").css("width", "100%"); 
    }

    $(".m-cartFreeShipping__price").text((valueMax - valueNum ) + " Kč");

    
    var cartPrice = valueMax - valueNum;
    
    if(cartPrice > 0){
        
        $(".m-cartFreeShipping__text").html("Nakupte ještě za <span class='m-cartFreeShipping__price'>" + (cartPrice)  + "</span> Kč a máte dopravu zdarma");

    }else{
        $(".m-cartFreeShipping__text").text("Máte dopravu zdarma");
    }
    $(".m-cartBarResponsive__price span").text(valueNum);
});

$("body").on('DOMSubtreeModified', ".m-cartOverview__priceTitle", function(){
    var price2 = $(".m-cartOverview__priceTitle").text();
    $(".m-cartBarResponsive__price span").text(price2);
});

// =============================================================================
// FORM USER CART
// =============================================================================

$('#cartUserEdit').parent().find('input').attr('disabled', true);

$('#cartUserEdit').click(function () { 

    $('#cartUserEdit').parent().find('input').each(function(){
        if(!$(this).prop('disabled')){
            $(this).prop('disabled',true);
        }
        else {
        $(this).prop('disabled',false);
        }
    });

    $('#cartUserEdit').parent().parent().toggleClass("-disabled");
});

// =============================================================================
// MODAL AUTO DISPLAY
// =============================================================================

$(window).on("load",function(){
    $("#modal-info, #modal-add-to-cart").modal("show");
});

// =============================================================================
// HTML5 Speech Recognition API 
// =============================================================================

function startDictation() {
    if (window.hasOwnProperty('webkitSpeechRecognition')) {

        var recognition = new webkitSpeechRecognition();

        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.lang = "en-US";
        recognition.start();

        recognition.onresult = function(e) {
            document.getElementById('searchbox').value
                                        = e.results[0][0].transcript;
            recognition.stop();
            document.getElementById('search-form').submit();
        };

        recognition.onerror = function(e) {
            recognition.stop();
        }
    }
}

// =============================================================================
// SWIPER SETUP
// =============================================================================

$('.m-productCarousel').each(function(index, element){
    $(this).find(".m-productCarousel__content").addClass('s'+index);
    $(this).find(".m-productCarousel__swiperButton.-next").addClass('btn'+index);
    $(this).find(".m-productCarousel__swiperButton.-prev").addClass('btn'+index);
    var carousel_main = new Swiper('.s'+index, {
        lazy: true,
        autoplay: false,
        spaceBetween: 20,
        grabCursor: true,
        slidesPerView: 4,
        zoom: false,
        loop: false,
        pagination: false,
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: '.m-productCarousel__swiperButton.-next.btn'+index,
            prevEl: '.m-productCarousel__swiperButton.-prev.btn'+index,
        },
        breakpoints: {
            991: {
                slidesPerView: 3
            },
            700: {
                slidesPerView: 2
            },
            500: {
                spaceBetween: 10,
                slidesPerView: 2
            }
        }
    });
});



// =============================================================================
// BOTTOM NAV SETUP
// =============================================================================

/*
// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('.navbar-responsive-bottom').outerHeight();
$(window).scroll(function(event) {
    didScroll = true;
});
setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    // Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - st) <= delta) return;
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight) {
        // Scroll Down
        $('.navbar-responsive-bottom').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if (st + $(window).height() < $(document).height()) {
            $('.navbar-responsive-bottom').removeClass('nav-up').addClass('nav-down');
        }
    }
    lastScrollTop = st;
}
*/

// =============================================================================
// GALLERY SETUP
// =============================================================================

// check if target is photogallery in normal text page or product page and prevent errors
if ($('.m-productDetailCarousel__gallery').length == 0) {
    var initPhotoSwipeFromDOM = function(gallerySelector) {
        // parse slide data (url, title, size ...) from DOM elements 
        // (children of gallerySelector)
        var parseThumbnailElements = function(el) {
            var thumbElements = Array.prototype.slice.call(document.querySelectorAll('.photogallery__figure')),
                numNodes = thumbElements.length,
                items = [],
                figureEl,
                linkEl,
                size,
                item;
            for (var i = 0; i < numNodes; i++) {
                figureEl = thumbElements[i]; // <figure> element
                // include only element nodes 
                if (figureEl.nodeType !== 1) {
                    continue;
                }
                linkEl = figureEl.children[0]; // <a> element
                size = linkEl.getAttribute('data-size').split('x');
                // create slide object
                item = {
                    src: linkEl.getAttribute('href'),
                    w: parseInt(size[0], 10),
                    h: parseInt(size[1], 10)
                };
                if (figureEl.children.length > 1) {
                    // <figcaption> content
                    item.title = figureEl.children[1].innerHTML;
                }
                if (linkEl.children.length > 0) {
                    // <img> thumbnail element, retrieving thumbnail url
                    item.msrc = linkEl.children[0].getAttribute('src');
                }
                item.el = figureEl; // save link to element for getThumbBoundsFn
                items.push(item);
            }
            return items;
        };
        // find nearest parent element
        var closest = function closest(el, fn) {
            return el && (fn(el) ? el : closest(el.parentNode, fn));
        };
        // triggers when user clicks on thumbnail
        var onThumbnailsClick = function(e) {
            e = e || window.event;
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
            var eTarget = e.target || e.srcElement;
            // find root element of slide
            var clickedListItem = closest(eTarget, function(el) {
                return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
            });
            if (!clickedListItem) {
                return;
            }
            // find index of clicked item by looping through all child nodes
            // alternatively, you may define index via data- attribute
            var clickedGallery = document.querySelectorAll('.photogallery')[0],
                childNodes = Array.prototype.slice.call(document.querySelectorAll('.photogallery__figure')),
                numChildNodes = childNodes.length,
                nodeIndex = 0,
                index;
            for (var i = 0; i < numChildNodes; i++) {
                if (childNodes[i].nodeType !== 1) {
                    continue;
                }
                if (childNodes[i] === clickedListItem) {
                    index = nodeIndex;
                    break;
                }
                nodeIndex++;
            }
            if (index >= 0) {
                // open PhotoSwipe if valid index found
                openPhotoSwipe(index, clickedGallery);
            }
            return false;
        };
        // parse picture index and gallery index from URL (#&pid=1&gid=2)
        var photoswipeParseHash = function() {
            var hash = window.location.hash.substring(1),
                params = {};
            if (hash.length < 5) {
                return params;
            }
            var vars = hash.split('&');
            for (var i = 0; i < vars.length; i++) {
                if (!vars[i]) {
                    continue;
                }
                var pair = vars[i].split('=');
                if (pair.length < 2) {
                    continue;
                }
                params[pair[0]] = pair[1];
            }
            if (params.gid) {
                params.gid = parseInt(params.gid, 10);
            }
            return params;
        };
        var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
            var pswpElement = document.querySelectorAll('.pswp')[0],
                gallery,
                options,
                items;
            items = parseThumbnailElements(galleryElement);
            // define options (if needed)
            options = {
                loop: false,
                // define gallery index (for URL)
                galleryUID: galleryElement.getAttribute('data-pswp-uid'),
                getThumbBoundsFn: function(index) {
                    // See Options -> getThumbBoundsFn section of documentation for more info
                    var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                        pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                        rect = thumbnail.getBoundingClientRect();
                    return {
                        x: rect.left,
                        y: rect.top + pageYScroll,
                        w: rect.width
                    };
                }
            };
            // PhotoSwipe opened from URL
            if (fromURL) {
                if (options.galleryPIDs) {
                    // parse real index when custom PIDs are used 
                    // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                    for (var j = 0; j < items.length; j++) {
                        if (items[j].pid == index) {
                            options.index = j;
                            break;
                        }
                    }
                } else {
                    // in URL indexes start from 1
                    options.index = parseInt(index, 10) - 1;
                }
            } else {
                options.index = parseInt(index, 10);
            }
            // exit if index not found
            if (isNaN(options.index)) {
                return;
            }
            if (disableAnimation) {
                options.showAnimationDuration = 0;
            }
            // Pass data to PhotoSwipe and initialize it
            gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
            gallery.init();
        };
        // loop through all gallery elements and bind events
        var galleryElements = document.querySelectorAll(gallerySelector);
        for (var i = 0, l = galleryElements.length; i < l; i++) {
            galleryElements[i].setAttribute('data-pswp-uid', i + 1);
            galleryElements[i].onclick = onThumbnailsClick;
        }
        // Parse URL and open gallery if it contains #&pid=3&gid=1
        var hashData = photoswipeParseHash();
        if (hashData.pid && hashData.gid) {
            openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
        }
    };
}
// if product carousel gallery is needed
else {
    var initPhotoSwipeFromDOM = function(gallerySelector) {
        // parse slide data (url, title, size ...) from DOM elements 
        // (children of gallerySelector)
        var parseThumbnailElements = function(el) {
            var thumbElements = Array.prototype.slice.call(document.querySelectorAll('.m-productDetailCarousel__figure')),
                numNodes = thumbElements.length,
                items = [],
                figureEl,
                linkEl,
                size,
                item;
            for (var i = 0; i < numNodes; i++) {
                figureEl = thumbElements[i]; // <figure> element
                // include only element nodes 
                if (figureEl.nodeType !== 1) {
                    continue;
                }
                linkEl = figureEl.children[0]; // <a> element
                size = linkEl.getAttribute('data-size').split('x');
                // create slide object
                item = {
                    src: linkEl.getAttribute('href'),
                    w: parseInt(size[0], 10),
                    h: parseInt(size[1], 10)
                };
                if (figureEl.children.length > 1) {
                    // <figcaption> content
                    item.title = figureEl.children[1].innerHTML;
                }
                if (linkEl.children.length > 0) {
                    // <img> thumbnail element, retrieving thumbnail url
                    item.msrc = linkEl.children[0].getAttribute('src');
                }
                item.el = figureEl; // save link to element for getThumbBoundsFn
                items.push(item);
            }
            return items;
        };
        // find nearest parent element
        var closest = function closest(el, fn) {
            return el && (fn(el) ? el : closest(el.parentNode, fn));
        };
        // triggers when user clicks on thumbnail
        var onThumbnailsClick = function(e) {
            e = e || window.event;
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
            var eTarget = e.target || e.srcElement;
            // find root element of slide
            var clickedListItem = closest(eTarget, function(el) {
                return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
            });
            if (!clickedListItem) {
                return;
            }
            // find index of clicked item by looping through all child nodes
            // alternatively, you may define index via data- attribute
            var clickedGallery = document.querySelectorAll('.m-productDetailCarousel__gallery')[0],
                childNodes = Array.prototype.slice.call(document.querySelectorAll('.m-productDetailCarousel__figure')),
                numChildNodes = childNodes.length,
                nodeIndex = 0,
                index;
            for (var i = 0; i < numChildNodes; i++) {
                if (childNodes[i].nodeType !== 1) {
                    continue;
                }
                if (childNodes[i] === clickedListItem) {
                    index = nodeIndex;
                    break;
                }
                nodeIndex++;
            }
            if (index >= 0) {
                // open PhotoSwipe if valid index found
                openPhotoSwipe(index, clickedGallery);
            }
            return false;
        };
        // parse picture index and gallery index from URL (#&pid=1&gid=2)
        var photoswipeParseHash = function() {
            var hash = window.location.hash.substring(1),
                params = {};
            if (hash.length < 5) {
                return params;
            }
            var vars = hash.split('&');
            for (var i = 0; i < vars.length; i++) {
                if (!vars[i]) {
                    continue;
                }
                var pair = vars[i].split('=');
                if (pair.length < 2) {
                    continue;
                }
                params[pair[0]] = pair[1];
            }
            if (params.gid) {
                params.gid = parseInt(params.gid, 10);
            }
            return params;
        };
        var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
            var pswpElement = document.querySelectorAll('.pswp')[0],
                gallery,
                options,
                items;
            items = parseThumbnailElements(galleryElement);
            // define options (if needed)
            options = {
                loop: false,
                // define gallery index (for URL)
                galleryUID: galleryElement.getAttribute('data-pswp-uid'),
                getThumbBoundsFn: function(index) {
                    // See Options -> getThumbBoundsFn section of documentation for more info
                    var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                        pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                        rect = thumbnail.getBoundingClientRect();
                    return {
                        x: rect.left,
                        y: rect.top + pageYScroll,
                        w: rect.width
                    };
                }
            };
            // PhotoSwipe opened from URL
            if (fromURL) {
                if (options.galleryPIDs) {
                    // parse real index when custom PIDs are used 
                    // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                    for (var j = 0; j < items.length; j++) {
                        if (items[j].pid == index) {
                            options.index = j;
                            break;
                        }
                    }
                } else {
                    // in URL indexes start from 1
                    options.index = parseInt(index, 10) - 1;
                }
            } else {
                options.index = parseInt(index, 10);
            }
            // exit if index not found
            if (isNaN(options.index)) {
                return;
            }
            if (disableAnimation) {
                options.showAnimationDuration = 0;
            }
            // Pass data to PhotoSwipe and initialize it
            gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
            gallery.init();
        };
        // loop through all gallery elements and bind events
        var galleryElements = document.querySelectorAll(gallerySelector);
        for (var i = 0, l = galleryElements.length; i < l; i++) {
            galleryElements[i].setAttribute('data-pswp-uid', i + 1);
            galleryElements[i].onclick = onThumbnailsClick;
        }
        // Parse URL and open gallery if it contains #&pid=3&gid=1
        var hashData = photoswipeParseHash();
        if (hashData.pid && hashData.gid) {
            openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
        }
    };
}
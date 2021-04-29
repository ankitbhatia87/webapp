$.fn.carousel = function(param) {
    let _this = $(this);
    let leftArrow = $(this).siblings('.left-arrow'),
    rightArrow = $(this).siblings('.right-arrow');
    eventHandlers(_this, leftArrow, rightArrow);
    $(window).resize(function() {
        var windowWidth = $(this).outerWidth();
        slidesToShow(windowWidth, _this);
    });
    slidesToShow((param == 'full') ? 375 : $(window).outerWidth(), _this);    
}

function slidesToShow(windowWidth, _this) {
    if(windowWidth >= 375) {
        _this.children().removeClass('active');
        _this.children(':first-child').addClass('active');
    }
    if(windowWidth >= 768) {
        _this.children().removeClass('active');
        _this.children(':lt(2)').addClass('active');
    }
    if(windowWidth >= 992) {
        _this.children().removeClass('active');
        _this.children(':lt(3)').addClass('active');
    }
}

function eventHandlers(_this, leftArrow, rightArrow) {
    leftArrow.off().on('click', function(e) {
        e.preventDefault();
        var currentSlide = _this.find('.active');
        if(currentSlide.length > 1) {
            _this.children().eq(currentSlide.length-1).removeClass('active');
            let lastSlide = _this.children().last();
            let lastSlideClone = lastSlide.clone(true);
            lastSlideClone.addClass('active');
            _this.prepend(lastSlideClone);
            lastSlide.remove();
        }
        if(currentSlide.length === 1) {
            currentSlide.removeClass('active');
            var prevSlide = _this.children().eq(parseInt(_this.children().length)-1).clone(true);
            _this.children().eq(parseInt(_this.children().length)-1).remove();
            _this.prepend(prevSlide);
            currentSlide.prev().addClass('active');
        }
        
    });
    rightArrow.off().on('click', function(e) {
        e.preventDefault();
        var currentSlide = _this.find('.active');
        if(currentSlide.length > 1) {
            $(currentSlide[0]).removeClass('active');
            let currentSlideClone = $(currentSlide[0]).clone(true);
            _this.children().eq(currentSlide.length).addClass('active');
            $(currentSlide[0]).remove();
            _this.append(currentSlideClone);
        }
        if(currentSlide.length === 1) {
            let currentSlideClone = currentSlide.clone(true);
            currentSlide.next().addClass('active');
            currentSlide.remove();
            currentSlideClone.removeClass('active');
            _this.append(currentSlideClone);
        }
    });
}
(function ($) {
    $.fn.mySlider = function (options) {
        let config = $.extend({
            min: 0,
            max: 150,
            position: 'horizontal', //or vertical
            stepSize: 1,
        }, options);

        //Разметка слайдера
        (function () {
            if (config.position === 'horizontal') {
                $('#mySlider').append('<div><p class="result"></p></div>');
                $('#mySlider').append('<div id="sliderHor"><span class="ui-slider-hor" id="slider-span"></span></div>')
                $('p.result').html(config.min);
            } else if (config.position === 'vertical') {
                $('#mySlider').append('<div><p class="result"></p></div>');
                $('#mySlider').append('<div id="sliderVert"><span class="ui-slider-vert" id="slider-span"></span></div>')
                $('p.result').html(config.min);
            }

        }());

        //Горизонтальный слайдер
        function sliderHor () {
            let sliderSpan = $("#slider-span");
            let slider = $("#sliderHor");

            sliderSpan.on('mousedown', function (event) {
                let sliderCoords = getCoords(slider);
                let sliderSpanCoords = getCoords(sliderSpan);
                let shift = event.pageX - sliderSpanCoords.left;


                //Начнем движение ползунка
                $(document).on('mousemove', function (event) {
                    let left = ((event.pageX - shift - sliderCoords.left) / sliderCoords.width) * 100;
                    if (left < 0) left = 0;
                    if (left > 100) left = 100;

                    //Шаг слайдера
                    let stepCount = (config.max - config.min) / config.stepSize;
                    let stepPercent = 100 / stepCount;
                    let stepLeft = Math.round(left / stepPercent) * stepPercent;
                    if (stepLeft < 0) stepLeft = 0;
                    if (stepLeft > 100) stepLeft = 100;
                    sliderSpan.css({'left': stepLeft + '%'});

                    //Расчитаем значение равное шагу слайдера
                    let result = (((stepLeft / stepPercent) * config.stepSize).toFixed());
                    result = + result;
                    let values = result + + config.min;
                    console.log(typeof result)
                    $('p.result').html(values);
                })

                //Остановим движение ползунка
                $(document).on('mouseup', function () {
                    $(document).off('mousemove')
                })

                return false
            })

            // Найдем координаты
            function getCoords(elem) {
                let boxLeft = elem.offset().left;
                let boxRight = boxLeft + elem.outerWidth();

                return {
                    left: boxLeft + pageXOffset,
                    width: boxRight - boxLeft,
                };
            }
        }

        //Вертикальный слайдер
        function sliderVert () {
            let sliderSpan = $("#slider-span");
            let slider = $("#sliderVert");

            sliderSpan.on('mousedown', function (event) {
                let sliderCoords = getCoords(slider);
                let sliderSpanCoords = getCoords(sliderSpan);
                let shift = event.pageY - sliderSpanCoords.top;


                //Начнем движение ползунка
                $(document).on('mousemove', function (event) {
                    let top = ((event.pageY - shift - sliderCoords.top) / sliderCoords.height) * 100;
                    if (top < 0) top = 0;
                    if (top > 100) top = 100;
                    sliderSpan.css({'top': top + '%'});

                    //Шаг слайдера
                    let stepCount = (config.max - config.min) / config.stepSize;
                    let stepPercent = 100 / stepCount;
                    let stepTop = Math.round(top / stepPercent) * stepPercent;
                    if (stepTop < 0) stepTop = 0;
                    if (stepTop > 100) stepTop = 100;
                    sliderSpan.css({'top': stepTop + '%'});

                    //Расчитаем значение равное шагу слайдера
                    let result = (((stepTop / stepPercent) * config.stepSize).toFixed());
                    result = + result;
                    let values = result + + config.min;
                    console.log(typeof result)
                    $('p.result').html(values);
                })

                //Остановим движение ползунка
                $(document).on('mouseup', function () {
                    $(document).off('mousemove')
                })

                return false
            })

            // Найдем координаты
            function getCoords(elem) {
                let boxTop = elem.offset().top;
                let boxBottom = boxTop + elem.outerHeight();

                return {
                    top: boxTop + pageYOffset,
                    height: boxBottom - boxTop,
                };
            }
        }


        if (config.position === 'horizontal') {
            return this.each(sliderHor)
        } else if (config.position === 'vertical') {
            return this.each(sliderVert)
        }


    }
}(jQuery));


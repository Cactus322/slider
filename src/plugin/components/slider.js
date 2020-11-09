(function () {
    this.mySlider = function () {
        let config = {
            min: 0,
            max: 150,
            position: 'horizontal', //or vertical
            stepSize: 1,
        }

        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = extend(config, arguments[0]);
        }

        this.slider();
    }



    //Слайдер
    mySlider.prototype.slider = function () {
        let options = this.options;
        //Разметка слайдера
        let divResult = document.createElement('div');
        let pResult = document.createElement('p');
        let divSlider = document.createElement('div');
        let span = document.createElement('span');

        if (options.position === 'horizontal') {
            document.body.appendChild(divResult);
            divResult.id = 'sliderResult';

            document.getElementById(divResult.id).appendChild(pResult);
            pResult.className = 'result';
            pResult.innerHTML = options.min;

            document.body.appendChild(divSlider);
            divSlider.id = 'sliderHor';

            document.getElementById(divSlider.id).appendChild(span);
            span.id = 'slider-span';
            span.className = 'ui-slider-hor';
        } else if (options.position === 'vertical') {
            document.body.appendChild(divResult);
            divResult.id = 'sliderResult';

            document.getElementById(divResult.id).appendChild(pResult);
            pResult.className = 'result';
            pResult.innerHTML = options.min;

            document.body.appendChild(divSlider);
            divSlider.id = 'sliderVert';

            document.getElementById(divSlider.id).appendChild(span);
            span.id = 'slider-span';
            span.className = 'ui-slider-vert';
        } else {
            console.log('Error: unexpected slider "position"')
        }

        let sliderSpan = document.getElementById(span.id);
        let slider = document.getElementById(divSlider.id);

        sliderSpan.onmousedown = function(event) {
            let sliderCoords = getCoords(slider);
            let sliderSpanCoords = getCoords(sliderSpan);

            //Скрипт для горизотального или вертикального слайдера
            if (options.position === 'horizontal') {
                let shift = event.pageX - sliderSpanCoords.left;

                //Начнем движение ползунка
                document.onmousemove = function(event) {
                    let left =
                        ((event.pageX - shift - sliderCoords.left) / sliderCoords.width) * 100;
                    if (left < 0) left = 0;
                    if (left > 100) left = 100;
                    sliderSpan.style.left = left + "%";

                    //Шаг слайдера
                    let stepCount = (options.max - options.min) / options.stepSize;
                    let stepPercent = 100 / stepCount;
                    let stepLeft = Math.round(left / stepPercent) * stepPercent;
                    if (stepLeft < 0) stepLeft = 0;
                    if (stepLeft > 100) stepLeft = 100;
                    sliderSpan.style.left = stepLeft + '%';

                    //Расчитаем значение равное шагу слайдера
                    let result = (((stepLeft / stepPercent) * options.stepSize).toFixed());
                    result = + result;
                    let values = result + options.min;
                    document.getElementsByClassName(pResult.className)[0].innerHTML = values;
                };

            } else if (options.position === 'vertical') {
                let shift = event.pageY - sliderSpanCoords.bottom;

                //Начнем движение ползунка
                document.onmousemove = function (event) {
                    let bottom =
                        ((event.pageY - shift - sliderCoords.bottom) / sliderCoords.height) * 100;
                    if (bottom < 0) bottom = 0;
                    if (bottom > 100) bottom = 100;
                    sliderSpan.style.bottom = bottom + "%";

                    //Шаг слайдера
                    let stepCount = (options.max - options.min) / options.stepSize;
                    let stepPercent = 100 / stepCount;
                    let stepBottom = Math.round(bottom / stepPercent) * stepPercent;
                    if (stepBottom < 0) stepBottom = 0;
                    if (stepBottom > 100) stepBottom = 100;
                    sliderSpan.style.bottom = stepBottom + '%';

                    //Расчитаем значение равное шагу слайдера
                    let result = (((stepBottom / stepPercent) * options.stepSize).toFixed());
                    result = +result;
                    let values = result + options.min;
                    document.getElementsByClassName(pResult.className)[0].innerHTML = values;
                };
            }

            document.onmouseup = function() {
                document.onmousemove = document.onmouseup = null;
            };
            return false;
        };

        function getCoords(elem) {
            let box = elem.getBoundingClientRect();
            return {
                top: box.top + pageYOffset,
                bottom: box.bottom + pageYOffset,
                left: box.left + pageXOffset,
                width: box.right - box.left,
                height: box.top - box.bottom,
            };
        }
    }

    function extend (config, options) {
        let extended = {};
        let prop;
        for (prop in config) {
            if (Object.prototype.hasOwnProperty.call(config, prop)) {
                extended[prop] = config[prop];
            }
        }
        for (prop in options) {
            if (Object.prototype.hasOwnProperty.call(options, prop)) {
                extended[prop] = options[prop];
            }
        }

        return extended
    }

    console.log()
}())

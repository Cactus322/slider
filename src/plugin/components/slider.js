(function () {
    this.mySlider = function () {
        let config = {
            min: 0,
            max: 150,
            position: 'horizontal', //or vertical
            stepSize: 1,
            valueFromAbove: false,
        }

        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = extend(config, arguments[0]);
        }

        this.slider();
    }

    let nextId = 0; //колличество слайдеров, начиная с нулевого

    //Слайдер
    mySlider.prototype.slider = function () {
        let options = this.options;
        //Разметка слайдера
        let containerSlider = document.createElement('div');
        let divResult = document.createElement('div');
        let pResult = document.createElement('p');
        let divSlider = document.createElement('div');
        let span = document.createElement('span');
        let spanValue = document.createElement('span');

        if (document.getElementById('containerSliderHor-' + nextId)) {
            nextId++;
        }

        //Ошибка, если ID не найден
        if (options.id === undefined) {
            console.log('Error: Enter ID')
        }

        document.getElementById(options.id).appendChild(containerSlider);
        containerSlider.id = 'containerSliderHor-' + nextId;
        document.getElementById(containerSlider.id).appendChild(divResult);
        divResult.id = 'sliderResult-' + nextId;

        if (options.position === 'horizontal') {
            document.getElementById(divResult.id).appendChild(pResult);
            pResult.id = 'result-' + nextId;
            pResult.className = 'result';
            pResult.innerHTML = options.min;

            document.getElementById(containerSlider.id).appendChild(divSlider);
            divSlider.id = 'sliderHor-' + nextId;
            divSlider.className = 'slider-hor';

            document.getElementById(divSlider.id).appendChild(span);
            span.id = 'sliderSpan-' + nextId;
            span.className = 'ui-slider-hor';

            if (options.valueFromAbove === true) {
                document.getElementById(span.id).before(spanValue);
                spanValue.id = 'spanValue-' + nextId;
                spanValue.className = 'span-value-hor';
            }

        } else if (options.position === 'vertical') {
            document.getElementById(divResult.id).appendChild(pResult);
            pResult.id = 'result-' + nextId;
            pResult.className = 'result';
            pResult.innerHTML = options.min;

            document.getElementById(containerSlider.id).appendChild(divSlider);
            divSlider.id = 'sliderVert-' + nextId;
            divSlider.className = 'slider-vert';

            document.getElementById(divSlider.id).appendChild(span);
            span.id = 'sliderSpan';
            span.className = 'ui-slider-vert';

            if (options.valueFromAbove === true) {
                document.getElementById(span.id).before(spanValue);
                spanValue.id = 'spanValue-' + nextId;
                spanValue.className = 'span-value-vert';
            }

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
                    let left = ((event.pageX - shift - sliderCoords.left) / sliderCoords.width) * 100;
                    if (left < 0) left = 0;
                    if (left > 100) left = 100;

                    //Шаг слайдера
                    let stepCount = (options.max - options.min) / options.stepSize;
                    let stepPercent = 100 / stepCount;
                    let stepLeft = Math.round(left / stepPercent) * stepPercent;
                    if (stepLeft < 0) stepLeft = 0;
                    if (stepLeft > 100) stepLeft = 100;
                    sliderSpan.style.left = stepLeft + '%';
                    document.getElementById(spanValue.id).style.left = stepLeft + '%';

                    //Покажем значение слайдера над ним
                    if (options.valueFromAbove === true) {
                        document.getElementById(spanValue.id).style.visibility = 'visible';
                    }

                    //Расчитаем значение равное шагу слайдера
                    let result = (((stepLeft / stepPercent) * options.stepSize).toFixed());
                    result = + result;
                    let values = result + options.min;

                    document.getElementById(pResult.id).innerHTML = values;
                    document.getElementById(spanValue.id).innerHTML = values;
                };

            } else if (options.position === 'vertical') {
                let shift = event.pageY - sliderSpanCoords.bottom;

                //Начнем движение ползунка
                document.onmousemove = function (event) {
                    let bottom = ((event.pageY - shift - sliderCoords.bottom) / sliderCoords.height) * 100;
                    if (bottom < 0) bottom = 0;
                    if (bottom > 100) bottom = 100;

                    //Шаг слайдера
                    let stepCount = (options.max - options.min) / options.stepSize;
                    let stepPercent = 100 / stepCount;
                    let stepBottom = Math.round(bottom / stepPercent) * stepPercent;
                    if (stepBottom < 0) stepBottom = 0;
                    if (stepBottom > 100) stepBottom = 100;
                    sliderSpan.style.bottom = stepBottom + '%';
                    document.getElementById(spanValue.id).style.bottom = stepBottom + '%';

                    //Покажем значение слайдера над ним
                    if (options.valueFromAbove === true) {
                        document.getElementById(spanValue.id).style.visibility = 'visible';
                    }

                    //Расчитаем значение равное шагу слайдера
                    let result = (((stepBottom / stepPercent) * options.stepSize).toFixed());
                    result = +result;
                    let values = result + options.min;

                    document.getElementById(pResult.id).innerHTML = values;
                    document.getElementById(spanValue.id).innerHTML = values;
                };
            }

            //Остановим движение слайдера
            document.onmouseup = function() {
                document.onmousemove = document.onmouseup = null;

                //Уберем значение слайдера
                if (options.valueFromAbove === true) {
                    document.getElementById(spanValue.id).style.visibility = 'hidden';
                }
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
(function () {
    this.mySlider = function () {
        let config = {
            min: 0,
            max: 150,
            position: 'horizontal', //or vertical
            range: false,
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
        let first = options.min;
        let second = options.max;
            //Разметка слайдера
        let containerSlider = document.createElement('div');
        let divResult = document.createElement('div');
        let inputResult = document.createElement('input');
        let inputResultRange = document.createElement('input');
        let divSlider = document.createElement('div');
        let span = document.createElement('span');
        let spanRange = document.createElement('span');
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
            document.getElementById(divResult.id).appendChild(inputResult);
            inputResult.id = 'result-' + nextId;
            inputResult.className = 'result';
            inputResult.value = options.min;

            document.getElementById(containerSlider.id).appendChild(divSlider);
            divSlider.id = 'sliderHor-' + nextId;
            divSlider.className = 'slider-hor';

            document.getElementById(divSlider.id).appendChild(span);
            span.id = 'sliderSpan-' + nextId;
            span.className = 'ui-slider-hor';

            if (options.range === true) {
                document.getElementById(divResult.id).appendChild(inputResultRange);
                inputResultRange.id = 'resultRange-' + nextId;
                inputResultRange.className = 'result-range';
                inputResultRange.value = options.max;

                document.getElementById(divSlider.id).appendChild(spanRange);
                spanRange.id = 'sliderSpanRange-' + nextId;
                spanRange.className = 'ui-slider-hor range';
            }

            if (options.valueFromAbove === true) {
                document.getElementById(span.id).before(spanValue);
                spanValue.id = 'spanValue-' + nextId;
                spanValue.className = 'span-value-hor';
            }

        } else if (options.position === 'vertical') {
            document.getElementById(divResult.id).appendChild(inputResult);
            inputResult.id = 'result-' + nextId;
            inputResult.className = 'result';
            inputResult.value = options.min;

            document.getElementById(containerSlider.id).appendChild(divSlider);
            divSlider.id = 'sliderVert-' + nextId;
            divSlider.className = 'slider-vert';

            document.getElementById(divSlider.id).appendChild(span);
            span.id = 'sliderSpan';
            span.className = 'ui-slider-vert';

            if (options.range === true) {
                document.getElementById(divResult.id).appendChild(inputResultRange);
                inputResultRange.id = 'resultRange-' + nextId;
                inputResultRange.className = 'result-range';
                inputResultRange.value = options.max;

                document.getElementById(divSlider.id).appendChild(spanRange);
                spanRange.id = 'sliderSpanRange-' + nextId;
                spanRange.className = 'ui-slider-vert range';
            }

            if (options.valueFromAbove === true) {
                document.getElementById(span.id).before(spanValue);
                spanValue.id = 'spanValue-' + nextId;
                spanValue.className = 'span-value-vert';
            }

        } else {
            console.log('Error: unexpected slider "position"')
        }

        let sliderSpan = document.getElementById(span.id);
        let sliderSpanRange = document.getElementById(spanRange.id);
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
                    first = values;

                    if (first >= second) {
                        let stepPercent = 100 / (options.max - options.min);
                        let rangeValue = (second - options.min) * stepPercent;
                        sliderSpan.style.left = rangeValue + '%';
                        document.getElementById(spanValue.id).style.left = rangeValue + '%';
                        values = second
                        first = values;
                    }

                    document.getElementById(inputResult.id).value = values;
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
                    first = values;

                    if (first >= second) {
                        let stepPercent = 100 / (options.max - options.min);
                        let rangeValue = (second - options.min) * stepPercent;
                        sliderSpan.style.bottom = rangeValue + '%';
                        document.getElementById(spanValue.id).style.bottom = rangeValue + '%';
                        values = second
                        first = values;
                    }

                    document.getElementById(inputResult.id).value = values;
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

        if (options.range === true) {
            sliderSpanRange.onmousedown = function(event) {
                let sliderCoords = getCoords(slider);
                let sliderSpanCoords = getCoords(sliderSpanRange);

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

                        sliderSpanRange.style.left = stepLeft + '%';
                        document.getElementById(spanValue.id).style.left = stepLeft + '%';

                        //Покажем значение слайдера над ним
                        if (options.valueFromAbove === true) {
                            document.getElementById(spanValue.id).style.visibility = 'visible';
                        }

                        //Расчитаем значение равное шагу слайдера
                        let result = (((stepLeft / stepPercent) * options.stepSize).toFixed());
                        result = + result;
                        let values = result + options.min;
                        second = values;

                        if (second <= first) {
                            let stepPercent = 100 / (options.max - options.min);
                            let rangeValue = (first - options.min) * stepPercent;
                            sliderSpanRange.style.left = rangeValue + '%';
                            document.getElementById(spanValue.id).style.left = rangeValue + '%';
                            values = first;
                            second = values;
                        }

                        document.getElementById(inputResultRange.id).value = values;
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
                        sliderSpanRange.style.bottom = stepBottom + '%';
                        document.getElementById(spanValue.id).style.bottom = stepBottom + '%';

                        //Покажем значение слайдера над ним
                        if (options.valueFromAbove === true) {
                            document.getElementById(spanValue.id).style.visibility = 'visible';
                        }

                        //Расчитаем значение равное шагу слайдера
                        let result = (((stepBottom / stepPercent) * options.stepSize).toFixed());
                        result = +result;
                        let values = result + options.min;
                        second = values;

                        if (second <= first) {
                            let stepPercent = 100 / (options.max - options.min);
                            let rangeValue = (first - options.min) * stepPercent;
                            sliderSpanRange.style.bottom = rangeValue + '%';
                            document.getElementById(spanValue.id).style.bottom = rangeValue + '%';
                            values = first;
                            second = values;
                        }

                        document.getElementById(inputResultRange.id).value = values;
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
        }

        let input = document.getElementById(inputResult.id);
        let inputRange = document.getElementById(inputResultRange.id);

        // Изменение значения через input
        input.oninput = function () {
            if (input.value >= options.min && input.value <= options.max) {
                let stepPercent = 100 / (options.max - options.min);
                let inputValue = (input.value - options.min) * stepPercent;
                first = input.value;

                if (options.position === 'horizontal') {
                    sliderSpan.style.left = inputValue + '%';
                    if (first >= second) {
                        let inputValue = (second - options.min) * stepPercent;
                        sliderSpan.style.left = inputValue + '%';
                        document.getElementById(inputResult.id).value = second;
                        document.getElementById(spanValue.id).style.left = inputValue + '%';
                    }
                } else if (options.position === 'vertical') {
                    sliderSpan.style.bottom = inputValue + '%';
                    if (first >= second) {
                        let inputValue = (second - options.min) * stepPercent;
                        sliderSpan.style.bottom = inputValue + '%';
                        document.getElementById(inputResult.id).value = second;
                        document.getElementById(spanValue.id).style.left = inputValue + '%';
                    }
                }
            }
        }


        inputRange.oninput = function () {
            if (inputRange.value >= options.min && inputRange.value <= options.max) {
                let stepPercent = 100 / (options.max - options.min);
                let inputValue = (inputRange.value - options.min) * stepPercent;
                second = inputRange.value;

                if (options.position === 'horizontal') {
                    sliderSpanRange.style.left = inputValue + '%';
                    if (second <= first) {
                        inputValue = (first - options.min) * stepPercent;
                        sliderSpanRange.style.left = inputValue + '%';
                        document.getElementById(inputResultRange.id).value = first;
                        document.getElementById(spanValue.id).style.bottom = inputValue + '%';
                    }
                } else if (options.position === 'vertical') {
                    sliderSpanRange.style.bottom = inputValue + '%';
                    if (second <= first) {
                        inputValue = (first - options.min) * stepPercent;
                        sliderSpanRange.style.bottom = inputValue + '%';
                        document.getElementById(inputResultRange.id).value = first;
                        document.getElementById(spanValue.id).style.bottom = inputValue + '%';
                    }
                }
            }
        }



        function getCoords(elem) {
            let box = elem.getBoundingClientRect();
            return {
                top: box.top + pageYOffset,
                bottom: box.bottom + pageYOffset,
                left: box.left + pageXOffset,
                right: box.right + pageXOffset,
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
}())
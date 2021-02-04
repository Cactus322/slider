(function () {
    this.mySlider = function () {
        let config = {
            min: 0,
            max: 150,
            position: 'horizontal', //or vertical
            range: false,
            stepSize: 1,
            valueFromAbove: false,
            scale: false,
            mark: 0,
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
        let stepFirst = 0;
        let stepSecond = 100;

        //Разметка слайдера
        let containerSlider = document.createElement('div');
        let divResult = document.createElement('div');
        let scaleOfValues = document.createElement('div');
        let inputResult = document.createElement('input');
        let inputResultRange = document.createElement('input');
        let divSlider = document.createElement('div');
        let span = document.createElement('span');
        let spanRange = document.createElement('span');
        let spanValue = document.createElement('span');

        if (document.getElementById('containerSlider-' + nextId)) {
            nextId++;
        }

        //Ошибка, если ID не найден
        if (options.id === undefined) {
            console.log('Error: Enter ID')
        }

        document.getElementById(options.id).append(containerSlider);
        containerSlider.id = 'containerSlider-' + nextId;
        document.getElementById(containerSlider.id).append(divResult);
        divResult.id = 'sliderResult-' + nextId;

        if (options.position === 'horizontal') {
            document.getElementById(divResult.id).append(inputResult);
            inputResult.id = 'result-' + nextId;
            inputResult.className = 'result';
            inputResult.value = options.min;

            document.getElementById(containerSlider.id).append(divSlider);
            divSlider.id = 'sliderHor-' + nextId;
            divSlider.className = 'slider-hor';

            document.getElementById(divSlider.id).append(span);
            span.id = 'sliderSpan-' + nextId;
            span.className = 'ui-slider-hor';

            //Шкала значений под слайдером
            if (options.scale === true) {
                document.getElementById(containerSlider.id).append(scaleOfValues);
                scaleOfValues.id = 'scaleOfValues-' + nextId;
                scaleOfValues.className = 'scale-hor';

                for (let i = 0; i < 51; i++) {
                    let mark = document.createElement('div');
                    document.getElementById(scaleOfValues.id).appendChild(mark);
                    mark.id = 'mark-' + nextId + '-' + i;
                    mark.style.paddingLeft = 1 + 'px';
                    if (i != 0) {
                        mark.style.marginLeft = 1.75 + '%';
                    }
                    if (i % 5 === 0) {
                        mark.className = 'mark-main';
                    } else {
                        mark.className = 'mark-second';
                    }

                    mark.onclick = function (event) {
                        let position = i * 2;
                        if (options.range === false) {
                            if (options.stepSize === 1) {
                                document.getElementById(span.id).style.left = position + '%';
                                document.getElementById(sliderSpan.id).style.left = position + '%';
                                slider.style.background = 'linear-gradient(90deg , #6c00fa ' + position + '%, white ' + position + '%)';

                                document.getElementById(inputResult.id).value = (((options.max - options.min) / 100) * position) + options.min;
                            } else {
                                let stepCount = (options.max - options.min) / options.stepSize;
                                let stepPercent = 100 / stepCount;
                                let stepLeft = Math.round(position / stepPercent) * stepPercent;
                                document.getElementById(span.id).style.left = stepLeft + '%';
                                document.getElementById(sliderSpan.id).style.left = stepLeft + '%';
                                slider.style.background = 'linear-gradient(90deg , #6c00fa ' + stepLeft + '%, white ' + stepLeft + '%)';

                                document.getElementById(inputResult.id).value = (((options.max - options.min) / 100) * position) + options.min;
                                // сделаем число кратным stepSize
                                if ((document.getElementById(inputResult.id).value = (((options.max - options.min) / 100) * position) + options.min) % options.stepSize !== 0) {
                                    let stepSizeValue = document.getElementById(inputResult.id).value;
                                    let remainderValue = stepSizeValue % options.stepSize;

                                    //увеличение вверх и вниз
                                    if (remainderValue > (options.stepSize / 2)) {
                                        remainderValue = options.stepSize - remainderValue;
                                        document.getElementById(inputResult.id).value = Number(stepSizeValue) + remainderValue
                                    } else {
                                        document.getElementById(inputResult.id).value = Number(stepSizeValue) - remainderValue
                                    }
                                }
                            }

                        }
                    }
                }
            }

            if (options.range === true) {
                document.getElementById(divResult.id).append(inputResultRange);
                inputResultRange.id = 'resultRange-' + nextId;
                inputResultRange.className = 'result-range';
                inputResultRange.value = options.max;

                document.getElementById(divSlider.id).append(spanRange);
                spanRange.id = 'sliderSpanRange-' + nextId;
                spanRange.className = 'ui-slider-hor range';
            }

            if (options.valueFromAbove === true) {
                document.getElementById(span.id).before(spanValue);
                spanValue.id = 'spanValue-' + nextId;
                spanValue.className = 'span-value-hor';
            }

        } else if (options.position === 'vertical') {
            document.getElementById(divResult.id).append(inputResult);
            inputResult.id = 'result-' + nextId;
            inputResult.className = 'result';
            inputResult.value = options.min;

            document.getElementById(containerSlider.id).append(divSlider);
            divSlider.id = 'sliderVert-' + nextId;
            divSlider.className = 'slider-vert';

            document.getElementById(divSlider.id).append(span);
            span.id = 'sliderSpan';
            span.className = 'ui-slider-vert';

            //Шкала значений под слайдером
            if (options.scale === true) {
                document.getElementById(divSlider.id).append(scaleOfValues);
                scaleOfValues.id = 'scaleOfValues-' + nextId;
                scaleOfValues.className = 'scale-vert';

                for (let i = 0; i < 51; i++) {
                    let mark = document.createElement('div');
                    document.getElementById(scaleOfValues.id).appendChild(mark);
                    mark.id = 'mark-' + nextId + '-' + i;
                    mark.style.paddingTop = 1 + 'px';
                    if (i % 5 === 0) {
                        mark.className = 'mark-main-vert';
                    } else {
                        mark.className = 'mark-second-vert';
                    }

                    mark.onclick = function (event) {
                        let position = 100 - i * 2;
                        if (options.range === false) {

                            if (options.stepSize === 1) {
                                document.getElementById(span.id).style.bottom = position + '%';
                                document.getElementById(sliderSpan.id).style.bottom = position + '%';
                                slider.style.background = 'linear-gradient(0deg , #6c00fa ' + position + '%, white ' + position + '%)';

                                document.getElementById(inputResult.id).value = (((options.max - options.min) / 100) * position) + options.min;
                            } else {
                                let stepCount = (options.max - options.min) / options.stepSize;
                                let stepPercent = 100 / stepCount;
                                let stepBottom = Math.round(position / stepPercent) * stepPercent;
                                document.getElementById(span.id).style.bottom = stepBottom + '%';
                                document.getElementById(sliderSpan.id).style.bottom = stepBottom + '%';
                                slider.style.background = 'linear-gradient(0deg , #6c00fa ' + stepBottom + '%, white ' + stepBottom + '%)';

                                document.getElementById(inputResult.id).value = (((options.max - options.min) / 100) * position) + options.min;
                                // сделаем число кратным stepSize
                                if ((document.getElementById(inputResult.id).value = (((options.max - options.min) / 100) * position) + options.min) % options.stepSize !== 0) {
                                    let stepSizeValue = document.getElementById(inputResult.id).value;
                                    let remainderValue = stepSizeValue % options.stepSize;

                                    //увеличение вверх и вниз
                                    if (remainderValue > (options.stepSize / 2)) {
                                        remainderValue = options.stepSize - remainderValue;
                                        document.getElementById(inputResult.id).value = Number(stepSizeValue) + remainderValue
                                    } else {
                                        document.getElementById(inputResult.id).value = Number(stepSizeValue) - remainderValue
                                    }
                                }
                            }

                        }
                    }
                }
            }

            if (options.range === true) {
                document.getElementById(divResult.id).append(inputResultRange);
                inputResultRange.id = 'resultRange-' + nextId;
                inputResultRange.className = 'result-range';
                inputResultRange.value = options.max;

                document.getElementById(divSlider.id).append(spanRange);
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

        if (options.range === true) {
            if (options.position === 'horizontal') {
                slider.style.background = 'linear-gradient(90deg, white ' + stepFirst + '%, #6c00fa ' + stepFirst + '%, #6c00fa ' + stepSecond + '%, white ' + stepSecond + '%)';
            } else if (options.position === 'vertical') {
                slider.style.background = 'linear-gradient(0deg, white ' + stepFirst + '%, #6c00fa ' + stepFirst + '%, #6c00fa ' + stepSecond + '%, white ' + stepSecond + '%)';
            }
        }

        sliderSpan.onmousedown = function(event) {
            let sliderCoords = getCoords(slider);
            let sliderSpanCoords = getCoords(sliderSpan);

            //Скрипт для горизотального или вертикального слайдера
            if (options.position === 'horizontal') {
                let shift = event.pageX - sliderSpanCoords.left;

                //Начнем движение ползунка
                document.onmousemove = function(event) {
                    let left = ((event.pageX - shift - sliderCoords.left + 10) / sliderCoords.width) * 100;
                    if (left < 0) left = 0;
                    if (left > 100) left = 100;

                    //Шаг слайдера
                    let stepCount = (options.max - options.min) / options.stepSize;
                    let stepPercent = 100 / stepCount;
                    let stepLeft = Math.round(left / stepPercent) * stepPercent;
                    if (stepLeft < 0) stepLeft = 0;
                    if (stepLeft > 100) stepLeft = 100;
                    sliderSpan.style.left = stepLeft + '%';
                    stepFirst = stepLeft;
                    if (options.range === false) {
                        slider.style.background = 'linear-gradient(90deg , #6c00fa ' + stepLeft + '%, white ' + stepLeft + '%)';
                    } else if (options.range === true) {
                        slider.style.background = 'linear-gradient(90deg, white ' + stepFirst + '%, #6c00fa ' + stepFirst + '%, #6c00fa ' + stepSecond + '%, white ' + stepSecond + '%)';
                    }
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
                    stepFirst = stepBottom;
                    if (options.range === false) {
                        slider.style.background = 'linear-gradient(0deg , #6c00fa ' + stepBottom + '%, white ' + stepBottom + '%)';
                    } else if (options.range === true) {
                        slider.style.background = 'linear-gradient(0deg, white ' + stepFirst + '%, #6c00fa ' + stepFirst + '%, #6c00fa ' + stepSecond + '%, white ' + stepSecond + '%)';
                    }

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
                        let left = ((event.pageX - shift - sliderCoords.left + 10) / sliderCoords.width) * 100;
                        if (left < 0) left = 0;
                        if (left > 100) left = 100;

                        //Шаг слайдера
                        let stepCount = (options.max - options.min) / options.stepSize;
                        let stepPercent = 100 / stepCount;
                        let stepLeft = Math.round(left / stepPercent) * stepPercent;
                        if (stepLeft < 0) stepLeft = 0;
                        if (stepLeft > 100) stepLeft = 100;
                        stepSecond = stepLeft;
                        sliderSpanRange.style.left = stepLeft + '%';
                        slider.style.background = 'linear-gradient(90deg, white ' + stepFirst + '%, #6c00fa ' + stepFirst + '%, #6c00fa ' + stepSecond + '%, white ' + stepSecond + '%)';
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
                        stepSecond = stepBottom;
                        sliderSpanRange.style.bottom = stepBottom + '%';
                        slider.style.background = 'linear-gradient(0deg, white ' + stepFirst + '%, #6c00fa ' + stepFirst + '%, #6c00fa ' + stepSecond + '%, white ' + stepSecond + '%)';
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
        if (options.range === true) {
            input.oninput = function () {
                if (input.value >= options.min && input.value <= options.max) {
                    let stepPercent = 100 / (options.max - options.min);
                    let inputValue = (input.value - options.min) * stepPercent;
                    first = input.value;
                    stepFirst = inputValue;

                    //функция невозможности перехода левого слайдера за правый слайдер
                    function rangeValueCheck() {
                        if (options.position === 'horizontal') {
                            if (first >= second) {
                                let inputValue = (second - options.min) * stepPercent;
                                sliderSpan.style.left = inputValue + '%';
                                document.getElementById(inputResult.id).value = second;
                                document.getElementById(spanValue.id).style.left = inputValue + '%';
                                first = second;
                            }
                        } else if (options.position === 'vertical') {
                            if (first >= second) {
                                let inputValue = (second - options.min) * stepPercent;
                                sliderSpan.style.bottom = inputValue + '%';
                                document.getElementById(inputResult.id).value = second;
                                document.getElementById(spanValue.id).style.bottom = inputValue + '%';
                                first = second;
                            }
                        }
                    }

                    if (options.position === 'horizontal') {
                        slider.style.background = 'linear-gradient(90deg, white ' + stepFirst + '%, #6c00fa ' + stepFirst + '%, #6c00fa ' + stepSecond + '%, white ' + stepSecond + '%)';
                        sliderSpan.style.left = inputValue + '%';

                        setTimeout(rangeValueCheck, 500);

                    } else if (options.position === 'vertical') {
                        slider.style.background = 'linear-gradient(0deg, white ' + stepFirst + '%, #6c00fa ' + stepFirst + '%, #6c00fa ' + stepSecond + '%, white ' + stepSecond + '%)';
                        sliderSpan.style.bottom = inputValue + '%';

                        setTimeout(rangeValueCheck, 500);

                    }
                } else if (input.value < options.min) {
                    setTimeout(() => input.value = options.min, 500);
                    stepFirst = options.min;
                    first = input.value;

                    if (options.position === 'horizontal') {
                        slider.style.background = 'linear-gradient(90deg, #6c00fa ' + stepFirst + '%, white ' + stepFirst + '%)';
                        sliderSpan.style.left = 0 + '%';
                    } else if (options.position === 'vertical') {
                        slider.style.background = 'linear-gradient(0deg, #6c00fa ' + stepFirst + '%, white ' + stepFirst + '%)';
                        sliderSpan.style.bottom = 0 + '%';
                    }
                } else if (input.value > options.max) {
                    setTimeout(() => input.value = inputRange.value, 500);
                    let stepPercent = 100 / (options.max - options.min);
                    let inputValue = (inputRange.value) * stepPercent;
                    second = inputRange.value;
                    stepSecond = inputValue;

                    if (options.position === 'horizontal') {
                        slider.style.background = 'linear-gradient(90deg, #6c00fa ' + stepFirst + '%, white ' + stepFirst + '%)';
                        sliderSpan.style.left = inputRange.value + '%';
                    } else if (options.position === 'vertical') {
                        slider.style.background = 'linear-gradient(0deg, #6c00fa ' + stepFirst + '%, white ' + stepFirst + '%)';
                        sliderSpan.style.bottom = inputRange.value + '%';
                    }
                }
            }
            inputRange.oninput = function () {
                if (inputRange.value >= options.min && inputRange.value <= options.max) {
                    let stepPercent = 100 / (options.max - options.min);
                    let inputValue = (inputRange.value - options.min) * stepPercent;
                    second = inputRange.value;
                    stepSecond = inputValue;

                    //функция невозможности перехода правого слайдера за левый слайдер
                    function rangeValueCheck() {
                        if (options.position === 'horizontal') {
                            if (second <= first) {
                                inputValue = (first - options.min) * stepPercent;
                                sliderSpanRange.style.left = inputValue + '%';
                                document.getElementById(inputResultRange.id).value = first;
                                document.getElementById(spanValue.id).style.left = inputValue + '%';
                                second = first;
                            }
                        } else if (options.position === 'vertical') {
                            if (second <= first) {
                                inputValue = (first - options.min) * stepPercent;
                                sliderSpanRange.style.bottom = inputValue + '%';
                                document.getElementById(inputResultRange.id).value = first;
                                document.getElementById(spanValue.id).style.bottom = inputValue + '%';
                                second = first;
                            }
                        }
                    }

                    if (options.position === 'horizontal') {
                        slider.style.background = 'linear-gradient(90deg, white ' + stepFirst + '%, #6c00fa ' + stepFirst + '%, #6c00fa ' + stepSecond + '%, white ' + stepSecond + '%)';
                        sliderSpanRange.style.left = inputValue + '%';

                        setTimeout(rangeValueCheck, 500);


                    } else if (options.position === 'vertical') {
                        slider.style.background = 'linear-gradient(0deg, white ' + stepFirst + '%, #6c00fa ' + stepFirst + '%, #6c00fa ' + stepSecond + '%, white ' + stepSecond + '%)';
                        sliderSpanRange.style.bottom = inputValue + '%';

                        setTimeout(rangeValueCheck, 500);
                    }
                } else if (inputRange.value < options.min) {
                    setTimeout(() => inputRange.value = input.value, 500);
                    let stepPercent = 100 / (options.max - options.min);
                    let inputValue = (input.value) * stepPercent;
                    second = input.value;
                    stepSecond = inputValue;

                    if (options.position === 'horizontal') {
                        slider.style.background = 'linear-gradient(90deg, white ' + stepFirst + '%, #6c00fa ' + stepFirst + '%, #6c00fa ' + stepSecond + '%, white ' + stepSecond + '%)';
                        sliderSpanRange.style.left = inputValue + '%';
                    } else if (options.position === 'vertical') {
                        slider.style.background = 'linear-gradient(0deg, white ' + stepFirst + '%, #6c00fa ' + stepFirst + '%, #6c00fa ' + stepSecond + '%, white ' + stepSecond + '%)';
                        sliderSpanRange.style.bottom = inputValue + '%';
                    }
                } else if (inputRange.value > options.max) {
                    setTimeout(() => inputRange.value = options.max, 500);
                    stepSecond = options.max;
                    second = options.max;

                    if (options.position === 'horizontal') {
                        slider.style.background = 'linear-gradient(90deg, white ' + stepFirst + '%, #6c00fa ' + stepFirst + '%, #6c00fa ' + stepSecond + '%, white ' + stepSecond + '%)';
                        sliderSpanRange.style.left = 100 + '%';
                    } else if (options.position === 'vertical') {
                        slider.style.background = 'linear-gradient(0deg, white ' + stepFirst + '%, #6c00fa ' + stepFirst + '%, #6c00fa ' + stepSecond + '%, white ' + stepSecond + '%)';
                        sliderSpanRange.style.bottom = 100 + '%';
                    }
                }
            }
        } else if (options.range === false) {
            input.oninput = function () {
                if (input.value >= options.min && input.value <= options.max) {
                    let stepPercent = 100 / (options.max - options.min);
                    let inputValue = (input.value - options.min) * stepPercent;
                    stepFirst = inputValue;
                    first = input.value;

                    if (options.position === 'horizontal') {
                        slider.style.background = 'linear-gradient(90deg, #6c00fa ' + stepFirst + '%, white ' + stepFirst + '%)';
                        sliderSpan.style.left = inputValue + '%';
                    } else if (options.position === 'vertical') {
                        slider.style.background = 'linear-gradient(0deg, #6c00fa ' + stepFirst + '%, white ' + stepFirst + '%)';
                        sliderSpan.style.bottom = inputValue + '%';
                    }
                } else if (input.value < options.min) {
                    setTimeout(() => input.value = options.min, 500);
                    stepFirst = options.min;
                    first = input.value;

                    if (options.position === 'horizontal') {
                        slider.style.background = 'linear-gradient(90deg, #6c00fa ' + stepFirst + '%, white ' + stepFirst + '%)';
                        sliderSpan.style.left = 0 + '%';
                    } else if (options.position === 'vertical') {
                        slider.style.background = 'linear-gradient(0deg, #6c00fa ' + stepFirst + '%, white ' + stepFirst + '%)';
                        sliderSpan.style.bottom = 0 + '%';
                    }
                } else if (input.value > options.max) {
                    setTimeout(() => input.value = options.max, 500);
                    stepFirst = options.max;
                    first = input.value;

                    if (options.position === 'horizontal') {
                        slider.style.background = 'linear-gradient(90deg, #6c00fa ' + stepFirst + '%, white ' + stepFirst + '%)';
                        sliderSpan.style.left = 100 + '%';
                    } else if (options.position === 'vertical') {
                        slider.style.background = 'linear-gradient(0deg, #6c00fa ' + stepFirst + '%, white ' + stepFirst + '%)';
                        sliderSpan.style.bottom = 100 + '%';
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
import { Slider, SliderWithTimer } from '/js/slider.js';

let a = new Slider({
  'main': '.pets-in-zoo__slider',
  'wrap': '.pets-in-zoo__slider .slider__inner-wrapper',
  'prev': '.pets-in-zoo__slider .slider__button--prev',
  'next': '.pets-in-zoo__slider .slider__button--next'
});

let b = new SliderWithTimer({
  'main': '.testimonials__slider',
  'wrap': '.testimonials__slider .slider__inner-wrapper',
  'prev': '.testimonials__slider .slider__button--prev',
  'next': '.testimonials__slider .slider__button--next',
  'timerInterval': 15000,
  'timerStopDuration': 60000,
});
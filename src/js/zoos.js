import { Slider } from '../js/slider.js';
import { runSidebarPanel } from '../js/sidebar-panel.js';


new Slider({
  'main': '.zoos__cameras',
  'wrap': '.zoos__cameras .slider__inner-wrapper',
  'prev': '.zoos__cameras .slider__button--prev',
  'next': '.zoos__cameras .slider__button--next',
  'fixed': true,
});
new Slider({
  'main': '.sidebar__list ',
  'wrap': '.sidebar__list .slider__inner-wrapper',
  'next': '.sidebar__bottom',
  'fixed': false,
  'moveDirection': 'Y',
});

runSidebarPanel();

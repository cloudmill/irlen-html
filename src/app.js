import 'Styles/_app.scss';

import 'scripts/swipers.js';
import 'scripts/accordion.js';
import 'scripts/fancybox.js';
import 'scripts/tooltip.js';
import 'scripts/select.js';
import 'scripts/aside.js';
import 'scripts/crop-text.js';
import 'scripts/login.js';
import 'scripts/header.js';
import 'scripts/show-more.js';
import 'scripts/parsley.js';
import 'scripts/anchor-links.js';
import 'scripts/search.js';
import 'scripts/map.js';
import 'scripts/multi-checkbox-select.js';
import 'scripts/no-transition.js';
import 'scripts/form-response.js';
import 'scripts/tabs'
import 'scripts/real-tabs'
import { FormChanger } from 'scripts/form-changer'
import { Counter } from 'scripts/counter'
import { MobileMenu } from 'scripts/mobile-menu/mobile-menu'
import { FiltersMenu } from 'scripts/mobile-menu/filters-menu'
import mask from "inputmask";

$(() => {
  require("scripts/backend");

  const formChanger = new FormChanger()
  const headerMenu = new MobileMenu('.header', '.header__menu')
  const filtersMenu = new FiltersMenu('[data-filters-menu]', '[data-filters-button]')
  const counters = document.querySelectorAll('.counter')

  counters.forEach(item => {
    const counter = new Counter(item)
  })
  
  Inputmask({ mask: "+7 (999) 999-9999", showMaskOnHover: false }).mask("[data-mask=phone]");
})
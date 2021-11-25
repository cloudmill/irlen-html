import 'Styles/_app.scss';

import 'scripts/swipers.js';
import 'scripts/accordion.js';
import 'scripts/fancybox.js';
import 'scripts/tooltip.js';
import 'scripts/select.js';
import 'scripts/aside.js';
import 'scripts/range-slider.js';
import 'scripts/form-response.js';
import { FormChanger } from 'scripts/form-changer'
import { Tabs } from 'scripts/tabs'
import { Counter } from 'scripts/counter'

$(() => {
  const formChanger = new FormChanger()
  const tabsList = document.querySelectorAll('[data-tabs]')

  tabsList.forEach(item => {
    const tabs = new Tabs(item)
  })

  const realTabs = document.querySelectorAll('[data-real-tabs]')

  realTabs.forEach(item => {
    const tabs = new Tabs(item, true)
  })

  const counters = document.querySelectorAll('.counter')

  counters.forEach(item => {
    const counter = new Counter(item)
  })
  // console.log(inputs.value);
})
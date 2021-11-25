import 'Styles/_app.scss';

import 'scripts/swipers.js';
import 'scripts/accordion.js';
import 'scripts/fancybox.js';
import 'scripts/tooltip.js';
import 'scripts/select.js';
import 'scripts/form-response.js';
import { FormChanger } from 'scripts/form-changer'
import { Tabs } from 'scripts/tabs'

$(() => {
  const formChanger = new FormChanger()
  const tabs = new Tabs('[data-tabs]')
  // console.log(inputs.value);
})
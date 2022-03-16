"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormChanger = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FormChanger =
/*#__PURE__*/
function () {
  function FormChanger() {
    _classCallCheck(this, FormChanger);

    this.changeButton = document.querySelector('[data-change-button]');

    if (this.changeButton) {
      this.form = this.changeButton.closest('[data-form]');
      this.clickHandler();
    }
  }

  _createClass(FormChanger, [{
    key: "clickHandler",
    value: function clickHandler() {
      var _this = this;

      window.addEventListener('click', function (e) {
        var target = e.target;

        if (target.closest('[data-change-button]')) {
          _this.cacheValues();

          _this.form.classList.toggle('form--disabled');
        }

        if (target.closest('[data-save-button]')) {
          _this.form.classList.toggle('form--disabled');
        }

        if (target.closest('[data-cancel-button]')) {
          _this.cancelChanges();
        }
      });
    }
  }, {
    key: "cacheValues",
    value: function cacheValues() {
      var _this2 = this;

      this.inputs = this.form.querySelectorAll('.form__input');
      this.values = [];
      this.inputs.forEach(function (item) {
        _this2.values.push(item.value);
      });
    }
  }, {
    key: "cancelChanges",
    value: function cancelChanges() {
      this.form.classList.add('form--disabled');

      for (var i = 0; i < this.values.length; i++) {
        this.inputs[i].value = this.values[i];
      }
    }
  }]);

  return FormChanger;
}();

exports.FormChanger = FormChanger;
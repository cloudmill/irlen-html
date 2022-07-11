import "parsleyjs";
import {customSelect2} from './select';
import {selectHandler, aside} from "./aside";

$(function () {
    filterReset();
    pagen();
    filter();
    showMore();
    snippetSlider();
    forms();
    logout();
    filterChange();
    add2basket();
    basketAction();
    changeDeliveryType();
    changeUserType();
    tabDocFile();
});

function ajaxCallbackErrors(xhr) {
    alert(`error: ${xhr.status}: ${xhr.statusText}`);
}

window.addEventListener('clearFilters', function() {
    filters($('[data-container=filters]'));
});

window.filterChangeSuccess = function(domObjects, response) {
    const linkContainer = $(domObjects.linkContainer);

    domObjects.preloader.addClass('preloader_hidden');
    domObjects.container.find('.aside__error, .hidden').addClass('hidden');
    linkContainer.empty();
    linkContainer.append(response.find(domObjects.linkContainer).children());

    const enableStyle = {
            'opacity': 1,
            'pointer-events': 'auto',
        },
        disableStyle = {
            'opacity': 0.5,
            'pointer-events': 'none',
        };

    let index = 0;
    domObjects.container.children().each(function () {
        const filterBody = $(this).find('[data-type=filter-body]'),
            filterItemResponse = response.find('[data-link-container]').children().eq(index);

        if ($(this).find('[data-type=filter-name]').text() !== filterItemResponse.find('[data-type=filter-name]').text()) {
            filterBody.css(disableStyle);
            filterBody.find('[data-active]').css(disableStyle);
        } else {
            if ($(this).find('select').length) {
                $(this).find('[data-select-get-field]').each(function() {
                    const arr = filterItemResponse.find('[data-select-get-field] option').map((arrI, item) => item.value);

                    compareValues($(this), 'option', {'item':'thisElem', 'action': 'select'}, arr);
                });
            } else {
                const arr = filterItemResponse.find('[data-type=filter]').map((arrI, item) => item.value);

                filterBody.css(enableStyle);
                compareValues(filterBody, '[data-type=filter]', {'item':'parent', 'action': 'main'}, arr);
            }

            index++;
        }
    });
}

window.findElem = {
    parent: elem => elem.parents('[data-type=filter-item]'),
    thisElem: elem => elem,
}

window.elemStyles = {
    main: (elem, enable) => {
        if (enable) {
            elem.css({
                'opacity': 1,
                'pointer-events': 'auto',
            });
            elem.attr('data-active', true);
        } else {
            elem.css({
                'opacity': 0.5,
                'pointer-events': 'none',
            });
        }
    },
    select: (elem, enable) => {
        if (enable) {
            elem.removeAttr('disabled');
        } else {
            elem.attr('disabled', true);
        }
    }
}

function compareValues(container, itemsSelector, actions, data) {
    container.find(itemsSelector).each(function () {
        const itemElem = window.findElem[actions.item]($(this));

        if (Object.values(data).includes($(this).val())) {
            window.elemStyles[actions.action](itemElem, true);
        } else {
            window.elemStyles[actions.action](itemElem, false);
        }
    });
}

function filterReset() {
    $(document).on('click', '[data-type=filter-reset]', function() {
        const container = $(this).parents('[data-container=filters]'),
            preloader = $('.preloader');

        preloader.removeClass('preloader_hidden');

        $.ajax({
            type: 'GET',
            url: window.location.href,
            dataType: 'html',
            data: {
                ajax: 'filter',
            },
            success: function (r) {
                container.empty();
                container.append($(r).find('[data-container=filters]').children());

                customSelect2(container.find('.select__select'));
                selectHandler();
                aside();

                window['filterChangeSuccess'](
                    {
                        container: container,
                        linkContainer: container.data('link-container'),
                        preloader: preloader,
                    },
                    $(r)
                );
            },
            error: ajaxCallbackErrors,
        });
    });
}

function pagen() {
    $(document).on('click', '[data-type=pagen]', function () {
        const container = $(this).parents('[data-container=parent-items]'),
            itemsContainer = container.find('[data-container=items]'),
            pageNav = $(this).parents('[data-container=page-nav]'),
            preloader = $('.preloader');

        preloader.removeClass('preloader_hidden');

        $.ajax({
            type: 'GET',
            url: $(this).data('url'),
            dataType: 'html',
            data: {
                ajax: 'pagen',
            },
            success: function (r) {
                preloader.addClass('preloader_hidden');
                pageNav.remove();
                itemsContainer.append($(r).find('[data-container=items]').children());
                container.find('[data-type=append-page-nav]').after($(r).find('[data-container=page-nav]'));
            },
            error: ajaxCallbackErrors,
        });
    });
}

function filters(container) {
    const preloader = $('.preloader'),
        data = getDataForm(container);

    data['ajax'] = 'filter';

    preloader.removeClass('preloader_hidden');

    $.ajax({
        type: 'GET',
        url: window.location.href,
        dataType: 'html',
        data: data,
        success: function (r) {
            const linkContainer = container.data('link-container'),
                response = $(r).find(linkContainer).find('[data-container=items]').children().length;

            if (response) {
                window['filterChangeSuccess'](
                    {
                        container: container,
                        linkContainer: linkContainer,
                        preloader: preloader,
                    },
                    $(r)
                );
            } else {
                container.find('[data-type=error-text]').removeClass('hidden');
                preloader.addClass('preloader_hidden');
            }
        },
        error: ajaxCallbackErrors,
    });
}

$(document).on('change', '[data-type=filter]', function() {
    filters($(this).parents('[data-container=filters]'));
});

function getDataForm(form) {
    const data = {
        'filter': {},
    };

    window.getValue.values = {};

    form.find('[data-get-field], input:checked').each(function () {
        if (!$(this).val()) {
            return;
        }

        const thisField = $(this).data('filter-field'),
            field = thisField ? thisField : $(this).parents('[data-filter-field]').data('filter-field');

        if (thisField === '') {
            return;
        }

        const initFunc = $(this).data('init-func');

        try {
            data['filter'][field] = window.getValue[initFunc]($(this), field, $(this).data('equality'));
        } catch (e) {
            console.log('У элемента не установлен атрибут init-func', e.message);
        }
    });

    return data;
}

window.getValue = {
    one: elem => {
        return {
            equality: '=',
            value: elem.val(),
        }
    },
    many: function(elem, field, equality) {
        if (!this.values[field]) {
            this.values[field] = {
                equality: equality,
                value: {},
            };
        }

        this.values[field].value[elem.data('key')] = elem.val();

        return this.values[field];
    },
}

function changeDeliveryType() {
    $(document).on("click", "[data-type=change-del]", function (e) {
        e.preventDefault();

        let thisObj = $(this),
            type = thisObj.attr('data-del'),
            parent = $(this).parents("[data-type=parents-del]");

        if (type == 'self') {
            parent.find("[data-type=get-field]").each(function () {
                $(this).removeAttr('required');
            });
        }

        if (type == 'company') {
            parent.find("[data-type=get-field]").each(function () {
                $(this).attr('required', '');
            });
        }

    });
}

function changeUserType() {
    $(document).on("click", "[data-type=change-user-type]", function (e) {
        e.preventDefault();

        console.log('change user type');

        let thisObj = $(this),
            value = thisObj.attr('data-value'),
            parent = $(this).parents("[data-tabs-parent]"),
            input = parent.find("[data-uf=UF_USER_TYPE]"),
            blockDel = parent.find("[data-type-del-req=" + value + "]"),
            blockAdd = parent.find("[data-type-add-req=" + value + "]");

        blockDel.find("[data-type=get-field]").each(function () {
            $(this).removeAttr('required');
        });

        blockAdd.find("[data-type=get-field]").each(function () {
            $(this).attr('required', '');
        });

        input.val(value);
    });
}

function basketAction() {
    $(document).on("click", "[data-type=basket-action]", function (e) {
        e.preventDefault();

        let thisObj = $(this),
            productId = thisObj.attr("data-productId"),
            ulList = $(this).parents("[data-type=basket-list]"),
            action = thisObj.attr("data-action");

        console.log(action);

        console.log('basketAction');

        $.ajax({
            method: "POST",
            url: "/local/templates/main/include/ajax/basket.php",
            dataType: "json",
            data: {
                productId: productId,
                action: action,
            },
            success: function (r) {
                if (r.ajax == true) {

                    $(document).find('[data-type=basket-count-lk]').html(r.count);

                    if (r.count == 0) {
                        location.reload();
                    } else {
                        $.ajax({
                            method: "GET",
                            url: window.location.href,
                            data: {
                                ajax: 1,
                            },
                            success: function (r) {
                                ulList.empty();
                                ulList.append($(r));
                            },
                            error: function (r) {
                                console.debug(r);
                            }
                        });
                    }
                }
            },
            error: function (r) {
                console.debug(r);
            }
        });
    });
}

function add2basket() {
    $(document).on("click", "[data-type=js-add2basket]", function (e) {
        e.preventDefault();

        let thisObj = $(this),
            productId = thisObj.attr("data-productId"),
            productName = thisObj.attr("data-productName"),
            quantity = thisObj.parents("[data-type=add-basket-block]").find("[data-type=count]").val(),
            action = 'add';

        console.log("add2basket");

        $.ajax({
            method: "POST",
            url: "/local/templates/main/include/ajax/basket.php",
            dataType: "json",
            data: {
                productId: productId,
                quantity: quantity,
                action: action,
            },
            success: function (r) {
                if (r.success == true) {
                    $(document).find('[data-type=basket-count-lk]').html(r.count);

                    $(document).find('[data-type=modal-item-name]').html(productName);
                    $(document).find('[data-product-count]').html(quantity);
                }
            },
            error: function (r) {
                console.debug(r);
            }
        });
    });
}

function logout() {
    $(document).on("click", "[data-type=logout]", function (e) {
        e.preventDefault();

        let thisObj = $(this),
            url = thisObj.attr("data-url");

        console.log("logout");

        $.ajax({
            method: "POST",
            url: url,
            dataType: "json",
            data: {
                logout: true,
            },
            success: function (r) {
                if (r.success == true) {
                    location.reload();
                }
            },
            error: function (r) {
                console.debug(r);
            }
        });
    });
}

function snippetSlider() {
    $(document).ready(function () {
        let slider = $(document).find('[data-type=slider-block]');

        $(document).find('[data-type=slider-block-inner]').html(slider);
    });
}

function filter() {
    $(document).on("click", "[data-type=js-filter]", function (e) {
        e.preventDefault();

        let thisObj = $(this),
            id = thisObj.attr("data-id");

        console.log("filter " + id);


        $.ajax({
            method: "GET",
            url: window.location.href,
            data: {
                ajax: 1,
                id: id,
            },
            success: function (r) {
                $(document).find('[data-type=items-container-full]').empty();
                $(document).find('[data-type=items-container-full]').append($(r));
            },
            error: function (r) {
                console.debug(r);
            }
        });
    });
}

function filterChange() {
    $(document).on("change", "[data-type=js-filter-change]", function (e) {
        e.preventDefault();

        let thisObj = $(this),
            tag = thisObj.val();

        console.log("filter change  " + tag);

        $.ajax({
            method: "GET",
            url: window.location.href,
            data: {
                ajax: 1,
                tag: tag,
            },
            success: function (r) {
                $(document).find('[data-type=items-container-full]').empty();
                $(document).find('[data-type=items-container-full]').append($(r));
            },
            error: function (r) {
                console.debug(r);
            }
        });
    });
}

function showMore() {
    $(document).on("click", "[data-type=show_more_click]", function (e) {
        let thisObj = $(this),
            url = thisObj.attr("data-url"),
            types = thisObj.attr("data-types"),
            container = thisObj.siblings("[data-type=items-container]");

        console.log("show more");

        if (types) {
            types = JSON.parse(types);
        }

        if (url) {
            $(document).find('[data-type=show_more_click_block]').remove();

            $.ajax({
                method: "GET",
                url: url,
                data: {
                    ajax: 1,
                    types: types,
                },
                success: function (r) {
                    let responsePageNav = $(r).find("[data-type=show_more_click_block]"),
                        itemsResponse = $(r).find("[data-type=item]");

                    $(document).find('[data-type=items-container]').append($(itemsResponse));

                    if (responsePageNav) {
                        container.after(responsePageNav);
                    }
                },
                error: function (r) {
                    console.debug(r);
                }
            });
        }
    });
}

function forms() {
    $(document).on("submit", "[data-type=js-form]", function (e) {
        console.log("form submit");
        e.preventDefault();

        let form = $(this),
            formParent = form.parents("[data-form-parent]"),
            formResponse = formParent.siblings("[data-type=form-response]"),
            respMess = formResponse.find("[data-type=resp-mess]"),
            formInputErrorMess = form.find("[data-resp=error-mess]"),
            url = form.attr("data-url"),
            data = {};


        form.find("[data-type=get-field]").each(function () {
            let field = $(this).attr("data-uf"),
                val = $(this).val();

            data[field] = val;
        });

        $.ajax({
            type: "POST",
            url: url,
            dataType: "json",
            data: data,
            success: function (r) {
                if (r.type) {

                    if (r.type === 'login_error') {
                        console.log('log in / error');

                        formParent.removeAttr('data-form-hidden');

                        formInputErrorMess.each(function () {
                            let elem = $(this).parsley();

                            elem.removeError('customValidationId');
                            elem.addError('customValidationId', { message: r.mess });
                        });
                    }
                    if (r.type === 'login_error_pass_change') {
                        console.log('log in / error pass change');

                        formParent.removeAttr('data-form-hidden');
                        formResponse.removeAttr('data-response-active');

                        formInputErrorMess.each(function () {
                            let elem = $(this).parsley();

                            elem.removeError('customValidationId');
                            elem.addError('customValidationId', { message: r.mess });
                        });
                    }
                    if (r.type === 'login_auth') {
                        formParent.attr('data-form-hidden', '');
                        formResponse.attr('data-response-active', '');

                        respMess.html(r.mess);

                        $.ajax({
                            method: "GET",
                            url: window.location.href,
                            data: {
                                auth: true,
                            },
                            success: function (r) {
                                console.log(r);
                                $(document).find('[data-type=lk-header]').empty();
                                $(document).find('[data-type=lk-header]').append($(r));
                            },
                            error: function (r) {
                                console.debug(r);
                            }
                        });
                        $.ajax({
                            method: "GET",
                            url: window.location.href,
                            data: {
                                ajax: 1,
                            },
                            success: function (r) {
                                console.log(r);
                                $(document).find('[data-type=basket-list]').empty();
                                $(document).find('[data-type=basket-list]').append($(r));
                            },
                            error: function (r) {
                                console.debug(r);
                            }
                        });
                    }
                    if (r.type === 'login_auth_entity') {
                        formParent.attr('data-form-hidden', '');
                        formResponse.attr('data-response-active', '');

                        respMess.html(r.mess);
                    }
                    if (r.type === 'login') {
                        respMess.html(r.mess);
                    }
                    if (r.type === 'order') {
                        $(document).find('[data-type=basket-count-lk]').html(r.count);
                        location.href = '/order/?ordersuc=yes&id=' + r.id + '';
                    }
                } else {
                    if (r.success === true) {
                        form.attr('data-form-hidden', '');
                        formResponse.attr('data-response-active', '');
                    }
                }
            },
            error: function (r) {
                console.debug(r);
            }
        });
    });
}

function tabDocFile() {
    $(document).on("click", "[data-type=js-tab-file]", function (e) {
        console.log("click tab");
        e.preventDefault();

        let tab = $(this),
            tabParent = tab.parents("[data-tabs]"),
            tabInner = tabParent.siblings("[data-tabs-content]"),
            idSec = tabParent.attr("data-id"),
            id = tab.attr("data-tabs-item");

        $.ajax({
            type: "GET",
            url: window.location.href,
            data: {
                id: id,
                ajaxFile: idSec,
            },
            success: function (r) {
                tabInner.empty();
                tabInner.append(r);
            },
            error: function (r) {
                console.debug(r);
            }
        });
    });
}

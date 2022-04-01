import "parsleyjs";

$(function () {
    filter();
    showMore();
    snippetSlider();
    forms();
    logout();
    filterChange();
    add2basket();
    basketAction();
});

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
            value = thisObj.val();

        console.log("filter change  " + value);

        $.ajax({
            method: "GET",
            url: window.location.href,
            data: {
                ajax: 1,
                value: value,
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
                    if (r.type === 'login') {
                        location.reload();
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

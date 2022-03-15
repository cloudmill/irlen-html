import "parsleyjs";

$(function () {
    filter();
    showMore();
    snippetSlider();
    forms();
    logout();
});

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
            modalLogin = form.parents("[data-fancy-modal=1]"),
            formResponse = formParent.siblings("[data-type=form-response]"),
            modalResponseTtl = modalLogin.find("[data-response=title]"),
            modalResponseMsg = modalLogin.find("[data-response=mess]"),
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
                if (r.type === 'login') {
                    console.log('log in / reg');
                    formParent.attr('data-form-hidden', '');
                    formResponse.attr('data-response-active', '');
                    modalResponseTtl.html(r.title);
                    modalResponseMsg.html(r.mess);

                    setTimeout(location.reload(), 4000);
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

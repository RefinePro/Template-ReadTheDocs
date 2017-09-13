$(document).ready(function() {
    // Shift nav in mobile when clicking the menu.
    $(document).on("click", "[data-toggle='wy-nav-top']", function() {
        $("[data-toggle='wy-nav-shift']").toggleClass("shift");
        $("[data-toggle='rst-versions']").toggleClass("shift");
    });
    // Close menu when you click a link.
    $(document).on("click", ".wy-menu-vertical .current ul li a", function() {
        $("[data-toggle='wy-nav-shift']").removeClass("shift");
        $("[data-toggle='rst-versions']").toggleClass("shift");
    });
    $(document).on("click", "[data-toggle='rst-current-version']", function() {
        $("[data-toggle='rst-versions']").toggleClass("shift-up");
    });
    // Make tables responsive
    $("table.docutils:not(.field-list)").wrap(
        "<div class='wy-table-responsive'></div>"
    );

    $.urlParam = function(name) {
        var results = new RegExp("[?&]" + name + "=([^&#]*)").exec(
            window.location.href
        );
        return results && results[1] ? results[1] : null;
    };

    var internal = parseInt($.urlParam("internal"));
    var persistentInternal = localStorage.getItem("rpp_internal_doc");

    console.log(internal, persistentInternal);

    if (internal === 0) {
        console.log("reset");
    }

    if (internal !== null) {
        $(".internal-doc").show();
    } else if (persistentInternal !== null) {
        localStorage.setItem("rpp_internal_doc", 1);
        $(".internal-doc").show();
    }
    // console.log("internal", internal);
    // function showInternalDoc() {
    //     $(".internal-doc").show();
    // }
});

window.SphinxRtdTheme = (function(jquery) {
    var stickyNav = (function() {
        var navBar,
            win,
            stickyNavCssClass = "stickynav",
            applyStickNav = function() {
                if (navBar.height() <= win.height()) {
                    navBar.addClass(stickyNavCssClass);
                } else {
                    navBar.removeClass(stickyNavCssClass);
                }
            },
            enable = function() {
                applyStickNav();
                win.on("resize", applyStickNav);
            },
            init = function() {
                navBar = jquery("nav.wy-nav-side:first");
                win = jquery(window);
            };
        jquery(init);
        return {
            enable: enable
        };
    })();
    return {
        StickyNav: stickyNav
    };
})($);

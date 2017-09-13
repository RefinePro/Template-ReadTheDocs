$(document).ready(function() {
    $(".internal-doc").each(function() {
        var $this = $(this);
        if ($this.html().replace(/\s|&nbsp;/g, "").length == 0) {
            $this.remove();
        }
    });

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

    function showInternalDoc() {
        $(".wy-nav-content-wrap .internal-doc")
            .addClass("show")
            .append('<div class="internal-label">private documentation</div>');
        $(".internal-doc").show();
    }

    function hideInternalDoc() {
        $(".internal-doc").hide();
    }

    var internal = parseInt($.urlParam("internal"));

    if (internal === 0) {
        localStorage.removeItem("rpp_internal_doc");
        hideInternalDoc();
    } else if (internal === 1) {
        showInternalDoc();
        localStorage.setItem("rpp_internal_doc", 1);
    } else if (localStorage.getItem("rpp_internal_doc")) {
        showInternalDoc();
    }
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

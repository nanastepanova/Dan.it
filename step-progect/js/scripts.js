$(document).ready(function () {
    $(".services-menu-item").on("click", function (event) {
        $(".services-section-content").addClass("hidden");
        $(("#" + ($(event.currentTarget).attr("id")) + "-content")).removeClass("hidden");
        $(".services-menu-item").removeClass("btn-active");
        $(this).addClass("btn-active");
    });


    let imgAll = 36;  //Всего картинок
    let imgLimit = 12;  //Колличество картинок на странице
    let page = 1;  //кол-во загрузок картинок по клику на кнопку
    let imgCss = "work-img";
    let i;
    let cssClass;  //переменная для названия класса (фильтр по категориям)

    let description = {
        "work-wordpress": "Wordpress",
        "work-landing-pages": "Landing Pages",
        "work-web-design": "Web Design",
        "work-graphic-design": "Graphic Design"
    };

    for (i = 1; i <= imgAll; i++) {  //цикл генерации картинок
        if (i % 4 == 0) {
            cssClass = "work-wordpress";
        } else if (i % 3 == 0) {
            cssClass = "work-landing-pages";
        } else if (i % 2 == 0) {
            cssClass = "work-web-design";
        } else {
            cssClass = "work-graphic-design";
        }
        $(".work-section-images").append("<img class='work-img " + cssClass + "' src='images/work/img" + i + ".png'>")
            .append("<div class=\"work-section-images-hover hidden\">" +
                "            <div>" +
                "                <a href=\"\"><i class=\"fas fa-link\"></i></a>" +
                "                <a href=\"\"><i class=\"fas fa-search search-img\"></i></a>" +
                "            </div>" +
                "            <span class=\"img-text\">creative design</span>" +
                "            <span class=\"img-description\">" + description[cssClass] + "</span>" +
                "        </div>");
    }


    function showImg(imgCss) {
        $(".work-img").addClass("hidden");  //скрываем все картинки с классом work-img
        let n = 0;                          //кол-во итераций в .each
        $("." + imgCss).each(function (key, value) {
            $(value).removeClass("hidden");
            n++;
            if (n == imgLimit * page) {
                return false;
            }
        });
        $("#work-btn").parent().removeClass("hidden");
        if ($("." + imgCss).length <= imgLimit * page) {
            $("#work-btn").parent().addClass("hidden");
        }
    }

    showImg(imgCss);


    $(".work-menu-item").on("click", function (event) {  //клик по меню
        showImg($(event.currentTarget).attr("id"));
        imgCss = $(event.currentTarget).attr("id");
        page = 1;
        $(".work-menu-item").removeClass("menu-active");
        $(this).addClass("menu-active");
    });

    $(".work-img").on("mouseover", function (event) {
        $(this).addClass("hidden");
        $(this).next().removeClass("hidden");

    });

    $(".work-section-images-hover").on("mouseleave", function (event) {
        $(this).prev().removeClass("hidden");
        $(this).addClass("hidden");
    });

    $("#work-btn").on("click", function (event) {  //клик по кнопке
        event.preventDefault();  //отмена дефолтного действия (перехода по ссылке)
        page++;

        let text = $(this).html();
        $(this).html("<span><img src='images/spinner.gif'></span>");
        setTimeout(function () {
            showImg(imgCss);
            $('#work-btn').html(text);
        } , 2000);
    });


    $(".news-link")
        .mouseover(function (event) {
            $(this).find(".news-date").addClass("news-date-hover");
            $(this).find(".news-title").addClass("news-title-hover");
        })
        .mouseleave(function (event) {
            $(this).find(".news-date").removeClass("news-date-hover");
            $(this).find(".news-title").removeClass("news-title-hover");
        });


    let imgMax = 12;

    function showGridImg() {
        if ($(".grid-item.hidden").length > 0) {
            $(".grid-item.hidden").slice(0, imgMax).removeClass("hidden");

            $('.grid').masonry({
                columnWidth: 370,
                itemSelector: '.grid-item',
                gutter: 17
            });
            if ($(".grid-item.hidden").length == 0) {
                $("#gallery-btn").addClass("hidden");
            }
        }
    }

    $(".grid-item").addClass("hidden");
    showGridImg();

    $("#gallery-btn").on("click", function (event) {  //клик по кнопке
        event.preventDefault();

        let text = $(this).html();
        $(this).html("<span><img src='images/spinner.gif'></span>");
        setTimeout(function () {
            showGridImg();
            $('#gallery-btn').html(text);
        } , 2000);
    });
});

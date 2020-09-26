
var lastPages = []

function loadSite(id, type, url) {

    disableOtherSites(id)
    $('#'+id).show()
    pasteHeading(id+"_heading")
    changeHeading(id+"_heading")

}
 
function disableOtherSites(activeSite) {

    var innerDivId = []

    $('#content').children('div').each(function(){
        innerDivId.push($(this).attr('id'))
    
    })

    index = innerDivId.indexOf(activeSite)
    if (index > -1) {
        innerDivId.splice(index, 1)
    }
    index = innerDivId.indexOf("search_container")
    if (index > -1) {
        innerDivId.splice(index, 1)
    }
    console.log(innerDivId);


    for (let index = 0; index < innerDivId.length; index++) {
        id = innerDivId[index];

        $('#'+id).hide()
    }
}

function changeHeading(id) {
    $(window).scroll(function() {
        var hT = $('#'+id).offset().top,
            hH = $('#'+id).outerHeight(),
            wH = $(window).height(),
            wS = $(this).scrollTop()+72;
        if (wS > (hT+hH-wH) && (hT > wS) && (wS+wH > hT+hH)){
            $( "#heading_scroll" ).animate({
                opacity: 0,
                paddingTop: 15
            }, 100)


            if (id == 'artist_page_heading') {
                $( "#button_scroll1" ).animate({
                    opacity: 0,
                    paddingTop: 15
                }, 150)
                $( "#button_scroll2" ).animate({
                    opacity: 0,
                    paddingTop: 15
                }, 200)
                $( "#search_container_bg" ).animate({
                    opacity: 0,
                }, 50)
            }
        } else {
            $( "#heading_scroll" ).animate({
                opacity: 1,
                paddingTop: 0
            }, 100)

            if (id == 'artist_page_heading') {
                $( "#button_scroll1" ).animate({
                    opacity: 1,
                    paddingTop: 0
                }, 150)
                $( "#button_scroll2" ).animate({
                    opacity: 1,
                    paddingTop: 0
                }, 200) 
                $( "#search_container_bg" ).animate({
                    opacity: 1,
                }, 250)
                
            }
        }
     });
     search_container

}

function pasteHeading(id) {
    heading = document.getElementById(id).innerHTML
    document.getElementById('heading_scroll').innerHTML = heading
    console.log(heading)
}

function menuSlider(slideTo) {

    var len = $('.artist_page_menu_item').length
    var items = []
    var width_items = []
    var translate_items = []

    for (let i = 1; i <= len; i++) {
        items[i] = document.getElementById('menu_item' + i).getBoundingClientRect()
        width_items[i] = items[i].right - items[i].left - 25
        translate_items[i] = items[i].left - 285
    }

    $('#artist_page_menu_selector').animate({
        marginLeft: translate_items[slideTo],
        width: width_items[slideTo]
      }, 400, function() {
      })

}

function artist_page_pages(page) {

    if (page == 1) {
        menuSlider(1)
         $("#artist_page_overview").show()
         $("#artist_page_wofl").hide()
         $("#artist_page_info").hide()
    } else if (page == 2) {
        menuSlider(2)
        $("#artist_page_overview").hide()
        $("#artist_page_wofl").show()
        $("#artist_page_info").hide()
    } else {
        menuSlider(3)
        $("#artist_page_overview").hide()
        $("#artist_page_wofl").hide()
        $("#artist_page_info").show()
    }
}

function artist_portrait(element, on) {
    if (on == true) {
        $(element).animate({
            width: 80,
            opacity: 1
        }, 100)
    } else {
        $(element).animate({
            width: 74,
            opacity: 0.6
        }, 100)

    }


}
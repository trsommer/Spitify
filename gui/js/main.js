window.onload = init

function init() {
    setSideBarHeight()
    likeButton = document.getElementById("like_icon")

    likeButton.addEventListener('click', function() {
        like_Song()
        console.log("test");    
    }, false)
    
    handle = document.getElementById("progress_bar_slider_handel")

    window.addEventListener('resize', function() {
        setSideBarHeight()
        
    })

}

function setSideBarHeight() {
    var w_height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

    sB_height = w_height - 23 - 72

    document.getElementById("sidebar").style.height = sB_height + "px"

}




function changeSlider() {
    console.log("true");
    exit = false
       

    document.getElementById('body').addEventListener('mouseup', function() {
          console.log("false");
          exit = true
          document.getElementById('body').removeEventListener('mouseup', function(){} , false)
    }, false)

    document.getElementById('body').addEventListener('mouseleave', function() {
          console.log("leave");
          exit = true
          document.getElementById('body').removeEventListener('mouseleave', function(){} , false)

    }, false)

    if (exit == true) {
        return
    }

    //var mouse_x = event.clientX
}

function mouseDown() {
    console.log("down");

}


function mouseUp() {
    console.log("up");

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
      });
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
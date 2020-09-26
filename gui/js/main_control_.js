window.onload = init

async function searchForTrack(input) {
    console.log("test")
    response = await searchTrack(input)
    addSearchResults(response)
    loadSite('search_results')

}

function init() {

    //music control

    var music = document.getElementById('audio_player');
    music.addEventListener("timeupdate", timeUpdate, false)
    setVolume(0.5)  
    music.addEventListener("ended", musicEnded, false)

    //window control

    $( "#search_main" ).click(function() {
        loadSite('last_searches')
    })

    var input = document.getElementById('search_main');
    input.addEventListener('input', function(){
        searchForTrack($('#search_main').val())
    });
}



function include(file) { 
  
    var script  = document.createElement('script'); 
    script.src  = file; 
    script.type = 'text/javascript'; 
    script.defer = true; 
    
    document.getElementsByTagName('head').item(0).appendChild(script); 
    
  }

  include('js/music_controls.js')
  include('js/window_control.js')
  include('js/search.js')
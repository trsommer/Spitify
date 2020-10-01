window.onload = init
async function search(input) {
    responseTracks = await searchTracks(input)
    responseArtists = await searchArtists(input)
    addSearchResults(responseTracks, responseArtists)
    loadSite('search_results')
}

async function searchForArtist(input) {
    response = await searchArtist(input)
    getArtistWallpaper(response['artistID'])
    addArtistInfo(response)
    loadSite('artist_page')
}

function init() {
   
    setContentWidth()


    //music control

    var music = document.getElementById('audio_player');
    music.addEventListener("timeupdate", timeUpdate, false)
    setVolume(0.5)  
    music.addEventListener("ended", musicEnded, false)



    //window control

    $(window).resize(function() {
        setContentWidth()
    })

    $( "#search_main" ).click(function() {
        if ($('#search_main').val() == "") {
            loadSite('last_searches')
        }
        
    })

    $( "#song_artist" ).click(function() {
        artistID = artistClick()
        searchForArtist(artistID)
    })

    var input = document.getElementById('search_main');
    input.addEventListener('input', function(){
        console.log("input");
        if ($('#search_main').val() == "") {
            loadSite('last_searches')
        } else {
            search($('#search_main').val())
            if ($('#search_main').val() == "") {
                loadSite('last_searches')
            } 
        }
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
  include('js/database.js')
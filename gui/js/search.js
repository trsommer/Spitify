let {PythonShell} = require('python-shell')
var path = require("path")

search_results_tracks = []
search_results_artists = []

function searchTracks(input) {
    
    if (input == "") {

    } else {
        
        var options = {
            scriptPath : path.join(__dirname, '/../engine/'),
            args : [input]
        }
        
        let pyshell = new PythonShell('searchTracks.py', options)
        return new Promise(resolve => {
            pyshell.on('message', function(message) {
                myArray = JSON.parse(message)
                resolve(myArray) 
              })
        })

    }
}

function searchArtists(input) {
    
    if (input == "") {

    } else {
        
        var options = {
            scriptPath : path.join(__dirname, '/../engine/'),
            args : [input]
        }
        
        let pyshell = new PythonShell('searchArtists.py', options)
        return new Promise(resolve => {
            pyshell.on('message', function(message) {
                myArray = JSON.parse(message)
                resolve(myArray) 
              })
        })

    }
}

function addSearchResults(dataTracks, dataArtists) {
    search_results_tracks = dataTracks
    search_results_artists = dataArtists

    //tracks
    for (let index = 0; index < dataTracks.length; index++) {
        src = dataTracks[index]["coverImage"][1]
        track_name = dataTracks[index]["trackName"]
        track_artist = dataTracks[index]["artistName"][0]

        div = $($('#search_list_tracks').children()[index])
        div.find('.search_item_img').attr('src', src)
        div.find('.search_item_name').html(track_name)
        div.find('.search_item_artist').html(track_artist)
    }

    //artists
    for (let index = 0; index < dataArtists.length; index++) {
        src = dataArtists[index]['coverImage'][1]
        artist_Name = dataArtists[index]['artistName']
        artistID = dataArtists[index]['id']

        div = $($('#search_list_artists').children()[index])
        div.find('.search_item_name').html(artist_Name)

        if (src != "") {
            div.find('.search_item_img').attr('src', src)
        }




    }

}

function searchPlayTrack(id) {
    trackName = search_results_tracks[id]['trackName']
    trackArtist = search_results_tracks[id]['artistName'][0]
    
    var options = {
        scriptPath : path.join(__dirname, '/../engine/'),
        args : [trackName, trackArtist]
    }
    
    let pyshell = new PythonShell('searchYT.py', options)
        pyshell.on('message', function(message) {
            nextSong = search_results_tracks[id]
            nextSong['url'] = message
            playSong(nextSong)
        })
}

async function openArtistFromSearch(id) {

    console.log(id + " click");

    artist_id = search_results_artists[id]['artistID']

    response = await searchArtist(artist_id)
    getArtistWallpaper(artist_id)
    addArtistInfo(response)
    loadSite('artist_page')
}

function searchArtist(id) {
    var options = {
        scriptPath : path.join(__dirname, '/../engine/'),
        args : [id]
    }
    console.log("id: " + id);
    let pyshell = new PythonShell('searchArtist.py', options)
    return new Promise(resolve => {
        pyshell.on('message', function(message) {
            myArray = JSON.parse(message)
            resolve(myArray) 
          })
    })

}

function addArtistInfo(data) {
    console.log('addArtistInfo');
    $('#artist_page_heading').html(data['artistName'])
    $('#artist_page_bg_img').css("background-image", "url(" + data['images'][0] + ")")
    
}

function getArtistWallpaper(id) {
    var options = {
        scriptPath : path.join(__dirname, '/../engine/'),
        args : [id]
    }
    console.log('getArtistWallpaper');
    let pyshell = new PythonShell('get_artist_wallpaper.py', options)
        pyshell.on('message', function(message) {
            console.log(message);
            $('#artist_page_bg_img').css("background-image", "url(" + message + ")")
    })



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

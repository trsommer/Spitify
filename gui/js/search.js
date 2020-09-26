let {PythonShell} = require('python-shell')
var path = require("path")

search_results = []

function searchTrack(input) {
    
    if (input == "") {

    } else {
        
        var options = {
            scriptPath : path.join(__dirname, '/../engine/'),
            args : [input]
        }
        
        let pyshell = new PythonShell('search.py', options)
        return new Promise(resolve => {
            pyshell.on('message', function(message) {
                myArray = JSON.parse(message)
                resolve(myArray) 
              })
        })

    }
}

function addSearchResults(data) {
    search_results = data
    for (let index = 0; index < data.length; index++) {
        console.log(index);
        src = data[index]["coverImage"][1]
        track_name = data[index]["trackName"]
        track_artist = data[index]["artistName"][0]
        div = $($('#search_list').children()[index])
        div.find('.search_item_img').attr('src', src)
        div.find('.search_item_name').html(track_name)
        div.find('.search_item_artist').html(track_artist)
    }
}

function searchPlayTrack(id) {
    trackName = search_results[id]['trackName']
    trackArtist = search_results[id]['artistName'][0]
    
    var options = {
        scriptPath : path.join(__dirname, '/../engine/'),
        args : [trackName, trackArtist]
    }
    
    let pyshell = new PythonShell('searchYT.py', options)
        pyshell.on('message', function(message) {
            nextSong = search_results[id]
            nextSong['url'] = message
            playSong(nextSong)
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
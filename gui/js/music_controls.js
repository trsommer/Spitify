
saved_volume = 0
repeat = false
shuffle = false
nextSong = {
    "songURL":  [],
    "songname": [],
    "artist":   [],
    "coverImg": [],
    "liked":    [],
}

currentSong = 0

function progressbar_click(id_parent, id_child) {
    console.log("click");
    click_pos = event.clientX
    var coord_bar = document.getElementById(id_parent).getBoundingClientRect()
    width_bar = coord_bar.right - coord_bar.left
    margin_left = coord_bar.left
    click_offset = click_pos - margin_left
    value = click_offset / width_bar 
    percentage = value * 100
    if (id_parent == 'progress_bar_slider') {
        skipTo(value)
    } else {    
        setVolume(value)
    }

    document.getElementById(id_child).style.width = percentage + "%"

}

function changeMusicPlayState() {
    var music = document.getElementById('audio_player');


    if (music.paused) {
        playMusic('play/pause')
    } else {
        pauseMusic('play/pause')
    }
}

function playNextSong() {



}

function playSong(data) {

    $('#song_cover').attr('src', data['coverImage'][1])
    $('#song_title').html(data['trackName'])
    $('#song_artist').html(data['artistName'][0])
    var music = document.getElementById('audio_player');
    music.src = data['url']
    playMusic('play/pause')
}

function pauseMusic(id) {
    var music = document.getElementById('audio_player');
    music.pause()
    document.getElementById(id).src = "icons/play.svg"
}

function playMusic(id) {
    var music = document.getElementById('audio_player');
    if (music.volume == 0) {
        music.volume = 0.1
    }
    music.play()
    document.getElementById(id).src = "icons/pause.svg"
}





function timeUpdate() {
    var music = document.getElementById('audio_player');
    var playPercent = 100 * (music.currentTime / music.duration);
    document.getElementById('progress_bar_slider_progress').style.width = playPercent + "%"

    minutes = Math.floor(music.currentTime / 60)
    seconds = Math.round(music.currentTime  - minutes * 60)
    if (seconds < 10) {
        result = "0" + seconds
    } else {
        result = seconds
    }


    document.getElementById('progress_bar_time1').innerHTML = minutes + ":" + result

    minutes = Math.floor(music.duration / 60)
    seconds = music.duration  - minutes * 60;

    document.getElementById('progress_bar_time2').innerHTML = minutes + ":" + Math.round(seconds)
}

function skipTo(value) {
    var music = document.getElementById('audio_player');
    music.currentTime = music.duration * value

}

function setVolume(value) {
    var music = document.getElementById('audio_player');
    console.log(value);

    if (value <= 0.07) {
        value = 0
        document.getElementById('volume_controls_slider_progress').style.width = value + "%"
        document.getElementById('volume_icon').src = "icons/volume/mute.svg"
        pauseMusic('play/pause')
    } else if (value > 0 && value < 0.5){

        document.getElementById('volume_icon').src = "icons/volume/quiet.svg"
        playMusic('play/pause')
        console.log(value);
        percentage = value * 100
        document.getElementById('volume_controls_slider_progress').style.width = percentage + "%"

    } else {

        document.getElementById('volume_icon').src = "icons/volume/loud.svg"
        playMusic('play/pause')
        percentage = value * 100
        document.getElementById('volume_controls_slider_progress').style.width = percentage + "%"

    }

    music.volume = value 

}

function mute() {
    var music = document.getElementById('audio_player');
    volume = music.volume

    if (volume > 0) {
        saved_volume = music.volume
        setVolume(0)
        document.getElementById('volume_icon').src = "icons/volume/mute.svg"
        pauseMusic('play/pause')
    } else {
        console.log(saved_volume);
        if (!saved_volume == 0) {
            setVolume(saved_volume)
        } else {
            setVolume(0.5)
        }
        document.getElementById('volume_icon').src = "icons/volume/loud.svg"
        playMusic('play/pause')
    }
}

function like_song() {
    src = document.getElementById("like_icon").src

    if (src == "file:///Users/test/Documents/spitify/gui/icons/heart_blank.svg") {
        document.getElementById("like_icon").src = "icons/heart_filled.svg"
    } else {
        document.getElementById("like_icon").src = "icons/heart_blank.svg"

    }

}

function activate_repeat() {
    src = document.getElementById("icon_repeat").src
    var music = document.getElementById('audio_player');



    if (src == "file:///Users/test/Documents/spitify/gui/icons/repeat.svg") {
        document.getElementById("icon_repeat").src = "icons/repeat_activated.svg"
        music.loop = true
        repeat = true
    } else {
        document.getElementById("icon_repeat").src = "icons/repeat.svg"
        music.loop = false
        repeat = false

    }
}

function activate_shuffle() {
    src = document.getElementById("icon_shuffle").src

    if (src == "file:///Users/test/Documents/spitify/gui/icons/shuffle.svg") {
        document.getElementById("icon_shuffle").src = "icons/shuffle_activated.svg"
        shuffle = true
    } else {
        document.getElementById("icon_shuffle").src = "icons/shuffle.svg"
        shuffle = false
    }


}

function shorten_song() {
    src = document.getElementById("shorten_icon").src

    if (src == "file:///Users/test/Documents/spitify/gui/icons/shorten.svg") {
        document.getElementById("shorten_icon").src = "icons/shorten_activated.svg"
        shorten(true)
    } else {
        document.getElementById("shorten_icon").src = "icons/shorten.svg"
        shorten(false)
    }


}

function musicEnded()  {
    
    if (repeat == false && nextSong[currentSong + 1] == "") {
        pauseMusic('play/pause')
        currentSong = 0
        nextSong =  []
    } else if (!nextSong["songURL"][currentSong + 1] == "") {

        tryNextSong = getNextSong()
        var music = document.getElementById('audio_player');
        music.src = nextSong

        if (!tryNextSong == "") {
            
            nextSong = tryNextSong

        }

    }
    
}

function getNextSong() {



}

function shorten(activated) {

    if (activated == true) {
        $('#controls').animate({
            paddingTop: 120
          }, 400, function() {
          })
    } else {
        $('#controls').animate({
            paddingTop: 5
          }, 400, function() {
          })


    }


}





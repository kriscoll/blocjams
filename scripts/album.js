  

var createSongRow = function(songNumber, songName, songLength) {
    var template =
       '<tr class="album-view-song-item">'
     + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
     + '  <td class="song-item-title">' + songName + '</td>'
     + '  <td class="song-item-duration">' + filterTimeCode(songLength) + '</td>'
     + '</tr>'
     ;
    var $row = $(template);

    var clickHandler = function() {
        var songNumber = parseInt($(this).attr('data-song-number'));

        if (currentlyPlayingSongNumber !== null) {
            // Switch back to song number for currently playing song because user started playing new song.
            
            var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
            currentlyPlayingCell.html(currentlyPlayingSongNumber);
        }

        if (currentlyPlayingSongNumber !== songNumber) {
            // Switch from Play-Pause button to indicate new song is playing.
            
            setSong(songNumber - 1);
            currentSoundFile.play();

            var $volumeFill = $('.volume .fill');
   var $volumeThumb = $('.volume .thumb');
   $volumeFill.width(currentVolume + '%');
   $volumeThumb.css({left: currentVolume + '%'});
            
            
            
            
            $(this).html(pauseButtonTemplate);
            updatePlayerBarSong();
            
        $('.main-controls .play-pause').html(playerBarPauseButton);
            
        }
        
        
        else if (currentlyPlayingSongNumber === songNumber) {
            if (currentSoundFile.isPaused()) {
                $(this).html(pauseButtonTemplate);
                $('.main-controls .play-pause').html(playerBarPauseButton);
                currentSoundFile.play();
            }
            else {
                $(this).html(playButtonTemplate);
                $('.main-controls .play-pause').html(playerBarPlayButton);
                currentSoundFile.pause();
            }
        }
    };

    var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        }
    };

    var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(songNumber);
        }
    };

    $row.find('.song-item-number').click(clickHandler);

    $row.hover(onHover, offHover);

    return $row;
};

  var filterTimeCode = function (timeInSeconds) {
  timeInSeconds = parseFloat(timeInSeconds);
  var minutes = Math.floor(timeInSeconds / 60).toString();
  var seconds = Math.floor(timeInSeconds % 60).toString();

  if (seconds.length < 2 ) {
    seconds = '0' + seconds;
  }

  return minutes + ':' + seconds;
};



  var updatePlayerBarSong = function() {

    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);

    $('.main-controls .play-pause').html(playerBarPauseButton);
   };

  var setCurrentAlbum = function(album) {
       
       
       

    currentAlbum = album;

    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');

    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);

    $albumSongList.empty();

    for (var i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);
    }
  };

    var updateSeekBarWhileSongPlays = function() {
   if (currentSoundFile) {
       // #10
       currentSoundFile.bind('timeupdate', function(event) {
           // #11
           var seekBarFillRatio = this.getTime() / this.getDuration();
           var $seekBar = $('.seek-control .seek-bar');

           updateSeekPercentage($seekBar, seekBarFillRatio);
       });
   }
};

// Method to update the seek bars
var updateSeekPercentage = function($seekBar, seekBarFillRatio) {

  // Multiply the fill ratio by 100 to determine a percentage
  var offsetXPercent = seekBarFillRatio * 100;

  // Make sure our percentage isn't less than zero
  offsetXPercent = Math.max(0, offsetXPercent);
  // Make sure our percentage doesn't exceed 100%
  offsetXPercent = Math.min(100, offsetXPercent);

  // Convert the percentage to a string and add the % character
  var percentageString = offsetXPercent + '%';

  // Apply the percentage to the element's CSS
  $seekBar.find('.fill').width(percentageString);
  $seekBar.find('.thumb').css({left: percentageString});

};

// Method for determining the seekBarFillRatio in updateSeekPercentage
var setupSeekBars = function(){

  var $seekBars = $('.player-bar .seek-bar');

  $seekBars.click(function(event){

    var offsetX = event.pageX - $(this).offset().left;
    var barWidth = $(this).width();

    var seekBarFillRatio = offsetX / barWidth;

  if( $(this).parent().hasClass('seek-control') ){

    // Skip to the seekbar percent in the song
    seek(seekBarFillRatio * currentSoundFile.getDuration());

  } else {

    // Set the volume based on the seek bar position
    setVolume(seekBarFillRatio * 100);
  }

  updateSeekPercentage($(this), seekBarFillRatio);

  });

  $seekBars.find('.thumb').mousedown(function(event) {

    var $seekBar = $(this).parent();

    $(document).bind('mousemove.thumb', function(event){
      var offsetX = event.pageX - $seekBar.offset().left;
      var barWidth = $seekBar.width();
      var seekBarFillRatio = offsetX / barWidth;

      if( $(this).parent().hasClass('seek-control') ){

        // Skip to the seekbar percent in the song
        seek(seekBarFillRatio * currentSoundFile.getDuration());
      } else {

        // Set the volume based on the seek bar position
        setVolume(seekBarFillRatio);

      }

      updateSeekPercentage($seekBar, seekBarFillRatio);
    });

    $(document).bind('mouseup.thumb', function() {
      $(document).unbind('mousemove.thumb');
      $(document).unbind('mouseup.thumb');
    });

 });
};



    var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
  };

    var getSongNumberCell = function(index) {
    return $('.song-item-number[data-song-number="' + index + '"]');
  };

    var setSong = function(songNumber) {

    if (currentSoundFile) {
        currentSoundFile.stop();
    }

    currentlyPlayingSongNumber = parseInt(songNumber + 1);
    currentSongFromAlbum = currentAlbum.songs[songNumber];

    currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
        formats: [ 'mp3' ],
        preload: true
    });
    setVolume(currentVolume);
  };

    var setCurrentTimeInPlayerBar = function (currentTime) {
    $('.current-time').text(filterTimeCode(currentTime));
        
    };

    var setTotalTimeInPlayerBar = function (totalTime) {
  $('.currently-playing .total-time').text(filterTimeCode(totalTime));
};

    var seek = function(time) {
   if (currentSoundFile) {
    currentSoundFile.setTime(time);
  }
};

    var setVolume = function(volume) {
    if (currentSoundFile) {
        currentSoundFile.setVolume(volume);
    }
   };

    var nextSong = function() {

    var getLastSongNumber = function(index) {
        return index === 0 ? currentAlbum.songs.length : index;
   };

    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _incrementing_ the song here
    currentSongIndex++;

    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }

    // Set a new current song
    setSong(currentSongIndex);
    currentSoundFile.play();

    //Update the Player Bar information
    updatePlayerBarSong();

    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
   };

   var previousSong = function() {

    // Note the difference between this implementation and the one in
    // nextSong()
    var getLastSongNumber = function(index) {
        return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
    };

    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _decrementing_ the index here
    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }

    // Set a new current song
    setSong(currentSongIndex);
    currentSoundFile.play();

    // Update the Player Bar information
    updatePlayerBarSong();

    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);

   };

     var togglePlayFromPlayerBar = function() {
     var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
 
     if (currentSoundFile.isPaused()) {
         currentSoundFile.play();
         $playPauseButton.html(playerBarPauseButton);
         currentlyPlayingCell.html(pauseButtonTemplate);
     }
     else if (!currentSoundFile.isPaused()) {
         currentSoundFile.pause();
         $playPauseButton.html(playerBarPlayButton);
         currentlyPlayingCell.html(playButtonTemplate);
     }
 };
 

  var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';

  var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

  var playerBarPlayButton = '<span class="ion-play"></span>';
  var playerBarPauseButton = '<span class="ion-pause"></span>';

  // Create variables in the global scope to hold current song/album information
var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;
var currentVolume = 80;
var $nextButton = $('.main-controls .next');
var $previousButton = $('.main-controls .previous');
var $playPauseButton = $('.main-controls .play-pause');

   $(document).ready(function() {
    setCurrentAlbum(albumPicasso);
    setupSeekBars();
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
    $playPauseButton.click(togglePlayFromPlayerBar);
   });
  /*These objects represent albums.  The object stores information such as album title, artist, label, songs*/




//generates the content on the song row
 /*These objects represent albums.  The object stores information such as album title, artist, label, songs*/




//generates the content on the song row
 var createSongRow = function(songNumber, songName, songLength) {

   var template =
      '<tr class="album-view-song-item">' +
      '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>' +
      '  <td class="song-item-title">' + songName + '</td>' +
      '  <td class="song-item-duration">' + songLength + '</td>' +
      '</tr>';
     
     return $(template);
     
 };

  var $row = $(template);

  var clickHandler = function(){

    var $songDataAttr = $(this).attr('data-song-number');

    // If a song is currently playing, revert that song button to the song's number
    if ( currentlyPlayingSong !== null ) {

      var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
      currentlyPlayingCell.html(currentlyPlayingSong);

    }

    // If song clicked is not the currentlyPlayingSong, display a pause button
    if (currentlyPlayingSong !== $songDataAttr ){

      $(this).html(pauseButtonTemplate);
      currentlyPlayingSong = $songDataAttr;

    // If clicking the currently playing song, display the play button
    } else if (currentlyPlayingSong === $songDataAttr ) {

      $(this).html(playButtonTemplate);
      currentlyPlayingSong = null;
      

    }

  };

  var onHover = function(event) {
      var songNumberCell = $(this).find('.song-item-number');
      var songNumber = songNumberCell.attr('data-song-number');

      if (songNumber !== currentlyPlayingSong) {
          songNumberCell.html(playButtonTemplate);
      }
  };

  var offHover = function(event) {
      var songNumberCell = $(this).find('.song-item-number');
      var songNumber = songNumberCell.attr('data-song-number');

      if (songNumber !== currentlyPlayingSong) {
          songNumberCell.html(songNumber);
      }
  };

  $row.find('.song-item-number').click(clickHandler);
  $row.hover(onHover, offHover);
  return $row;

};

  var setCurrentAlbum = function(album) {
      currentAlbum = album;

      var $albumTitle = $('.album-view-title');
      var $albumArtist = $('.album-view-artist');
      var $albumReleaseInfo = $('.album-view-release-info');
      var $albumImage = $('.album-cover-art');
      var $albumSongList = $('.album-view-song-list');

      $albumTitle.text(album.name);
      $albumArtist.text(album.artist);
      $albumReleaseInfo.text(album.year + ' ' + album.label);
      $albumImage.attr('src', album.albumArtUrl);

      $albumSongList.empty();

  // Loop through each song in the album
  for (i = 0; i < album.songs.length; i++) {
    var $newRow = createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
    $albumSongList.append($newRow);
  }

};

// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

// Store state of playing songs

var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;

$(document).ready( function() {

  setCurrentAlbum(albumPicasso);

});



//     var count = 1;
//     var albumCatalog = [albumPicasso, albumMarconi, albumTaylor];
// 
//     albumImage.addEventListener("click", function( event ) {
// 
//         setCurrentAlbum(albumCatalog[count]);
//
//         count++;
//
//         if( count == albumCatalog.length ){
//           count = 0;
//         };
//         
//     });
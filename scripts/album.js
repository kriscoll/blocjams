  /*These objects represent albums.  The object stores information such as album title, artist, label, songs*/

//Example Album
 var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
 };
 
 // Another Example Album
 var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
 };

 // Third Example Album-Checkpoint 25 Assignment
 var albumTaylor = {
     title: 'Crazy People',
     artist: 'James Taylor',
     label: 'EM',
     year: '1997',
     albumArtUrl: 'assets/images/album_covers/22.png',
     songs: [
         { title: 'Time for You to Go.', duration: '3:00' },
         { title: 'Hello Goodbye', duration: '1:21' },
         { title: 'OK', duration: '3:11'},
         { title: 'Great News!', duration: '1:14' },
         { title: 'See Ya', duration: '5:15'}
     ]
 };



//generates the content on the song row
 var createSongRow = function(songNumber, songName, songLength) {

   var template =
      '<tr class="album-view-song-item">' +
      '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>' +
      '  <td class="song-item-title">' + songName + '</td>' +
      '  <td class="song-item-duration">' + songLength + '</td>' +
      '</tr>';

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

      $(this).thml(playButtonTemplate);
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
var currentlyPlayingSong = null;

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
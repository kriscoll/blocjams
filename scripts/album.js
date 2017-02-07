


//generates the content on the song row
 var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     var $row = $(template);
     
     
     var onHover = function(event) {
         
        var $songNumberCell = $(this).find('.song-item-number');
        var $songNumber = $songNumberCell.attr('data-song-number');

        if ($songNumber !== currentlyPlayingSongChoice) {
            $songNumberCell.html(playButtonTemplate);
        }     
     };
         
        
    var offHover = function(event) {
        
        var $songNumberCell = $(this).find('.song-item-number');
        var $songNumber = $songNumberCell.attr('data-song-number');

        if ($songNumber !== currentlyPlayingSongChoice) {
            $songNumberCell.html($songNumber);
        } 
     };
     
     
     
     
     var clickHandler = function() {
         // clickHandler logic
	  var songDataAttr = $(this).attr('data-song-number');

    // If a song is currently playing, revert that song button to the song's number
     if ( currentlyPlayingSongChoice !== null ) {
     
         var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongChoice + '"]');
      currentlyPlayingCell.html(currentlyPlayingSongChoice);

    }

    // If song clicked is not the currentlyPlayingSong, display a pause button
    if (currentlyPlayingSongChoice !== $songDataAttr ){

      $(this).html(pauseButtonTemplate);
      currentlyPlayingSongChoice = $songDataAttr;
      currentSongFromAlbum = currentAlbum.songs[$songDataAttr - 1];

        
    // If clicking the currently playing song, display the play button
    } else if (currentlyPlayingSongChoice === $songDataAttr ) {
       $(this).html(playButtonTemplate);
       currentlyPlayingSongChoice = null;
       currentSongFromAlbum = null;
    }

  };

     
     // #1
     $row.find('.song-item-number').click(clickHandler);
     // #2
     $row.hover(onHover, offHover);
     // #3
     return $row;
  };
     
     
     /*setCurrentAlbum function will be called when window loads  It will take one of the album objects as an argument and use the stored information by injecting it into the template.*/

     var setCurrentAlbum = function(album) {
         
     currentAlbum = album;
  //select elements that I want to populate with text
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');

      
     // assign values to each part of the album, i.e text, images
     $albumTitle.text(album.title);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);
 
     // empty contents of album song list container
     $albumSongList.empty();
 
     // build list of songs from album js object
     for (var i = 0; i < album.songs.length; i++) {
         var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);
     }
 };
   
     // Album button templates
   var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
   var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';


    // Store state of playing songs

   var currentAlbum = null;
   var currentlyPlayingSongChoice = null;
   var currentSongFromAlbum = null;

   $(document).ready(function() {
     
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
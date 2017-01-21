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
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     return template;
 };

//select elements that I want to populate with text
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];


/*setCurrentAlbum function will be called when window loads  It will take one of the album objects as an argument and use the stored information by injecting it into the template.*/

  var setCurrentAlbum = function(album) {
      
      
     // assign values to each part of the album, i.e text, images
     albumTitle.firstChild.nodeValue = album.title;
     albumArtist.firstChild.nodeValue = album.artist;
     albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
     albumImage.setAttribute('src', album.albumArtUrl);
 
     // empty contents of album song list container
     albumSongList.innerHTML = '';
 
     // build list of songs from album js object
     for (var i = 0; i < album.songs.length; i++) {
         albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
     }
 };
      //Elements listeners will be added to
   var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
   var songRows = document.getElementsByClassName('album-view-song-item');
   
     // Album button templates
   var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
   var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';


    // Store state of playing songs
   var currentlyPlayingSong = null;

 window.onload = function() {
     
     setCurrentAlbum(albumPicasso);
     
     var findParentByClassName = function(element, targetClass) {
         
         //Check if the current parent exists
     if (element) {
        
        //Assign the element's parent that we're checking to a variable
        var currentParent = element.parentElement;
         
         // If the element's parent class that we're on isn't the same as the target class we want,
         // move to the next parent element up
        while (currentParent.className != targetClass && currentParent.className !== null) {
            currentParent = currentParent.parentElement;
        }
         // Return the current parent when a match is found
        return currentParent;
         
          //Otherwise alert that there was no match
        } else {
            alert("No parent found with that class name");
        } 
        
    };

     // Always return the song item regardless of the song element selected
     var getSongItem = function(element) {
    switch (element.className) {
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
    }  
};

      var clickHandler = function(targetElement) {
          
          var songItem = getSongItem(targetElement);
          if (currentlyPlayingSong === null) {
              songItem.innerHTML = pauseButtonTemplate;
              currentlyPlayingSong = songItem.getAttribute('data-song-number');
    } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
         songItem.innerHTML = playButtonTemplate;
         currentlyPlayingSong = null;
    } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
         var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
         currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
     }
 };


     
     songListContainer.addEventListener('mouseover', function(event) {
         
         // Only target individual song rows during event delegation
         if (event.target.parentElement.className === 'album-view-song-item') {
             
             // Change the content from the number to the play button's HTML
             event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
         
        // If it's the current song, keep the pause button active on hover
      var songItem = getSongItem(event.target);
      if ( songItem.getAttribute('data-song-number') === currentlyPlayingSong ){
        songItem.innerHTML = pauseButtonTemplate;
      }
         
         }
         
     });
     
     for (var i = 0; i < songRows.length; i++) {
         songRows[i].addEventListener('mouseleave', function(event) {
             // #1
             var songItem = getSongItem(event.target);
             var songItemNumber = songItem.getAttribute('data-song-number');
 
             // #2
             if (songItemNumber !== currentlyPlayingSong) {
                 songItem.innerHTML = songItemNumber;
             }
         });
         
         // register the click that will eventually change the value of currentlyPlayingSong
         songRows[i].addEventListener('click', function(event) {
             clickHandler(event.target);
         });
     }

  };

     var count = 1;
     var albumCatalog = [albumPicasso, albumMarconi, albumTaylor];
 
     albumImage.addEventListener("click", function( event ) {
 
         setCurrentAlbum(albumCatalog[count]);

         count++;

         if( count == albumCatalog.length ){
           count = 0;
         };
         
     });
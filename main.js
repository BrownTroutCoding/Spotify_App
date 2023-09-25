// Declarations for our song values
let song;
let playSong;


// Spotify Client Creds
const clientId = "";
const clientSecret = "";

const _getToken = async () => {
    const result = await fetch(`https://accounts.spotify.com/api/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });

    // Access the data given to us by the fetch response (Promise)
    const data = await result.json();
    return data.access_token
}

// Function to get Song Info when image figure is clicked
/**
 * @param img_index
 * @param item_index
 * 
 * Function gets song from spotify using the image index of our gallery.
 * Then finds the correct item_index inside of the JSON response data from Spotify
 * which will produce a preview url that will be used to play song from soundtrack.
 */

async function clickedEvent(img_index, item_index) {
    try {
        // Get Track Name
        let imgElements = document.getElementsByTagName('img');

        if (img_index >= 0 && img_index < imgElements.length) {
            let track = imgElements[img_index].attributes[2].value;

            // Get Token
            let token = await _getToken();

            let headers = new Headers([
                ['Content-Type', 'application/json'],
                ['Accept', 'application/json'],
                ['Authorization', `Bearer ${token}`]
            ]);

            // Construct the Spotify API request
            let request = new Request(`https://api.spotify.com/v1/search?q=${track}&type=track&limit=15`, {
                method: 'GET',
                headers: headers
            });

            let result = await fetch(request);
            let response = await result.json();

            console.log(response);
            
            if (response.tracks && response.tracks.items && response.tracks.items[item_index]) {
                let song = response.tracks.items[item_index].preview_url;

                // Before we play a song, first check if playSong is defined and playing
                if (playSong) {
                    stopSnippet();
                }
                songSnippet(song);
            } else {
                console.error('Error: Unable to retrieve track data.');
            }
        } else {
            console.error('Error: Invalid img_index.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}



 /**
  * @param id
  * @param event
  * 
  * id = image if for gallery image
  * event = Mouse event given by the action from our user
  * 
  * Function produces songs from the clickedEvent based 
  * on index of image.
  */

  function getSong(id,event){
      switch(id){
          case 'fig1': {
              event.stopPropagation();
              clickedEvent(2,0)
              break;
          }
          case 'fig2': {
              event.stopPropagation();
              clickedEvent(4,0)
              break;
          }
          case 'fig3': {
              event.stopPropagation();
              clickedEvent(6,3)
              break;
          }
          case 'fig4': {
              event.stopPropagation();
              clickedEvent(8,0)
              break;
          }
          case 'fig5': {
              event.stopPropagation();
              clickedEvent(10,0)
              break;
          }
          case 'fig6': {
              event.stopPropagation();
              clickedEvent(12,0)
              break;
          }
      }
  }

  /**
   * @param url
   * 
   * url = Song Preview_url
   * 
   * Function will return an audio clip given by the preview url
   */

   function songSnippet(url){
       playSong = new Audio(url);
       playSong.volume = 0.3;
       return playSong.play()
   }

   /**
    * NO PARAMS
    * 
    * Function returns event to stop song snippet
    */
   function stopSnippet(){
       return playSong.pause();
   }
# Takt
 **Takt** is a web app that revolves around virtual rooms where multiple Spotify users can collaboratively create song queues together. Either play the queue from a single device connected to a speaker or tune in with your own and listen (semi) synchronously together.   

# Disclaimers
Takt is still very much a work in progress and thus pretty rough around the edges. It is not deemed production-quality and should be considered more of a proof of concept than anything else. Bugs may still appear. Please use the application at your own discretion.  

The synchronization is not yet 100% promised and there is often a slight hickup in the synch, mainly because of two reasons. 1) the free-tier heroku server that Takt is hosted on is kind of limited in its speed. 2) Takt works by making concurrent API-calls to the Spotify web API. Calls seem to be handled at different speeds in the web API making the playback start with differences of milliseconds; obviously this is beyond my reach.  

# Demo

**Live demo**: [https://takt-application.herokuapp.com/](https://takt-application.herokuapp.com/) (Can be very slow at times, especially at start-up. Please be patient.)

![demo_of_creating_rooms](demo/create_room.gif)

![demo_of_playing_songs](demo/play_songs.gif)

# User data persistence
User data is not persisted in a database of any kind. It is only stored in HashMaps for as long as the user is logged in.

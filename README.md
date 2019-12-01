# Takt
 **Takt** is a web app that revolves around virtual rooms where multiple Spotify users can collaboratively create song queues together. Either play the queue from a single device connected to a speaker or tune in with your own and listen (semi) synchronously together.   

# Disclaimers
Takt is still very much a work in progress and thus pretty rough around the edges. It is not deemed production-quality and should be considered more of a proof of concept than anything else. Bugs may still appear. Please use the application at your own discretion.  

The synchronization is not yet 100% promised and there is often a slight hickup in the synch, mainly because of two reasons. 1) the free-tier heroku server that Takt is hosted on is kind of limited in its speed. 2) Takt works by making concurrent API-calls to the Spotify web API. Calls seem to be handled at different speeds in the web API making the playback start with differences of milliseconds; obviously this is beyond my reach.  

# Demo

**Live demo**: [https://takt-application.herokuapp.com/](https://takt-application.herokuapp.com/) (Can be very slow at times, especially at start-up. Please be patient.)

![demo_of_creating_rooms](demo/create_room.gif)

![demo_of_playing_songs](demo/play_songs.gif)

# How it works
**Takt** works mainly by RoomPlayer objects that holds a LinkedList with Tracks. Tracks can be added to the LinkedList and then played. The play-function works in the following way:
* tracks are sent in an array as a _context_ to the Spotify api
* a pointer is set to the last track sent in the _context_
* peek the list-header
* if the header == track pointer (indicating that we're at the end of the sent _context_ and need to send a new one), grab the LinkedList and send the tracks in an array as a _context_
* then, pop the List and set a pointer to the popped track, indicating the currently playing track

The RoomPlayer is subsequently handled by a track queue scheduler. The scheduler has a single threaded scheduled executor service that schedules a runnable task that calls the _play function_ of the RoomPlayer. The executor service schedules these runnables at intervals of the currently playing track's runtime. 

# User data persistence
User data is not persisted in a database of any kind. It is only stored in HashMaps for as long as the user is logged in.

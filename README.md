# Pandify
This is a ReactJS experiment to consolidate managing music services.  Its inception and current state are as a personal sandbox to learn ReactJS including working with third party APIs and the techniques involved in high-latency transactions.

A more final state  goal would be to be able to manage playlists, etc. across Spotify and Pandora with synching options between the two.  These features would sit on top of the somewhat more easily guessable features like searching, sorting and manipulating playlists within a specific service.

In order to have the actual Spotify-connecting parts working, the oauth-bridge-template server needs to be started once the spotify client ID and secret have been supplied.

5/12/2020 Status
Still an early prototype.  Currently there are two conceptual pathways.  The original functionality around more basic listings and navigating between "pages" was being built under the Playlists and Songs menu items.
SpotifyUI is wehre more recent tutorial and research work has been culminating.  Much of the layout is drawn heavily from tutorial followed by my own experiments.  The underlying data retrieval and packaging grew from tutorial more to my own current assumptions of where this might ultimately head.

Credits:
While I've befriended Google and StackExchange even more closely lately, credit at minumum MUST go out to MPJ and DataDavid, for their DevTips series on building a React-based Spotify API prototype: https://www.youtube.com/watch?v=Mg7Ma5i8NgM&list=PLqGj3iMvMa4LFqyGab_aR7M0zfQm2KTuX&index=1.

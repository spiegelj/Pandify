using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Songify.Models
{
    interface IPlaylistRepository
    {
        public Playlist GetPlaylist(int playlistId);

        public int SavePlaylist(Playlist updatePlaylist);
    }
}

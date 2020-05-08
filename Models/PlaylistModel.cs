using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Songify.Models
{
    public class PlaylistModel
    {
        int playlistId;
        string name;
        string description;
        List<SongModel> songs;
    }
}

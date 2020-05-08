using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Songify.Models
{
    public class SongModel
    {
        public int id;  //Change to songId
        public string title;
        public string artist;
        public string lyrics;
        public List<PlaylistModel> membership;
    }
}

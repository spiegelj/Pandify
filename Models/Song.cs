using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Songify.Models
{
    public class Song
    {
        public int songId { get; set; }
        public string title { get; set; }
        public string artist { get; set; }
        public string lyrics { get; set; }
        public List<PlaylistDescriptor> membership { get; set; }
    }
}

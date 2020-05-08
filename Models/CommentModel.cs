using System;

namespace ReactDemo.Models
{
    public class CommentModel
    {
        public int Id { get; set; }
        public string Author { get; set; }
        public string Text { get; set; }
        public string Last { get; set; }
        public int songId { get; set; }
        public string title { get; set; }
        public string artist { get; set; }
        public string lyrics { get; set; }
    }
}
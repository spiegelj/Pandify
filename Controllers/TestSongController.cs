using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using System.Xml.Linq;
using Songify.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using ReactDemo.Models;

namespace Songify.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestSongController : Controller
    {
        // GET: api/SongApi
        [HttpGet]
        //public IEnumerable<string> Get()
        public ActionResult Get()
        {
            SongRepository repo = new SongRepository();
            List<Song> songs = repo.GetSongs();
            
            string x = "[{\"title\":\"Yesterday\",\"artist\":\"The Beatles\"},{\"title\":\"Sympathy for the Devil\",\"artist\": \"Rolling Stones\"}]";
            var inspect = Json(songs);
            //return Json(_comments);
            return Json(songs);
            //return "{\"title\":\"Yesterday\",\"artist\":\"The Beatles\"}";
            //return x;
            //return JsonConvert.SerializeObject(songs);
            //return new string[] { "value1", "value2" };
        }

        // GET: api/SongApi/5
        [HttpGet("{id}")]
        [Route("testsong/{id}")]
        public string Get(int id)
        {
            SongRepository repo = new SongRepository();
            Song song = repo.GetSong(id);

            return JsonConvert.SerializeObject(song);
        }

        // POST: api/SongApi
        [HttpPost]
        public string Post([FromBody] JsonElement updateSong)
        {
            SongRepository repo = new SongRepository();
            string json = System.Text.Json.JsonSerializer.Serialize(updateSong);
            Song song = (Song)JsonConvert.DeserializeObject(json, typeof(Song));
            int result = repo.SaveSong(song);
            return $"{{\"result\":{result}}}";
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            SongRepository repo = new SongRepository();
            int result = repo.DeleteSong(id);

            return $"{{\"result\":{result}}}";
        }

    }
}

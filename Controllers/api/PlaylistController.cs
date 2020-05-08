using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Songify.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace Songify.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlaylistController : Controller
    {
        public IConfiguration config;
        public PlaylistRepository repo;
        public PlaylistController(IConfiguration configuration)
        {
            config = configuration;
            repo = new PlaylistRepository(config);
        }
        // GET: api/PlaylistApi
        [HttpGet]
        public string Get()
        {
            List<PlaylistDescriptor> playlists = repo.GetPlaylists();

            return JsonConvert.SerializeObject(playlists);
            //return new string[] { "value1", "value2" };
        }

        // GET: api/PlaylistApi/5
        [HttpGet("{id}")]
        [Route("api/playlist/{id}")]
        public string Get(int id)
        {
            Playlist playlist = repo.GetPlaylist(id);

            return JsonConvert.SerializeObject(playlist);
        }

        // POST: api/PlaylistApi
        [HttpPost]
        public string Post([FromBody] JsonElement updatePlaylist)
        {
            string json = System.Text.Json.JsonSerializer.Serialize(updatePlaylist);
            Playlist playlist = (Playlist)JsonConvert.DeserializeObject(json, typeof(Playlist));
            int result = repo.SavePlaylist(playlist);
            return $"{{\"result\":{result}}}";
        }

        // PUT: api/PlaylistApi/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

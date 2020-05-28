using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace oktatest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    [Authorize]

    public class MessagesController : ControllerBase
    {
        [HttpGet]
        [Route("~/api/messages")]
        public ActionResult Get()
        {
            var principal = HttpContext.User.Identity as ClaimsIdentity;

            var login = principal.Claims
                .SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)
                ?.Value;

            return Ok(new
            {
                messages = new dynamic[]
                {
                new { Date = DateTime.Now, Text = "I am a Robot." },
                new { Date = DateTime.Now, Text = "Hello, world!" },
                }
            });
        }
    }
}
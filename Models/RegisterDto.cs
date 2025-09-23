using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartedAfricaApiAuth.Data.Models
{
    public class RegisterDto
    {
        public string Email { get; set; } = default!;
        public string Password { get; set; } = default!;
    }
}
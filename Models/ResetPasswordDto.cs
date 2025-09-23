using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartedAfricaApiAuth.Models
{
    public class ResetPasswordDto
    {
        public string Email { get; set; } = default!;
        public string Token { get; set; } = default!;
        public string NewPassword { get; set; } = default!;
    }
}
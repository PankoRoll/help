using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TasksAPI.Models
{
    public class Tasks_DB
    {
        [Key]
        public int id { get; set; }
        public string name { get; set; }
        public bool done { get; set; }
    }
}

using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TasksAPI.Models;

namespace TasksAPI.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options): base (options)
        {

        }

        public DbSet<Tasks_DB> tasks_db { get;set;}
    }
}

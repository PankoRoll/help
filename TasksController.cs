using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TasksAPI.Context;
using TasksAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TasksAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext context;
        public TasksController(AppDbContext context)
        {
            this.context = context;
        }
        // GET: api/<TasksController>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(context.tasks_db.ToList());
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET api/<TasksController>/5
        [HttpGet("{id}", Name = "GetTask")]
        public ActionResult Get(int id)
        {
            try
            {
                var task = context.tasks_db.FirstOrDefault(t => t.id == id);
                return Ok(task);
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<TasksController>
        [HttpPost]
        public ActionResult Post([FromBody] Tasks_DB task)
        {
            try
            {
                task.done = false;
                context.tasks_db.Add(task);
                context.SaveChanges();
                return CreatedAtRoute("GetTask", new { id = task.id }, task);
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<TasksController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Tasks_DB task)
        {
            try
            {
                if (task.id == id)
                {

                    context.Entry(task).State = EntityState.Modified;
                    context.SaveChanges();
                    return CreatedAtRoute("GetTask", new { id = task.id }, task);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<TasksController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                var task = context.tasks_db.FirstOrDefault(t => t.id == id);
                if (task!=null)
                {
                    context.tasks_db.Remove(task);
                    context.SaveChanges();
                    return Ok(id);
                }
                else
                {
                    return BadRequest();
                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

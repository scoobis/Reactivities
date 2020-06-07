using System;

namespace Domain
{
    public class Activity
    {
        public Guid id { get; set; }
        public String Title { get; set; }
        public String Description { get; set; }
        public String Catagory { get; set; }
        public DateTime Date { get; set; }
        public String City { get; set; }
        public String Venue { get; set; }
    }
}
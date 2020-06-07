using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistance;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {

            public Guid id { get; set; }
            public String Title { get; set; }
            public String Description { get; set; }
            public String Catagory { get; set; }
            public DateTime Date { get; set; }
            public String City { get; set; }
            public String Venue { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = new Activity{
                    id = request.id,
                    Title = request.Title,
                    Description = request.Description,
                    Catagory = request.Catagory,
                    Date = request.Date,
                    City = request.City,
                    Venue = request.Venue
                };

                context.Activities.Add(activity);
                var success = await context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}
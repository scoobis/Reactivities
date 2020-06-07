using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistance;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid id { get; set; }
            public String Title { get; set; }
            public String Description { get; set; }
            public String Catagory { get; set; }
            public DateTime? Date { get; set; }
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

                        var activity = await context.Activities.FindAsync(request.id);

                        if (activity == null) throw new Exception("Could not find activity");

                        activity.Title = request.Title ?? activity.Title;
                        activity.Description = request.Description ?? activity.Description;
                        activity.Catagory = request.Catagory ?? activity.Catagory;
                        activity.Date = request.Date ?? activity.Date;
                        activity.City = request.City ?? activity.City;
                        activity.Venue = request.Venue ?? activity.Venue;

                        var success = await context.SaveChangesAsync() > 0;
        
                        if (success) return Unit.Value;
        
                        throw new Exception("Problem saving changes");
                    }
                }
    }
}
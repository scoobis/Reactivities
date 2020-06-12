using System;
using System.Net;

namespace Application.Errors
{
    public class RestException : Exception
    {
        public object Errors { get; set; }
        public HttpStatusCode Code { get; set; }

        public RestException(HttpStatusCode code, object errors = null)
        {
            this.Code = code;
            this.Errors = errors;
        }
    }
}
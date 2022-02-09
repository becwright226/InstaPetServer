/* 
    Cross Origin Resource Sharing (CORS)

    Mechanism that uses additional HTTP headers to tell browser to give a web application running at one origin access to selected resources from different origin.

    It works by adding new HTTP headers that let servefrs describe which origins are permitted to read that information from the browser.

    ! Preflight Request

    * CORS request that cehcks to see if the CORS protocol is understood.
    * Preflight request is automatically issued by a browser.
        * ex: client asking server if it allows DELETE request before sending the DELETE request.
    * Automatic in Postman. But we will need to factor it in when we build our front ends.

    * access-control-allow-origin --> response header that tells the browser to allow code from any origin.

    * access-control-allow-methods --> response header that specifies the methods allowed when accessing the resource in response to a preflight request.

    * access-control-allow-headers --> response header that's used in response to a preflight request that indicates which HTTP headers can be used during an actual request.
*/

module.exports = (req, res, next) => {
  res.header("access-control-allow-origin", "*");
  res.header("access-control-allow-methods", "GET, POST, PUT, DELETE");
  res.header(
    "access-control-allow-headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  next();
};

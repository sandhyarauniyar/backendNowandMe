The project is build in Node.js. 
The database used is MySQL. 

Database structure

Users table - for storing users information
Thoughts table - for storing thoughts as per userId
Replies table - for storing replies

Authentication & Authorization method 

JWT is used for authentication where token is generated on every login and when exposing APIs these tokens are verified in middleware.


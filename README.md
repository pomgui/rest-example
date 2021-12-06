
# Rest-example

Example of use @pomgui/rest-codegen and @pomgui/database

  

## How to use

- Clone repo.
- Initiate the dockerized database engine and create the database files (the script uses `sudo`, so it will ask for password)
`$ ./bin/db.sh start`

- Create tables
`$ ./bin/db.sh createdb`

- Install npm packages
`$ npm install`

- Run the server
`$ npm start`

- In a browser (ou with `curl`) test the following  urls:
```
http://localhost:8080/v1/cities
http://localhost:8080/v1/stations?latitude=48.8788744&longitude=2.3502198&adddress=wil
http://localhost:8080/v1/stations/123/books
``` 
- The tests can be run with:
`npm test`

- To get the coverage report:
`npm run test:cover`
  - And open the file `./coverage/index.html` 

- To Stop the database engine and remove the docker container:
`$ ./bin/db.sh stop`

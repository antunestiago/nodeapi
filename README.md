### nodeapi
A node API to CRUD operation using Node.js + Express.js + MongoDB

### Requiriments
- Node v14.15.4

# Install
```bash 
    npm install
```

# Run server with docker-compose
```bash 
    docker-compose up -d
    npm start
```

# Run tests with docker-compose
```bash 
    docker-compose up -d
    npm test
```

# Run server with docker container
```bash 
    docker container run --name mydatabase --publish 27017:27017 -d mongo 
    npm start
```

APIs
GET: /api/planets  (List all planets paginated)
GET: /api/planets/:id  (Get planet by id)
DELETE: /api/planets/:id  (Delete planet by id)
POST: /api/planets/  (Create a planet)

GET: /api/planets?name=tatooine  (Filter planet by name)

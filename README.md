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
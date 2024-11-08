const express = require('express');
const { ApolloServer } = require('@apollo/server');
const path = require('path');
const { expressMiddleware } = require('@apollo/server/express4');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const User = require('./models/User'); // Import the User model
const jwt = require('jsonwebtoken'); // Import JWT for token generation

const { authMiddleware } = require('./utils/auth');




const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers
});

const startApolloServer = async () => {
    try {
      await server.start();
      console.log('Apollo Server started successfully'); // Debug log
  
      app.use(express.urlencoded({ extended: true }));
      app.use(express.json());
  
    app.use('/graphql', expressMiddleware(server, {
      context: authMiddleware
    }));
  
      db.once('open', () => {
        app.listen(PORT, () => {
          console.log(`API server running on port ${PORT}!`);
          console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
        });
      });
  
      db.on('error', (err) => {
        console.error('Database connection error:', err);
      });
    } catch (error) {
      console.error('Error starting Apollo Server:', error);
    }
  };

  startApolloServer();
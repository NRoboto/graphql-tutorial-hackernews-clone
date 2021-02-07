const fs = require("fs");
const path = require("path");
const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");

const prisma = new PrismaClient();

const resolvers = {
  Query,
  Mutation,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  context: {
    prisma,
  },
});

server
  .listen()
  .then(({ url }) => console.log(`Server is listening on ${url}`))
  .catch((e) => {
    throw e;
  });

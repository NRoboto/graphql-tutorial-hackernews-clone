const fs = require("fs");
const path = require("path");
const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const { PubSub } = require("apollo-server");

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link");
const Vote = require("./resolvers/Vote");
const Subscription = require("./resolvers/Subscription");
const { APP_SECRET, getUserId } = require("./utils");

const prisma = new PrismaClient();
const pubSub = new PubSub();

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  context: ({ req }) => ({
    ...req,
    prisma,
    pubSub,
    userId: req && req.headers.authorization ? getUserId(req) : null,
  }),
});

server
  .listen()
  .then(({ url }) => console.log(`Server is listening on ${url}`))
  .catch((e) => {
    throw e;
  });

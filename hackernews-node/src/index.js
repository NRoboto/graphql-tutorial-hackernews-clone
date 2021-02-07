const fs = require("fs");
const path = require("path");
const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    info: () => `This is the API of a hackernews clone!`,
    feed: async () => await prisma.link.findMany(),
    link: async (_parent, args) =>
      await prisma.link.findUnique({ where: { id: Number.parseInt(args.id) } }),
  },

  Mutation: {
    post: async (_parent, args) => {
      const link = await prisma.link.create({
        data: {
          description: args.description,
          url: args.url,
        },
      });

      return link;
    },
    updateLink: async (_parent, args) => {
      const link = await prisma.link.update({
        where: {
          id: Number.parseInt(args.id),
        },
        data: {
          url: args.url,
          description: args.description,
        },
      });

      return link;
    },
    deleteLink: async (_parent, args) => {
      const link = await prisma.link.delete({
        where: {
          id: Number.parseInt(args.id),
        },
      });

      return link;
    },
  },
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

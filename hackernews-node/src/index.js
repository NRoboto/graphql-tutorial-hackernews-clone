const fs = require("fs");
const path = require("path");

const { ApolloServer } = require("apollo-server");

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
];

let idCount = 1;

const resolvers = {
  Query: {
    info: () => `This is the API of a hackernews clone!`,
    feed: () => links,
    link: (_parent, args) => links.find((link) => link.id === args.id),
  },

  Mutation: {
    post: (_parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };

      links = [...links, link];
      return link;
    },
    updateLink: (_parent, args) => {
      const index = links.findIndex((link) => link.id === args.id);

      const link = links[index];

      if (args.url) link.url = args.url;
      if (args.description) link.description = args.description;

      return link;
    },
    deleteLink: (_parent, args) => {
      const index = links.findIndex((link) => link.id === args.id);
      const link = links[index];
      links = [...links.slice(0, index), ...links.slice(index + 1)];

      return link;
    },
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server is listening on ${url}`));

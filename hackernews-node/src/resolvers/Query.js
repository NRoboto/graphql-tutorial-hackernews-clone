const info = () => `This is the API of a hackernews clone!`;

const feed = async (_parent, _args, context) =>
  await context.prisma.link.findMany();

const link = async (_parent, args, context) =>
  await context.prisma.link.findUnique({
    where: { id: Number.parseInt(args.id) },
  });

module.exports = {
  info,
  feed,
  link,
};

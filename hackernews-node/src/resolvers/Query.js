const info = () => `This is the API of a hackernews clone!`;

const feed = async (_parent, args, context) =>
  await context.prisma.link.findMany({
    where: args.filter
      ? {
          OR: [
            { description: { contains: args.filter } },
            { url: { contains: args.filter } },
          ],
        }
      : {},
    skip: args.skip,
    take: args.take,
  });

const link = async (_parent, args, context) =>
  await context.prisma.link.findUnique({
    where: { id: Number.parseInt(args.id) },
  });

module.exports = {
  info,
  feed,
  link,
};

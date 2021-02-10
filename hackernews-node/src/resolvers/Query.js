const info = () => `This is the API of a hackernews clone!`;

const feed = async (_parent, args, context) => {
  const where = args.filter
    ? {
        OR: [
          { description: { contains: args.filter } },
          { url: { contains: args.filter } },
        ],
      }
    : {};

  const links = await context.prisma.link.findMany({
    where,
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy,
  });

  const count = await context.prisma.link.count({ where });

  return {
    links,
    count,
  };
};

const link = async (_parent, args, context) =>
  await context.prisma.link.findUnique({
    where: { id: Number.parseInt(args.id) },
  });

module.exports = {
  info,
  feed,
  link,
};

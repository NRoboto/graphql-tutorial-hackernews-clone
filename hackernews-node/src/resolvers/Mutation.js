const post = async (_parent, args, context) => {
  const link = await context.prisma.link.create({
    data: {
      description: args.description,
      url: args.url,
    },
  });

  return link;
};

const updateLink = async (_parent, args, context) => {
  const link = await context.prisma.link.update({
    where: {
      id: Number.parseInt(args.id),
    },
    data: {
      url: args.url,
      description: args.description,
    },
  });

  return link;
};

const deleteLink = async (_parent, args, context) => {
  const link = await context.prisma.link.delete({
    where: {
      id: Number.parseInt(args.id),
    },
  });

  return link;
};

module.exports = {
  post,
  updateLink,
  deleteLink,
};

const postedBy = async (parent, _args, context) =>
  await context.prisma.link.findUnique({ where: { id: parent.id } }).postedBy();

const votes = async (parent, _args, context) =>
  await context.prisma.link.findUnique({ where: { id: parent.id } }).votes();

module.exports = {
  postedBy,
  votes,
};

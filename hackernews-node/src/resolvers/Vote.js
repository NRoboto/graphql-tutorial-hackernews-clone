const link = async (parent, _args, context) =>
  await context.prisma.vote.findUnique({ where: { id: parent.id } }).link();

const user = async (parent, _args, context) =>
  await context.prisma.vote.findUnique({ where: { id: parent.id } }).user();

module.exports = {
  link,
  user,
};

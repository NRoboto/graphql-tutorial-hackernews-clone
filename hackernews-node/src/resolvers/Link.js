const postedBy = async (parent, _args, context) =>
  await context.prisma.link.findUnique({ where: { id: parent.id } }).postedBy();

module.exports = {
  postedBy,
};

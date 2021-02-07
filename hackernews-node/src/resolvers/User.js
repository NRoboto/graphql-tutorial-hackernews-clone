const links = async (parent, args, context) =>
  context.prisma.user.findUnique({ where: { id: parent.id } }).links();

module.exports = {
  links,
};

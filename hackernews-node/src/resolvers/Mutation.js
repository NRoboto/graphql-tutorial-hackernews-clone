const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

const post = async (_parent, args, context) => {
  const { userId } = context;

  const link = await context.prisma.link.create({
    data: {
      description: args.description,
      url: args.url,
      postedBy: { connect: { id: userId } },
    },
  });

  context.pubSub.publish("NEW_LINK", link);

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

const signup = async (_parent, args, context) => {
  const password = await bcrypt.hash(args.password, 10);

  const user = await context.prisma.user.create({
    data: { ...args, password },
  });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
};

const login = async (_parent, args, context) => {
  const user = await context.prisma.user.findUnique({
    where: { email: args.email },
  });
  if (!user) throw new Error("No user with this email exists");

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) throw new Error("Invalid password");

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
};

const vote = async (_parent, { linkId }, context) => {
  const userId = getUserId(context);

  const vote = await context.prisma.vote.findUnique({
    where: {
      linkId_userId: {
        linkId: Number(linkId),
        userId,
      },
    },
  });

  if (!!vote) throw new Error(`Already voted for link: ${linkId}`);

  const newVote = await context.prisma.vote.create({
    data: {
      user: { connect: { id: userId } },
      link: { connect: { id: Number(linkId) } },
    },
  });

  context.pubSub.publish("NEW_VOTE", newVote);

  return newVote;
};

module.exports = {
  post,
  updateLink,
  deleteLink,
  signup,
  login,
  vote,
};

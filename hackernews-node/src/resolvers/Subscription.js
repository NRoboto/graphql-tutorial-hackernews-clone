const newLinkSubscribe = (_parent, _args, context) =>
  context.pubSub.asyncIterator("NEW_LINK");

const newLink = {
  subscribe: newLinkSubscribe,
  resolve: (payload) => payload,
};

const newVoteSubscribe = (_parent, _args, context) =>
  context.pubSub.asyncIterator("NEW_VOTE");

const newVote = {
  subscribe: newVoteSubscribe,
  resolve: (payload) => payload,
};

module.exports = {
  newLink,
  newVote,
};

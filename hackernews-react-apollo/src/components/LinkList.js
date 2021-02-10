import { Link } from "./Link";

const LinkList = () => {
  const linksToRender = [
    {
      id: "1",
      description: "Prisma gives you a powerful database toolkit 😎",
      url: "https://prisma.io",
    },
    {
      id: "2",
      description: "The best GraphQL client",
      url: "https://www.apollographql.com/docs/react/",
    },
  ];

  return (
    <div>
      {linksToRender.map((link) => (
        <Link link={link} key={link.id} />
      ))}
    </div>
  );
};

export { LinkList };

import { Link } from "./Link";
import { useQuery, gql } from "@apollo/client";

export const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

const LinkList = () => {
  const { data } = useQuery(FEED_QUERY);

  return (
    <div>
      {data && (
        <>
          {data.feed.links.map((link, index) => (
            <Link link={link} index={index} key={link.id} />
          ))}
        </>
      )}
    </div>
  );
};

export { LinkList };

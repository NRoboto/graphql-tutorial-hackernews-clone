import { Link, useHistory } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";

const Seperator = () => <div className="ml1">|</div>;

const Header = () => {
  const history = useHistory();
  const authToken = localStorage.getItem(AUTH_TOKEN);

  return (
    <div className="flex pal justify-between nowrap orange">
      <div className="flex flex-fixed black">
        <div className="fw7 mr1">Hacker News</div>
        <Link to="/" className="ml1 no-underline black">
          new
        </Link>
        <Seperator />
        <Link to="/top" className="ml1 no-underline black">
          top
        </Link>
        <Seperator />
        <Link to="/search" className="ml1 no-underline black">
          search
        </Link>

        {authToken && (
          <div className="flex">
            <Seperator />
            <Link to="/create" className="ml1 no-underline black">
              submit
            </Link>
          </div>
        )}
      </div>

      <div className="flex flex-fixed">
        {authToken ? (
          <div
            className="ml1 pointer black"
            onClick={() => {
              localStorage.removeItem(AUTH_TOKEN);
              history.push("/");
            }}
          >
            logout
          </div>
        ) : (
          <Link to="/login" className="ml1 no-underline black">
            login
          </Link>
        )}
      </div>
    </div>
  );
};

export { Header };

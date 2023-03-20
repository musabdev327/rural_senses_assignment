import { Fragment } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Fragment>
      <div>
        <h2>Page Not Found !!!</h2>
        <Link to="/">
          <p>back to homepage....</p>
        </Link>
      </div>
    </Fragment>
  );
};

export default NotFound;

import PropTypes from 'prop-types';

import { Navigate } from "react-router-dom"

function OpenRoute({ children }) {
  // const { token } = useSelector((state) => state.user)
  const token = localStorage.getItem("token")

  if (token === null || token === undefined) {
    return children
  } else {
    return <Navigate to={"/dashboard/my-profile"} />
  }
}
OpenRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default OpenRoute
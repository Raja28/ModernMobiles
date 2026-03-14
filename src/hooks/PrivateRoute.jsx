import PropTypes from 'prop-types';
import { Navigate } from "react-router-dom"

function PrivateRoute({ children }) {

    const token = localStorage.getItem("token")

    if (token !== null && token !== undefined) {
        return children
    } else {
        return <Navigate to="/login" />
    }
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute
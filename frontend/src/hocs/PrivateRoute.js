import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children, isAuthenticated }) {
    
    if(isAuthenticated === null) {
        return <div>Loading...</div>
    }
    
    if(!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return children;

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(PrivateRoute);
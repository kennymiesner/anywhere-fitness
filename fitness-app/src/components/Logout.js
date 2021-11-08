import React from "react";
import { connect } from 'react-redux';
import { logout } from '../actions/loginActions';

class Logout extends React.Component {

    componentDidMount() {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("email");
        this.props.logout();
        this.props.history.push('/login');
    };

    render() {
        return (
            <div></div>
        )
    }
}


export default connect(null, { logout })(Logout);
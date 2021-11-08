import "./App.css";
import { Link, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import ProtectedUsersRoute from "./components/user/ProtectedUsersRoute";
import Classes from "./components/user/Classes";
import ClassDetails from "./components/user/ClassDetails";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Registration from "./components/Registration";
import Home from "./components/Home";
import ProtectedInstructorsRoute from "./components/admin/ProtectedInstructorsRoute";
import ClassesAdmin from "./components/admin/ClassesAdmin";
import EditForm from "./components/admin/EditForm";
import AddClass from "./components/admin/AddClass";
import Bookings from "./components/user/Bookings";

function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Anywhere Fitness</h1>
        <div className="nav-bar">
          <nav>
            <div className="nav-links">
              <Link to="/">Home</Link>
              {
                props.role === "u" || localStorage.getItem("role") === "u" ? <Link to="/class">Classes</Link> : null
              }
              {
                props.role === "u" || localStorage.getItem("role") === "u" ? <Link to="/bookings">Bookings</Link> : null
              }
              {
                props.role === "i" || localStorage.getItem("role") === "i" ? <Link to="/add-class">Add a class</Link> : null
              }
              {
                props.role === "i" || localStorage.getItem("role") === "i" ? <Link to="/class-admin">View classes</Link> : null
              }
              {
                props.isLogin ? <Link to="/logout">Logout</Link> : <Link to="/login">Login</Link>
              }
            </div>
          </nav>
          <div className="welcome">
            {props.isLogin &&
              <h2 className="welcome-message">Welcome, {props.email ? props.email : localStorage.getItem("email")}</h2>
            }
          </div>
        </div>

      </header>

      <Switch>
        <ProtectedUsersRoute path="/bookings" component={Bookings} />

        <ProtectedUsersRoute path="/class/:id" component={ClassDetails} />

        <ProtectedUsersRoute path="/class" component={Classes} />

        <ProtectedInstructorsRoute path="/add-class" component={AddClass} />

        <ProtectedInstructorsRoute
          path="/class-admin/edit-form/:id"
          component={EditForm}
        />

        <ProtectedInstructorsRoute
          path="/class-admin"
          component={ClassesAdmin}
        />

        <Route path="/login" component={Login} />

        <Route path="/logout" component={Logout} />

        <Route path="/register" component={Registration} />

        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.loginReducer.isLogin,
    role: state.loginReducer.role,
    email: state.loginReducer.email,
  };
};

export default connect(mapStateToProps)(App);

import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Switch, Route } from "react-router-dom";
import StudentList from "./components/students-list.component";
import AddStudent from "./components/add-student.component";
import Student from "./components/student.component";

class App extends Component{
  render(){
    return (
      <div>
        <nav className="navbar bavbar-expand navbar-dark bg-dark">
          <a href="/students" className="navbar-brand">
            MJ
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/students"} className="nav-link">
                  Students
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                  Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/students"]} component={StudentList} />
            <Route exact path="/add" component={AddStudent} />
            <Route path="/students/:id" component={Student} />         
          </Switch>
        </div>

      </div>
    )
  }
}

export default App;
import { Component } from "react";
import { Link } from "react-router-dom";
import StudentDataService from "../services/student.service";

export default class StudentList extends Component{
    constructor(props){
        super(props);
        this.onChangeSearchFname = this.onChangeSearchFname.bind(this);
        this.retrieveStudents = this.retrieveStudents.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveStudent = this.setActiveStudent.bind(this);
        this.removeAllStudents = this.removeAllStudents.bind(this);
        this.searchFname = this.searchFname.bind(this);

        this.state = {
            students: [],
            currentStudents: null,
            currentIndex: -1,
            searchFname: ""
        }
    }

    componentDidMount(){
        this.retrieveStudents();
    }

    onChangeSearchFname(e){
        const searchFname = e.target.value;

        this.setState({
            searchFname: searchFname
        })
    }

    retrieveStudents(){
        StudentDataService.getAll()
            .then(response => {
                this.setState({
                    students:response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    refreshList(){
        this.retrieveStudents();
        this.setState({
            currentStudents: null,
            currentIndex: -1
        })
    }

    setActiveStudent(student, index){
        this.setState({
            currentStudents: student,
            currentIndex: index
        })
    }

    removeAllStudents(){
        StudentDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            })
    }

    searchFname(){
        StudentDataService.findByFname(this.state.searchFname)
            .then(response => {
                this.setState({
                    students: response.data
                })
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    render(){
        const { searchFname, students, currentStudents, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by First Name"
                            value={searchFname}
                            onChange={ this.onChangeSearchFname }
                        />

                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={ this.searchFname }
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Students List</h4>

                    <ul className="list-group">
                        {
                            students &&
                                students.map((student, index) => (
                                    <li
                                        className={
                                            "list-group-item" +
                                            (index === currentIndex ? "active" : "")
                                        }
                                        onClick={() => this.setActiveStudent(student, index)}
                                        key={index}
                                    >
                                        {student.fname}
                                    </li>
                                ))
                        }
                    </ul>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={ this.removeAllStudents }
                    >
                        Remove All
                    </button>
                </div>

                <div className="col-md-6">
                    { 
                        currentStudents ? (
                            <div>
                                <h4>Student</h4>
                                <div>
                                    <label>
                                        <strong>First Name: </strong>
                                    </label>
                                    { currentStudents.fname }
                                </div>
                                <div>
                                    <label>
                                        <strong>Last Name: </strong>
                                    </label>
                                    { currentStudents.lname }
                                </div>
                                <div>
                                    <label>
                                        <strong>Email: </strong>
                                    </label>
                                    { currentStudents.email }
                                </div>
                                <div>
                                    <label>
                                        <strong>Date of Birth: </strong>
                                    </label>
                                    { currentStudents.dob }
                                </div>
                                <div>
                                    <label>
                                        <strong>Short Bio: </strong>
                                    </label>
                                    { currentStudents.sbio }
                                </div>

                                <Link
                                    to={ "/students/" + currentStudents.id }
                                    className= "badge badge-warning"
                                >
                                    Edit
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <br />
                                <p>Please click on a Student...</p>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}
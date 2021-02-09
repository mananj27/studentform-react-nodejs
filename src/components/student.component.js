import { Component } from "react";
import StudentDataService from "../services/student.service";

export default class Student extends Component{
    constructor(props){
        super(props);
        this.onChangeFname = this.onChangeFname.bind(this);
        this.onChangeLname = this.onChangeLname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeDOB = this.onChangeDOB.bind(this);
        this.onChangeSbio = this.onChangeSbio.bind(this);
        this.getStudent = this.getStudent.bind(this);
        this.updateStudent = this.updateStudent.bind(this);
        this.deleteStudent = this.deleteStudent.bind(this);

        this.state = {
            currentStudent: {
                id: null,
                fname: "",
                lname: "",
                email: "",
                dob: "",
                sbio: "",
            },
            message: ""
        };
    }

    componentDidMount(){
        this.getStudent(this.props.match.params.id);
    }

    onChangeFname(e){
        const fname = e.target.value;

        this.setState(prevState => {
            return {
                currentStudent: {
                    ...prevState.currentStudent,
                    fname: fname
                }
            }
        })
    }

    onChangeLname(e){
        const lname = e.target.value;

        this.setState(prevState => {
            return {
                currentStudent: {
                    ...prevState.currentStudent,
                    lname: lname
                }
            }
        })
    }

    onChangeEmail(e){
        const email = e.target.value;

        this.setState(prevState => {
            return {
                currentStudent: {
                    ...prevState.currentStudent,
                    email: email
                }
            }
        })
    }

    onChangeDOB(e){
        const dob = e.target.value;

        this.setState(prevState => {
            return {
                currentStudent: {
                    ...prevState.currentStudent,
                    dob: dob
                }
            }
        })
    }

    onChangeSbio(e){
        const sbio = e.target.value;

        this.setState(prevState => {
            return {
                currentStudent: {
                    ...prevState.currentStudent,
                    sbio: sbio
                }
            }
        })
    }

    getStudent(id){
        StudentDataService.get(id)
            .then(response => {
                this.setState({
                    currentStudent: response.data
                })
                console.log(response.data);
            })
            .catch(e =>{
                console.log(e);
            })
    }

    updateStudent(){
        StudentDataService.update(
            this.state.currentStudent.id,
            this.state.currentStudent
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The student was updated successfully!"
                })
            })
            .catch(e => {
                console.log(e);
            })
    }

    deleteStudent(){
        StudentDataService.delete(this.state.currentStudent.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/students')
            })
            .catch(e => {
                console.log(e);
            })
    }

    render(){
        const { currentStudent } = this.state;

        return (
            <div>
                {
                    currentStudent ? (
                        <div className="edit-form">
                            <h4>Student</h4>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="fname">First Name</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        id="fname"
                                        value={ currentStudent.fname }
                                        onChange={ this.onChangeFname }
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lname">Last Name</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        id="lname"
                                        value={ currentStudent.lname }
                                        onChange={ this.onChangeLname }
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        value={ currentStudent.email }
                                        onChange={ this.onChangeEmail }
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dob">Date of Birth</label>
                                    <input 
                                        type="integer"
                                        className="form-control"
                                        id="dob"
                                        value={ currentStudent.dob }
                                        onChange={ this.onChangeDOB }
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="sbio">Short Bio</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        id="sbio"
                                        value={ currentStudent.sbio }
                                        onChange={ this.onChangeSbio }
                                    />
                                </div>
                            </form>

                            <button
                                className="badge badge-danger mr-2"
                                onClick={ this.deleteStudent }
                            >
                                Delete
                            </button>
                            
                            <button
                                type="submit"
                                className="badge badge-success"
                                onClick={ this.updateStudent }
                            >
                                Update
                            </button>
                            <p>{ this.state.message }</p>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Student...</p>
                        </div>
                    )
                }
            </div>
        )
    }
}
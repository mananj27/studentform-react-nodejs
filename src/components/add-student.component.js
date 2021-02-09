import React, { Component } from "react";
import StudentDataService from "../services/student.service";

export default class AddStudent extends Component{
    constructor(props){
        super(props);
        this.onChangeFname = this.onChangeFname.bind(this);
        this.onChangeLname = this.onChangeLname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeDOB = this.onChangeDOB.bind(this);
        this.onChangeSbio = this.onChangeSbio.bind(this);
        this.saveStudent = this.saveStudent.bind(this);
        this.newStudent = this.newStudent.bind(this);

        this.state = {
            id: null,
            fname: "",
            lname: "",
            email: "",
            dob: "",
            sbio: "",
            submitted: false
        }
    }

    onChangeFname(e){
        this.setState({
            fname: e.target.value
        });
    }

    onChangeLname(e){
        this.setState({
            Lname: e.target.value
        })
    }

    onChangeLname(e){
        this.setState({
            Lname: e.target.value
        })
    }

    onChangeEmail(e){
        this.setState({
            Email: e.target.value
        })
    }

    onChangeDOB(e){
        this.setState({
            DOB: e.target.value
        })
    }

    onChangeSbio(e){
        this.setState({
            Sbio: e.target.value
        })
    }

    saveStudent(){
        var data = {
            fname: this.state.fname,
            lname: this.state.lname,
            email: this.state.email,
            dob: this.state.dob,
            sbio: this.state.sbio,
        }

        StudentDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    fname: response.data.fname,
                    lname: response.data.lname,
                    email: response.data.email,
                    dob: response.data.dob,
                    sbio: response.data.sbio,
                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e)
            })
    }

    newStudent(){
        this.setState({
            id: null,
            fname: "",
            lname: "",
            email: "",
            dob: "",
            sbio: "",
            submitted: false
        });
    }

    render(){
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newStudent}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="fname">First Name</label>
                            <input 
                                type="text"
                                className="form-control"
                                id="fname"
                                required
                                value={this.state.fname}
                                onChange={this.onChangeFname}
                                name="fname"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="lname">Last Name</label>
                            <input 
                                type="text"
                                className="form-control"
                                id="lname"
                                required
                                value={this.state.lname}
                                onChange={this.onChangeLname}
                                name="lname"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="text"
                                className="form-control"
                                id="email"
                                required
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                                name="email"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="dob">Date of Birth</label>
                            <input 
                                type="integer"
                                className="form-control"
                                id="dob"
                                required
                                value={this.state.dob}
                                onChange={this.onChangeDOB}
                                name="dob"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="sbio">Short Bio</label>
                            <input 
                                type="text"
                                className="form-control"
                                id="sbio"
                                required
                                value={this.state.sbio}
                                onChange={this.onChangeSbio}
                                name="sbio"
                            />
                        </div>

                        <button onClick={this.saveStudent} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        )
    }
}
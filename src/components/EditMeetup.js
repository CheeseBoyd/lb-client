import React from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';


class EditMeetup extends React.Component {
    // you can also do this with the constructor using props
    constructor(props){
        super(props);
        this.state = {
            id: '',
            name: '',
            city: '',
            address: '',

        }

        // or this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        // targets are the name fields in your input i.e if target.name is city then name = city
        const name = target.name;

        // Change state with the updated input fields
        this.setState({
            [name]: value,
        })
    }

    componentWillMount(){
        this.getMeetupDetails();
    }

    getMeetupDetails(){
        let meetupId = this.props.match.params.id
        
        Axios.get(`https://radiant-oasis-68917.herokuapp.com/api/meetups/${meetupId}`)
            .then(response => {
                    this.setState({
                        id: response.data.id,
                        name: response.data.name,
                        city: response.data.city,
                        address: response.data.address
                    }, ()=>{
                        console.log(this.state);
                    })
                })
            .catch(err => console.log(err))
    }

    editMeetup(newMeetup){
        // make request to the backend
        // Axios returns propises
        // put is update existing stuff
        Axios.request({
            method: 'put',
            url: `https://radiant-oasis-68917.herokuapp.com/api/meetups/${this.state.id}`,
            data: newMeetup
        }).then(response => {
            // props.history is from the react router
            // this basically directs us where we want to go on the page via its 
            // route in this case the home page
            this.props.history.push('/')
        }).catch(err =>{
            console.log(err)
        })
    }


    onSubmit(event){
        // you can access the value of the form fields by using the ref value
        // console.log(this.refs.name.value)
        let newMeetup = {
            name: this.refs.name.value,
            city: this.refs.city.value,
            address: this.refs.address.value,
        }
        this.addMeetup(newMeetup);
        event.preventDefault();
    }

    render(){
        return(
            <div>
                <Link className="btn grey" to="/">Back</Link>
                <h1>Edit Meetup</h1>

                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="input-field">
                        <input type="text" name="name" ref="name" value={this.state.name} 
                        onChange={this.handleInputChange.bind(this)}/>
                        <label htmlFor="name">Name</label>
                    </div>

                    <div className="input-field">
                        <input type="text" name="city" ref="city" value={this.state.city} 
                        onChange={this.handleInputChange.bind(this)}/>
                        <label htmlFor="city">City</label>
                    </div>

                    <div className="input-field">
                        <input type="text" name="address" ref="address" value={this.state.address} 
                        onChange={this.handleInputChange.bind(this)}/>
                        <label htmlFor="address">Address</label>
                    </div>

                    <input type="submit" value="Save" className="btn"/>
                </form>
            </div>
        )
    }
}

export default EditMeetup;
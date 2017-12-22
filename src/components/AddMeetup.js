import React from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';


class AddMeetup extends React.Component {
    addMeetup(newMeetup){
        // make request to the backend
        // Axios returns propises
        // post is add new stuff
        Axios.request({
            method: 'post',
            url: 'https://radiant-oasis-68917.herokuapp.com/api/meetups',
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
                <h1>Add Meetup</h1>

                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="input-field">
                        <input type="text" name="name" ref="name"/>
                        <label htmlFor="name">Name</label>
                    </div>

                    <div className="input-field">
                        <input type="text" name="city" ref="city"/>
                        <label htmlFor="city">City</label>
                    </div>

                    <div className="input-field">
                        <input type="text" name="address" ref="address"/>
                        <label htmlFor="address">Address</label>
                    </div>

                    <input type="submit" value="Save" className="btn"/>
                </form>
            </div>
        )
    }
}

export default AddMeetup;
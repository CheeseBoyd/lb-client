import React from 'react';
import axios from 'axios';
import MeetupItem from './MeetupItem'

// make a request to axios in loopback
class Meetups extends React.Component {
    constructor(){
        super();
        this.state = {
            meetups: []
        }
    }

    componentWillMount(){
        this.getMeetups();
    }

    getMeetups(){
        axios.get('https://radiant-oasis-68917.herokuapp.com/api/meetups/')
            .then(response => {
                this.setState({meetups: response.data}, ()=>{
                    console.log(this.state)
                })
            })
    }

    render(){
        const meetupItems = this.state.meetups.map((meetup, i)=>{
            return(
                <MeetupItem key={i} item={meetup} />
            )
        })
        return(
            <div>
                <h1>Meetups</h1>
                <ul className="collection">
                    {meetupItems}
                </ul>
            </div>
        )
    }
}

export default Meetups;
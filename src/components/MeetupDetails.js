import React from 'react'
import {Link} from 'react-router-dom';
import Axios from 'axios';


class MeetupDetails extends React.Component {
    constructor(props){
        super(props);

        this.state= {
            details: ''
        }
    }
    // Backticks are just ES6 features
    onDelete(){
        let meetupId = this.state.details.id
        Axios.delete(`https://radiant-oasis-68917.herokuapp.com/api/meetups/${meetupId}`)
            .then(response=>{
                this.props.history.push('/')
            })
            .catch(err=>{
                console.log(err);
            })
    }

    componentWillMount(){
        this.getMeetups();
    }

    getMeetups(){
        let meetupId = this.props.match.params.id
        Axios.get(`https://radiant-oasis-68917.herokuapp.com/api/meetups/${meetupId}`)
            .then(response => {
                this.setState({details: response.data}, ()=>{
                    console.log('Meetup details')
                    console.log(this.state)
                })
            })
            .catch(err => console.log(err))
    }

    render(){
        return(
            <div>
                <br/>
                <Link className="btn grey" to="/">Back</Link>
                <h1>{this.state.details.name}</h1>
                <ul className="collection"> 
                    <li className="collection-item">City: {this.state.details.city}
                    </li>
                    <li className="collection-item">Adress: {this.state.details.address}
                    </li>
                </ul>

                <Link  className="btn" to={`/meetups/edit/${this.state.details.id}`}>Edit</Link>

                <button onClick={this.onDelete.bind(this)} className="btn red right">Delete</button>
            </div>
        )
    }
}

export default MeetupDetails
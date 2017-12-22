import React from 'react';
import {Link} from 'react-router-dom';


class MeetupItem extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            item: props.item,
        }
    }
    render(){
        // template string {`back-ticks` instead of "double-quotes" ES6}
        // use $ then {value} to put a variable inside a template string
        return(
             <li className="collection-item" >
                  <Link to={`/meetups/${this.state.item.id}`}>{this.state.item.name}</Link>
            </li>
        )
    }
}


export default MeetupItem
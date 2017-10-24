import React from 'react';
import { isEmpty } from 'lodash';
import {fetchSafePlaces} from '../utils/api';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          teamMembers:''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const { teamMembers } = this.state;
        const { safePlaces = [], unsafePlaces = []} = fetchSafePlaces(teamMembers);

        this.setState({ safePlaces, unsafePlaces })
    }

    handleChange(event){
        const value = event.target.value;

        this.setState(() => ({ teamMembers: value }))
    }
    render(){
        const { teamMembers } = this.state;

        return (<div className="home-container">
            <h1>Looking for a safe place to eat?</h1>
            <form className="column" onSubmit={this.handleSubmit}>
                <label className="header" htmlFor="teamMembers">
                which members are going?
                </label>
                <input id='teamMembers'
                       placeholder='enter names separated by comma e.g John Davis, Gary Jones'
                       autoComplete="off"
                       type="text"
                       value={ teamMembers }
                       onChange={this.handleChange}
                />
                <button className="button"
                        type="submit"
                        disabled={ !teamMembers }
                >Submit</button>
            </form>
            {this.state.safePlaces && <div>
                {!isEmpty(this.state.safePlaces) && <h3>{'Places to go:'}</h3>}
                <ul>
                    {this.state.safePlaces.map((place, index) => <li key={index}>{place.name}</li>)}
                </ul>
            </div>}
            {this.state.unsafePlaces && <div>
                {!isEmpty(this.state.unsafePlaces) && <h3>{'Places to avoid:'}</h3>}
                <ul>
                    {this.state.unsafePlaces.map((place, index) => <li key={index}>{place.name}</li>)}
                </ul>
            </div>}
            </div>)
    }
}

export default Home;
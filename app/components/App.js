import React from 'react';
import Home from './Home';
import Nav from './Nav';
import  { BrowserRouter as Router, Route, Switch }  from 'react-router-dom';



class App extends React.Component {

    render() {
        return (
            <Router>
                <div className='container'>
                    <Nav/>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route render={() => <p>Not Found</p>}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}export default App;
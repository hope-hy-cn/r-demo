import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { AppFrame } from './components'
import Forbidden from './components/Forbidden'
import routes from './routes'

class App extends Component {
  render() {
    // console.log(this.props.match.path)
    return (
      <AppFrame>
        <Switch>
          {
            routes.map(route => {
              const path = this.props.match.path+route.path
              return (
                <Route
                  key={route.path}
                  path={path}
                  // component={route.component}
                  render={(props) => {
                    const hasPermission = route.roles.includes(this.props.role)
                    return hasPermission ? <route.component {...props}/> : <Forbidden />
                  }}
                />
              )
            })
          }
          <Redirect to={`${this.props.match.path}${routes[0].path}`} from="/admin" exact/>
          <Redirect to='/404'/>
        </Switch>
        
      </AppFrame> 
    )
  }
}
const mapStateToProps = (state) => {
  return {
    role: state.user.role
  }
}
export default connect(mapStateToProps)(App);

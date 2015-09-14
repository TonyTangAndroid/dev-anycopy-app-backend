import React from 'react';
import Parse from 'parse'

export default class Login extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = { signup: false, forgetPassword: false };
	}

	submit() {
	    var self = this;
	    var username = React.findDOMNode(this.refs.username).value;
	    var password = React.findDOMNode(this.refs.password).value;
	    if (username.length && password.length) {
	      if (this.state.signup) {
	        console.log('signup');
	        var u = new Parse.User({
	          username: username,
	          password: password
	        });
	        u.signUp().then(function() {
	          // self.setState({
	          //   error: null
	          // });
	        }, function() {
	          self.setState({
	            error: 'Invalid account information'
	          });
	        });
	      } else {
	        Parse.User.logIn(username, password).then(function() {
	          // self.setState({
	          //   error: null
	          // });
	        }, function() {
	          self.setState({
	            error: 'Incorrect username or password'
	          });
	        });
	      }
	    } else {
	      this.setState({
	        error: 'Please enter all fields'
	      });
	    }
	}

	toggleSignup() {
	    this.setState({
	      signup: !this.state.signup
	    });
	}

	forgetToggle() {
		this.setState({
		  forgetPassword: !this.state.forgetPassword
		});	
	}

	render() {
		return (
			<div className="container">
				<form className="form-signin">
					<h1>AnyCopy</h1>
					<br/>
					<div className='form-group'>
						<label htmlFor='username' className="sr-only">Email</label>
						<input ref='username' id='username' type='text' required autofocus className="form-control" placeholder="Email"/>
					</div>

					{!this.state.forgetPassword ?
						<div className='form-group'>
							<label htmlFor='password' className="sr-only">Password</label>
							<input ref='password' id='password' type='password' className="form-control" placeholder="Password" required/>
						</div> : null
					}


					{ this.state.error ?
					<div className='form-group centered errors'>{this.state.error}</div> :
					null
					}
					<div className='form-group'>
						<a className="btn btn-lg btn-primary btn-block" onClick={this.submit.bind(this)}>
							{ this.state.forgetPassword ? "Find Back" : this.state.signup ? 'Sign up' : 'Log in'}
						</a>
					</div>

					
					
					<div className='form-group'>
						{ !this.state.forgetPassword ?
							<span>or&nbsp;<a onClick={this.toggleSignup.bind(this)}> {this.state.signup ? 'Log in' : 'Sign up'}</a></span> : null
						}
						<a className="right" style={{float:"right"}} onClick={this.forgetToggle.bind(this)}>
							{ this.state.forgetPassword ? "Login or Sign up" : 'Forget password?'}
						</a>
					</div>
				</form>
			</div>
		);
	}
}

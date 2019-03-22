import React from 'react';
import {Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import firebase from '../../firebase';
import md5 from 'md5';

class Login extends React.Component {
   
    state = {
      
        email : "",
        password : "",      
        errors : [],
        loading : false
      

    }

    handleChange = event => {
        console.log(event);
        this.setState({[event.target.name] : event.target.value})
    }

  
   

    displayErrors = (errors) => {
       return errors.map((err, index) => {
            return <p key={index}>{err}</p>
        })
    }

    handleInputError = (errors, inputName) => {
        return errors.some(error => error.toLowerCase().includes(inputName)) ? 'error' : '';

    }

    
    
    
    isPasswordEmpty = (password) => {
        if(!password){
            this.setState({errors : this.state.errors.concat('Password is required')});
            return true;
        }
        return false;
    }

    isEmailEmpty = email => {
        if(!email){
            this.setState({errors : this.state.errors.concat('Email is required')});
            return true;
        }
        return false;
    }


    isFormValid = () => {
        const {email, password} = this.state;
        return !this.isEmailEmpty(email) && !this.isPasswordEmpty(password);       
          
    }

   
    

   

    handleSubmit = event => {
        event.preventDefault();
        this.setState({errors : []});        
        if(this.isFormValid()){  
            firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password) 
            .then(signedInUser => {
                console.log('Signed in successfully '+signedInUser);
                this.setState({errors : []});
                this.setState({loading : false});
            }).catch(error => {
                console.error(error);
                this.setState({errors : this.state.errors.concat(error.message)});                
                this.setState({loading : false});
            })      
            
           
        }
    }

    

    render(){
        const { email, password, loading, errors} = this.state;
        return (
           <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{maxWidth : 450}}>
                    <Header as="h1" icon color="violet" textAlign="center">
                        <Icon name="code branch" color="violet" />
                        Login to DevChat
                    </Header>

                    <Form size="large" onSubmit={this.handleSubmit}>
                        <Segment stacked>                 

                            <Form.Input fluid name="email" icon="mail"  iconPosition="left" placeholder="Email Address" onChange={this.handleChange} type="text" value={email} className={this.handleInputError(errors, 'email')} />
                        
                            <Form.Input fluid name="password" icon="lock"  iconPosition="left" placeholder="Password" onChange={this.handleChange} type="password" value={password} className={this.handleInputError(errors, 'password')}/>                      
                           
                            <Button  disabled={loading} className={loading ? 'loading' : ''} color="violet" fluid size="large">Submit</Button>
                        </Segment>


                    </Form>

                       {
                           this.state.errors.length ? 
                           <Message error>
                                <h3>Error</h3>
                                {
                                    this.displayErrors(this.state.errors)
                                }

                           </Message>
                       : ''}


                       <Message>Don't have an account? <Link to="/register">Register</Link></Message>         

                   

                </Grid.Column>

           </Grid>
        )
    }
}

export default Login;
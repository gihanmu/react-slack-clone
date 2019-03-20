import React from 'react';
import {Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import firebase from '../../firebase';

class Register extends React.Component {
   
    state = {
        username : "",
        email : "",
        password : "",
        passwordConfirmation : "",
        errors : []
    }

    handleChange = event => {
        console.log(event);
        this.setState({[event.target.name] : event.target.value})
    }

    isFormEmpty = ({username, email, password, passwordConfirmation}) => {
        return !username.length || !email.length || !password.length || !passwordConfirmation.length;
    }

    isPasswordValid = ({password, passwordConfirmation}) => {
        if(!password.length < 6 && !passwordConfirmation.length < 6){
            return false;
        }else if(password !== passwordConfirmation){
            return false;
        }
        return true;
    }
    isFormValid = () => {
        let errors = [];
        let error = null;
       if(this.isFormEmpty(this.state)){
           error = 'Please fill all the information';
           this.setState({errors : errors.concat(error)});
           return false;
       }else if(!this.isPasswordValid(this.state)){
           error = 'Please provide a valid password';
           this.setState({errors : errors.concat(error)});
           return false;
       }
       return true;
    }

    displayErrors = (errors) => {
       return errors.map((err, index) => {
            return <p key={index}>{err}</p>
        })
    }

    handleSubmit = event => {
        if(this.isFormValid()){
            event.preventDefault();
            
            firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(createdUser => {
                console.log(createdUser);
            })
            .catch(error => {
                console.error(error);
            })
        }
    }

    render(){
        const {username, email, password, passwordConfirmation} = this.state;
        return (
           <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{maxWidth : 450}}>
                    <Header as="h2" icon color="orange" textAlign="center">
                        <Icon name="puzzle piece" color="orange" />
                        Register for DevChat
                    </Header>

                    <Form size="large" onSubmit={this.handleSubmit}>
                        <Segment stacked>
                            <Form.Input fluid name="username" icon="user"  iconPosition="left" placeholder="Username" onChange={this.handleChange} type="text" value={username}/>

                            <Form.Input fluid name="email" icon="mail"  iconPosition="left" placeholder="Email Address" onChange={this.handleChange} type="text" value={email}/>
                        
                            <Form.Input fluid name="password" icon="lock"  iconPosition="left" placeholder="Password" onChange={this.handleChange} type="password" value={password}/>
                        
                            <Form.Input fluid name="passwordConfirmation" icon="repeat"  iconPosition="left" placeholder="Confirm Password" onChange={this.handleChange} type="password" value={passwordConfirmation}/>
                        
                            <Button color="orange" fluid size="large">Submit</Button>
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
                        

                    
                    

                   

                </Grid.Column>

           </Grid>
        )
    }
}

export default Register;
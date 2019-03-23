import React, {Component} from 'react';
import { Grid, Header, Icon, Dropdown } from 'semantic-ui-react';
import firebase from '../../firebase';

class UserPanel extends React.Component {
    dropdownOptions = () => [
        {
            key : 'user',
            text : <span>Signed in as <strong>User</strong></span>,
            disabled : true
        },
       {
        key : 'avatar',
        text : <span>Change Avatar</span>,
       
       },
       {
        key : 'signout',
        text : <span onClick={this.handleSingout}>Singout</span>,
       
       }
    ]

    handleSingout = () => {
        firebase
        .auth()
        .signOut()
        .then(() => {
            console.log('Signed out');
        }).catch(error => {
            console.log(error);
        })
    }
    render(){
        return(
            <Grid>
                <Grid.Column>
                    <Grid.Row style={{padding : "1.2em", margin : 0}}>
                        <Header inverted floated="left" as="h2">
                            <Icon name="code" />
                            <Header.Content>DevChat</Header.Content>               
                        </Header>
                    </Grid.Row>

                    <Header style={{padding : '0.25em'}} as="h4" inverted>
                            <Dropdown trigger={
                                <span>User</span>
                            } options={this.dropdownOptions()}>

                            </Dropdown>
                    </Header>
                </Grid.Column>
            </Grid>
        )
    }
}

export default UserPanel;
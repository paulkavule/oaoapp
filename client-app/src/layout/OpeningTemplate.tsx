import { Route, NavLink } from "react-router-dom";
import { Button, Grid, Header } from "semantic-ui-react";
import ContactPage from "../pages/oao/ContactPage";
import OaoIdInfo from "../pages/oao/OaoIdInfo";
import OaoPersonalInfo from "../pages/oao/OaoPersonalInfo";

function OpeningTemplate(){

    return (
        <>
            <Header as='h1' content='Account Opening'/>
            <Grid>
                <Grid.Column width={6}>
                    <Button content='1' as={NavLink} to='/opening/personalinfo'/> Personal Info<br/><br/>
                    <Button content='2' as={NavLink} to='/opening/idinfo'/> Identification Info<br/><br/>
                    <Button content='3' as={NavLink} to='/opening/contactinfo'/> Contact Info<br/><br/>
                </Grid.Column>
                <Grid.Column width={10}>
                    <Route path='/opening/personalinfo' component={OaoPersonalInfo}/>
                    <Route path='/opening/idinfo' component={OaoIdInfo}/>
                    <Route path='/opening/contactinfo' component={ContactPage}/>
                </Grid.Column>
            </Grid>
        </>
       
        
    )
}

export default OpeningTemplate
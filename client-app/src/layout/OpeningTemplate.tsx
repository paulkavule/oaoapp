import { Route, NavLink } from "react-router-dom";
import { Button, Grid, Header } from "semantic-ui-react";
import ContactPage from "../pages/oao/ContactPage";
import DocumentUpload from "../pages/oao/DocumentUpload";
import EmploymentPage from "../pages/oao/EmploymentPage";
import FinishPage from "../pages/oao/FinishPage";
import OaoIdInfo from "../pages/oao/IdentificationPage";
import OaoPersonalInfo from "../pages/oao/PersonalInfoPage";
import Preferencepage from "../pages/oao/PreferencePage";

function OpeningTemplate(){

    return (
        <>
            <Header as='h1' content='Account Opening'/>
            <Grid>
                <Grid.Column width={6}>
                    <Button content='1' as={NavLink} to='/opening/personalinfo'/> Personal details<br/><br/>
                    <Button content='2' as={NavLink} to='/opening/idinfo'/> Identification<br/><br/>
                    <Button content='3' as={NavLink} to='/opening/contactinfo'/> Contact details<br/><br/>
                    <Button content='4' as={NavLink} to='/opening/preferences'/> Preferences<br/><br/>
                    <Button content='5' as={NavLink} to='/opening/employmentinfo'/> Employment<br/><br/>
                    <Button content='6' as={NavLink} to='/opening/documentupload'/> Document upload<br/><br/>
                    <Button content='7' as={NavLink} to='/opening/finish'/> Finish<br/><br/>

                </Grid.Column>
                <Grid.Column width={10}>
                    <Route path='/opening/personalinfo' component={OaoPersonalInfo}/>
                    <Route path='/opening/idinfo' component={OaoIdInfo}/>
                    <Route path='/opening/contactinfo' component={ContactPage}/>
                    <Route path='/opening/preferences' component={Preferencepage}/>
                    <Route path='/opening/employmentinfo' component={EmploymentPage}/> 
                    <Route path='/opening/documentupload' component={DocumentUpload}/> 
                    <Route path='/opening/finish' component={FinishPage}/> 
                </Grid.Column>
            </Grid>
        </>
       
        
    )
}

export default OpeningTemplate
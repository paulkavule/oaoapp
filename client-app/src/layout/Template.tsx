import { Route, Switch } from "react-router-dom"
import { Container } from "semantic-ui-react"
import HomePage from "../pages/homepage"
import ContactPage from "../pages/oao/ContactPage"
import OpeningTemplate from "./OpeningTemplate"

function Template(){
    return (
        <div>
            <div style={{float:'left', width:'40%', 
            backgroundSize:'cover',
            backgroundRepeat:'no-repeat',
            backgroundImage: `url(/assets/bank3.jpg)`,
            backgroundColor:`black`,
            backgroundPosition:'center',
            height:'100vh' }}>

            </div>
            <div style={{float:'right', width:'60%', overflow:'visible', marginTop:'5em'}}>
                <Container style={{padding:'30px'}}>
                    <Switch>
                        <Route exact path='/' component={HomePage}/>
                        <Route exact path='/accountopening' component={OpeningTemplate}/>
                        <Route exact path='/opening/personalinfo' component={OpeningTemplate}/>
                        <Route exact path='/opening/idinfo' component={OpeningTemplate}/>
                        <Route exact path='/opening/contactinfo' component={OpeningTemplate}/>
                        <Route exact path='/opening/residenceinfo' component={OpeningTemplate}/> 
                        <Route exact path='/opening/preferences' component={OpeningTemplate}/> 
                        <Route exact path='/opening/employmentinfo' component={OpeningTemplate}/> 
                        <Route exact path='/opening/documentupload' component={OpeningTemplate}/> 
                        <Route exact path='/opening/finish' component={OpeningTemplate}/> 
                    </Switch>
                </Container>
            </div>
        </div>
    )
}

export default Template
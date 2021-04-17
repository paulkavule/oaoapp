import { NavLink } from "react-router-dom";
import { Button, Form, Icon, Input } from "semantic-ui-react";


function ContactPage(){
    return(
        <>
            <Form>
              <Form.Field id='phoneNumber' name='phoneNumber' control={Input} label='Phone number'  
                placeholder='Last name'  />
             
              <Form.Field id='alternativePhoneNumber' name='alternativePhoneNumber' control={Input} 
                label='Phone number'  placeholder='Phone number'  />

              <Form.Field id='emailAddress' name='emailAddress' control={Input} label='Email address'
               placeholder='Email address'  />

              <Form.Field id='city' name='city' control={Input} label='City'  
                placeholder='city' />

              <Form.Field id='physicalAddress' name='physicalAddress' control={Input} label='Physical address'  
                placeholder='village, street' />
                
              <Form.Field id='postalAddress' name='postalAddress' control={Input} label='Postal Address'  
                placeholder='postal code'  />

                <Button.Group floated='right' style={{marginTop:'30px'}}>
                    <Button content='back' basic as={NavLink} to='/opening/idinfo' />
                    <Button animated>
                        <Button.Content content='Next' visible />
                        <Button.Content hidden>
                            <Icon name='arrow alternate circle right'/>
                        </Button.Content>
                    </Button>
                </Button.Group>
            </Form>
        </>
    )
}

export default ContactPage
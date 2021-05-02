import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Form, Header, Icon, Input } from "semantic-ui-react";
import { storeManager, useStore } from "../../AppLogic/StoreManager";
import { ContactInfo } from "../../modals/contactInfo";


function ContactPage(){
    const {contactStore:{contactInfo, getContactInfo}, commonStore:{requestId}} = useStore();
    const _cntInfo = contactInfo ?? {
      requestId: requestId!,
      physicalAddress:'',
      postalAddress:'',
      phoneNumber :'',
      alternativePhoneNumber:'',
      city:'',
      emailAddress:''
    }
    const [contInfo, setContInfo] = useState<ContactInfo>(_cntInfo)

    function handleSubmit(){
        console.log(contInfo)
    }

    function handleChange(event:any){ 
       const {value, name} = event.target;
       setContInfo({...contInfo, [name]:value})
    }

    useEffect(() => {
      const reqId = storeManager.commonStore.requestId;
      if(reqId){
        getContactInfo(reqId).then(info =>{
          if(info) setContInfo({...info})
        })
      }
     

    },[getContactInfo])
    return(
        <>
            <Header content='Contact information'/>
            <Form autcomplet="off">
              <Form.Field id='phoneNumber' name='phoneNumber' control={Input} label='Phone number'  
                placeholder='Last name' value={contInfo.phoneNumber} onChange={(e:any)=> handleChange(e)}  />
             
              <Form.Field id='alternativePhoneNumber' name='alternativePhoneNumber' control={Input} 
                label='Phone number'  placeholder='Phone number' value={contInfo.alternativePhoneNumber} onChange={(e:any)=> handleChange(e)}/>

              <Form.Field id='emailAddress' name='emailAddress' control={Input} label='Email address'
               placeholder='Email address' value={contInfo.emailAddress} onChange={(e:any)=> handleChange(e)} />

              <Form.Field id='city' name='city' control={Input} label='City'  
                placeholder='city' value={contInfo.city} onChange={(e:any)=> handleChange(e)}/>

              <Form.Field id='physicalAddress' name='physicalAddress' control={Input} label='Physical address'  
                placeholder='village, street'  value={contInfo.physicalAddress} onChange={(e:any)=> handleChange(e)}/>
                
              <Form.Field id='postalAddress' name='postalAddress' control={Input} label='Postal Address'  
                placeholder='postal code'  value={contInfo.postalAddress} onChange={(e:any)=> handleChange(e)} />

                <Button.Group floated='right' style={{marginTop:'30px'}}>
                    <Button content='back' basic as={NavLink} to='/opening/idinfo' />
                    <Button onClick={handleSubmit} animated>
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
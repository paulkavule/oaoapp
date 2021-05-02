import {  observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"
import { Button, Form, Header, Icon } from "semantic-ui-react"
import { storeManager, useStore } from "../../AppLogic/StoreManager";
import { PersonalInfo } from "../../modals/personalinfo";


function OaoPersonalInfo(){
    const {personalInfoStore:{savePersonalInfo,getPersonalInfo, perInfo, saving, loading}, commonStore} = useStore();
    var info = perInfo ?? {
        requestId :'',
        firstName:'',
        middleName:'',
        lastName:'',
        gender:0,
        dateOfBirth:'',
    }
    
   
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(info)
    const history = useHistory();
    
    useEffect(()=>{
        const reqId = storeManager.commonStore.requestId;
       console.log("request id", reqId)
       if(reqId) {
            getPersonalInfo(reqId).then(pi => {
                if(pi) setPersonalInfo({...pi})
            });
       } 

    },[getPersonalInfo])

    function handleSubmit(){
        console.log(personalInfo);
        savePersonalInfo(personalInfo).then(result =>{
            console.log(result)
            if(result)
            {
                console.log("done");
                commonStore.setRequestId(result)
                history.push('/opening/idinfo');
            }
            else{
                console.log("errors");
            }
        })
      

    }
    function handleOnChange(event: any){
       const {value, name} =  event.target;
       setPersonalInfo({...personalInfo, [name] : value})
    }
    return(
        <>
            <Header content='Personal information'/>
            <Form onSubmit={handleSubmit} autoComplete='off' loading={loading}>
                <Form.Field>
                    <label>First name</label>
                    <input type='text' name='firstName' id='firstName' value={personalInfo.firstName} onChange={(e) => handleOnChange(e)} />
                </Form.Field>
                <Form.Field>
                    <label>Last name</label>
                    <input type='text' name='lastName' id='lastName' value={personalInfo.lastName} onChange={(e) => handleOnChange(e)}/>
                </Form.Field>
                <Form.Field>
                    <label>Middle Name</label>
                    <input type='text' name='middleName' id='middleName' value={personalInfo.middleName} onChange={(e) => handleOnChange(e)}/>
                </Form.Field>
                <Form.Field>
                    <label>Gender</label>
                    <select name='gender' id='gender' value={personalInfo.gender} onChange={(e) => handleOnChange(e)}>
                        <option value="0">Female</option>
                        <option value="1">Male</option>
                    </select>
                </Form.Field>
                <Form.Field>
                    <label>Date of birth</label>
                    <input type='text' name='dateOfBirth' id='dateOfBirth' value={personalInfo.dateOfBirth} onChange={(e) => handleOnChange(e)}/>
                </Form.Field>

                <Button animated floated='right' loading={saving}>
                    <Button.Content visible>Next</Button.Content>
                    <Button.Content type='submit' hidden>
                        <Icon name='arrow right' />
                    </Button.Content>
                </Button>
            </Form>
        
        </>
    )
}

export default observer(OaoPersonalInfo) 
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"
import { Button, Form, Header, Icon } from "semantic-ui-react"
import { storeManager, useStore } from "../../AppLogic/StoreManager";
import { IdInfo } from "../../modals/IdInfo";


function OaoIdInfo(){

    const {idInfoStore:{idInfo:_idInfo,saving, saveIdInfo, getIdInfo}, commonStore:{requestId}} = useStore()
    const info = _idInfo ?? {
        requestId:requestId!,
        nationality:'',
        countryOfResidence:'',
        idType:'',
        idNumber:'',
        pep:''
    }
    const [idInfo, setIdInfo] = useState<IdInfo>(info)
    useEffect(() =>{
        try {
            const reqId = storeManager.commonStore.requestId;
            if(reqId){
                getIdInfo(reqId!).then(info =>{
                    if(info){
                        //console.log(info)
                        setIdInfo({...info})
                    }
                })
            }
           
        } catch (error) {
            console.log("OaoIdInfo", error)
        }
    },[getIdInfo])
    
    function handleChange(event:any){
        const {value, name} = event.target;
        console.log(value,name)
        setIdInfo({...idInfo, [name]:value})
    }
    function handleSubmit(){
        try {
            console.log(idInfo)
            saveIdInfo(idInfo).then(result => {
                if(result){
                    console.log('Great')
                }
                else{
                    console.log('Errors')
                }
            })
        } catch (error) {
            console.log("Error",error)
        }
    }
    return(
        <>
            <Header content='Identification information'/>
            <Form>
                <Form.Field>
                    <label>Nationality</label>
                    <select name='nationality' id='nationality' value={idInfo?.nationality} onChange={(e)=>handleChange(e)}>
                        <option value=''>Select</option>
                        <option value='ug'>Uganda</option>
                        <option value='ke'>Kenya</option>
                    </select>
                </Form.Field>
                <Form.Field>
                    <label>Country of residence</label>
                    <select name='countryOfResidence' id='countryOfResidence' value={idInfo?.countryOfResidence} onChange={(e)=>handleChange(e)}>
                        <option value=''>Select</option>
                        <option value='ug'>Uganda</option>
                        <option value='ke'>Kenya</option>
                    </select>
                </Form.Field>
                <Form.Field>
                    <label>Id type</label>
                    <select name='idType' id='idType' value={idInfo?.idType} onChange={(e)=>handleChange(e)}>
                        <option value=''>Select</option>
                        <option value='national'>National</option>
                        <option value='student'>Student</option>
                        <option value='Work'>Work</option>
                    </select>
                </Form.Field>
                <Form.Field>
                    <label>Id number</label>
                    <input type='text' name='idNumber' value={idInfo?.idNumber} onChange={(e)=>handleChange(e)} />
                </Form.Field>
                <Button.Group floated='right'>
                    <Button content='back' basic as={NavLink} to='/opening/personalinfo' />
                    <Button loading={saving} animated>
                        <Button.Content visible content='Next' />
                        <Button.Content hidden onClick={handleSubmit}>
                            <Icon name="arrow right" />
                        </Button.Content>
                    </Button>
                </Button.Group>
            </Form>
        </>
    )
}

export default observer(OaoIdInfo) 
import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Header, Icon, List } from "semantic-ui-react";
import * as Yup from 'yup'
import { storeManager, useStore } from "../../AppLogic/StoreManager";
import FormDropDown from "../../components/FormDropDown";
import FormFileUpload from "../../components/FormFileUpload";
import { Document } from "../../modals/document";
import { DocumentsOao } from "../../modals/initData";

function DocumentUpload(){
    const { documentStore:{uploading, uploadFile, getDocuments, setSelectedDoc, selectedDoc, docList} } =useStore()
    const document = {document:''}
    let selectFile = '';
    // const [selectedFile, setSelectedFile] = useState(document);
    const reqId = storeManager.commonStore.requestId;
    const validationSchema = Yup.object({
        document: Yup.string().required('Select document to upload')
    })
    useEffect(()=>{
        getDocuments(reqId!).then(result =>{
            if(result != null){
                console.log(result)
            }
        })
    },[getDocuments,reqId]);
    function handleIncomingFile(files:any){
    
        var dok : Document = {
            docCode: selectFile,
            fileName: files[0].name,
            filePath :'',
            requestId: reqId!
        }
        uploadFile(dok, files[0]).then(result => {
            console.log('Uploaded', result)
            if(result){
                
            }
        })
        
    }
    function handleFormSubmit(){

    }
    function checkValue(){
        console.log("checkValue | "+selectFile)
    }
    function handleSelectedDocumentChanged(value:string){
        setSelectedDoc(value)
        // selectFile = value;
        // setSelectedFile({...selectedFile, document:value})
        // console.log("selectedFile 2", value, selectFile)
    }
    return (
        <>
            <Header as='h3'>Document upload</Header>
            <p style={{color:'#cc', fontWeight:'bold'}}>Only Pdf documents are allowed</p>
            <p style={{color:'grey'}}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos ex ut optio eveniet quisquam quaerat delectus? Quia animi assumenda dolor dolorum exercitationem. Aut sunt tempora veniam? Quisquam repellendus corporis corrupti?
            </p>
            
            <List>

                {
                    docList != null ? (
                        docList.map(doc =>(
                        <List.Item key={doc.docCode}>
                            <Icon name='file alternate' size='big' color='red'/>
                            <List.Content>
                               {doc.fileName}
                            </List.Content>
                        </List.Item>
                        ))
                    ) : null
                }
               

                
            </List>
            <Formik initialValues={document} validationSchema = {validationSchema} onSubmit={handleFormSubmit}  >
            {({handleSubmit, isValid, isSubmitting, dirty}) => (
                <Form  className="ui form" > 
                    <FormDropDown options={DocumentsOao} lable="Document" name="Document" 
                    placeholder="document" onChanged={handleSelectedDocumentChanged}/>
                    <FormFileUpload setFiles={handleIncomingFile} disabled={uploading} />
                    <Button.Group floated='right' style={{marginTop:'20px'}}>
                        <Button content='back' as={NavLink} to={'/opening/employmentinfo'} basic />
                        <Button onClick={() => checkValue()} animated >
                            <Button.Content content='Next' visible/>
                            <Button.Content hidden>
                                <Icon name='arrow right' />
                            </Button.Content>
                        </Button>
                    </Button.Group>
                </Form>
            )}
            </Formik>
            
        </>
    )
}

export default observer(DocumentUpload) ;
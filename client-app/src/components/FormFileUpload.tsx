import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Form, Header, Icon } from "semantic-ui-react"
import { boolean } from "yup/lib/locale"

interface Props{
  setFiles : (files : any) => void,
    disabled:boolean,
}
function FormFileUpload({setFiles, disabled}:Props) {
    const dzStyles = {
        border: 'dashed 3px #eee',
        borderColor: '#eee',
        borderRadius: '5px',
        paddingTop: '15px',
        textAlign: 'center' as 'center',
        height:100
    }

    const dzActive = {
        borderColor: 'green',
    }
    const onDrop = useCallback(acceptedFiles => {
      setFiles(acceptedFiles)
      //console.log(acceptedFiles)
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    
    return (
      <Form.Field disabled={disabled}>
        <div {...getRootProps()} style={isDragActive ? {...dzStyles, ...dzActive}: {...dzStyles}} > 
            <input {...getInputProps()} />
            <Icon name='upload' size='big'/>
            <Header  content='Drop file here' />
        </div>
      </Form.Field>
     
    )
  }
  export default FormFileUpload
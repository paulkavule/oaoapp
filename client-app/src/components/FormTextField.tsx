import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";

    
interface Props{
    placeholder:string,
    name:string,
    lable:string,
    visible?:boolean,
    type:string
}

export default function FormTextField(props:Props){
    const [field, meta] = useField(props.name)
   
    return (
        <Form.Field style={{display:(props.visible === undefined) ? 'block':  (props.visible ? 'block':'none')}}>
            <label>{props.lable}</label>
            <input  {...field} name={props.name} placeholder={props.placeholder} type={props.type} />
            { meta.touched && meta.error ?  
            (<Label content={meta.error} color='red' basic />)
             : null }
        </Form.Field>
    )
}
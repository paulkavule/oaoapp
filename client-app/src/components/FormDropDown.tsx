import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";

interface Props{
    placeholder:string,
    lable:string,
    name:string,
    visible?:boolean,
    options: any [],
    onChanged?(value:string): void
}

function FormDropDown(props:Props){
    const [fields, meta, helpers] = useField(props.name);
    function handleOnSelectionChanges(event:any){
        event.preventDefault();
        if(props.onChanged) {
            props.onChanged(event.target.value)
        }
        helpers.setValue(event.target.value)
        // console.log("props.onChanged",props.onChanged)
    }

    return(
        <Form.Field error={meta.touched && !!meta.error} style={{display:(props.visible === undefined) ? 'block':  (props.visible ? 'block':'none')}}>
            <label>{props.lable}</label>
            <select 
                name={props.name}
                value={fields.value}
                onBlur={() => helpers.setTouched(true)}
                onChange={(event) => handleOnSelectionChanges(event)} >
                {
                    props.options.map((item,index) =>(
                        <option key={index} value={item.value} >{item.text}</option>
                    ))
                }
            </select>
            {meta.touched && meta.error ? (<Label color='red' content={meta.error} />): null}
        </Form.Field>
    )
}

export default FormDropDown;
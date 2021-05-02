import { useState } from "react"
import { NavLink } from "react-router-dom";
import { Button, Form, Header } from "semantic-ui-react"

function FinishPage(){

    const [allowed, setAllowed] = useState(false);
    function setChanged(e:any){
        console.log(e.target.checked)
        setAllowed(e.target.checked)
    }
    return (
        <>
            <Header  as='h3' content='Finish' />
            <Form>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam quia ea, rem optio atque et, ullam provident dignissimos, ut voluptate dicta quaerat iusto corrupti facilis. </p>
                <strong>Terms of service</strong>
                <div style={{maxHeight:'200px', overflowY:'scroll', border:'1px solid grey', padding:'10px'}}>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit rerum adipisci sit temporibus sequi dicta, maiores laboriosam ipsam maxime! Dolores aperiam maiores unde sint dolorum, in atque beatae autem libero.
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit rerum adipisci sit temporibus sequi dicta, maiores laboriosam ipsam maxime! Dolores aperiam maiores unde sint dolorum, in atque beatae autem libero.
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit rerum adipisci sit temporibus sequi dicta, maiores laboriosam ipsam maxime! Dolores aperiam maiores unde sint dolorum, in atque beatae autem libero.
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit rerum adipisci sit temporibus sequi dicta, maiores laboriosam ipsam maxime! Dolores aperiam maiores unde sint dolorum, in atque beatae autem libero.
                    </p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit rerum adipisci sit temporibus sequi dicta, maiores laboriosam ipsam maxime! Dolores aperiam maiores unde sint dolorum, in atque beatae autem libero.
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit rerum adipisci sit temporibus sequi dicta, maiores laboriosam ipsam maxime! Dolores aperiam maiores unde sint dolorum, in atque beatae autem libero.
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit rerum adipisci sit temporibus sequi dicta, maiores laboriosam ipsam maxime! Dolores aperiam maiores unde sint dolorum, in atque beatae autem libero.
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit rerum adipisci sit temporibus sequi dicta, maiores laboriosam ipsam maxime! Dolores aperiam maiores unde sint dolorum, in atque beatae autem libero.
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit rerum adipisci sit temporibus sequi dicta, maiores laboriosam ipsam maxime! Dolores aperiam maiores unde sint dolorum, in atque beatae autem libero.
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit rerum adipisci sit temporibus sequi dicta, maiores laboriosam ipsam maxime! Dolores aperiam maiores unde sint dolorum, in atque beatae autem libero.
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit rerum adipisci sit temporibus sequi dicta, maiores laboriosam ipsam maxime! Dolores aperiam maiores unde sint dolorum, in atque beatae autem libero.
                    </p>
                    <input type='checkbox' onChange={setChanged} />I agree to the terms and conditions stated above
                </div>   

                <Button.Group floated='right' style={{marginTop:'10px'}}>
                    <Button content='back' as={NavLink} to='/opening/documentupload' basic/>
                    <Button disabled={!allowed} content='Finish' primary  /> 
                </Button.Group>
            </Form>
              
            
            
        </>
    )

}
export default FinishPage
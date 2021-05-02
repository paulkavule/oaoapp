
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import * as Yup from 'yup'
import { useStore } from '../../AppLogic/StoreManager';
import FormDropDown from '../../components/FormDropDown';
import FormTextField from '../../components/FormTextField';
import { EmploymentInfo } from '../../modals/employmentinfo';
import { EmploymentType, GrossIncomes } from '../../modals/initData';

function EmploymentPage(){

    const {employeStroe:{empInfo}} = useStore()
    const employInfo = empInfo?? {
        currentEmployer:'',
        employmentType:'',
        grossIncome:'',
        natureOfWork:'',
        startDate:''
    }
    var _visibles = {
        employmentType:true,
        currentEmployer:true,
        natureOfWork:false,
        startDate:true,
        grossIncome:true,
    }
    // const [employInfo, setEmpInfo] = useState(_empInfo)
    const [visibles, setVisibles] = useState(_visibles)
    var validationSchema = Yup.object({
        employmentType:Yup.string().required('Select your employment type'),
        grossIncome:Yup.string().required('Select your gross income'),
        currentEmployer:Yup.string(),
        startDate:Yup.string(),
        natureOfWork:Yup.string()
    })

    function handleFormSubmit(values:EmploymentInfo){
        console.log("employment info", values);
    }
    function handleEmploymentChanges(value:string){
        if(value === 'Self'){
            setVisibles({...visibles, currentEmployer:false, natureOfWork:true, startDate:false })
        }else if(value === 'Formal'){
            setVisibles({...visibles, currentEmployer:true, natureOfWork:false, startDate:true})
        }
        else if(value === 'Student'){
            setVisibles({...visibles, currentEmployer:false, natureOfWork:false, startDate:false})
        }
    }
    return (

       <Formik validationSchema={validationSchema}
        initialValues={employInfo} onSubmit={(values)=>handleFormSubmit(values)}>
              {({handleSubmit, isValid, isSubmitting, dirty}) => (
                  <Form className="ui form" autoComplete='off'>

                    <FormDropDown visible={visibles.employmentType} options={EmploymentType} lable='Employment Type' name='employmentType' 
                    placeholder='employment type' onChanged={handleEmploymentChanges} 
                    />
                    
                    <FormTextField visible={visibles.currentEmployer} placeholder='current employer' type='text' name='currentEmployer' lable='Current employer' />
                    <FormTextField visible={visibles.natureOfWork}  placeholder='nature of work' type='text' name='natureOfWork' lable='Nature of work' />
                    <FormTextField visible={visibles.startDate}  placeholder='start date' type='text' name='startDate' lable='start date' />

                    <FormDropDown visible={visibles.grossIncome} options={GrossIncomes} lable='Gross income' name='grossIncome' 
                    placeholder='gross income' />
                    <Button.Group floated="right">
                        <Button content='back' basic/>
                        <Button animated>
                            <Button.Content content='Next' visible />
                            <Button.Content hidden>
                                <Icon name='arrow right' />
                            </Button.Content>
                        </Button>
                    </Button.Group>
                  </Form>
                
              )}
        </Formik>
    )
}

export default EmploymentPage;
import * as Yup from 'yup'
import { Form, Formik } from "formik";
import { useStore } from '../../AppLogic/StoreManager';
import { useState } from 'react';
import { PreferenceInfo } from '../../modals/preferenceInfo';
import { PairedItems } from '../../modals/PairedItems';
import { useHistory } from 'react-router';
import { Button, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import FormDropDown from '../../components/FormDropDown';
import { AccountCategory, AccountTypes, Branches, TradingCountries } from '../../modals/initData';

function Preferencepage(){

    const {preferenceStore:{preferences, savePreference}} = useStore();
    var _info = preferences ?? {
        tradingCountry:'',
        preferedBranch:'',
        accountCategory: '',
        accountType: '',
        eStatement: false,
        mobileBanking: false,
        smsNotification:false,
        requestId:''
    } 
    const accItems :PairedItems [] = [{value:"",text:"Select"}]
    const [prefInfo, setprefInfo] = useState<PreferenceInfo>(_info)
    const [accTypes, setAccTypes] = useState(accItems)
    const preferencesObj = Yup.object({
        tradingCountry : Yup.string().required('Select trading countries'),
        preferedBranch:Yup.string().required('Select prefered branch'),
        accountCategory:Yup.string().required('Select account category'),
        accountType: Yup.string().required('Select account type'),
        mobileBanking:Yup.boolean().default(true),
        eStatement:Yup.boolean().default(true),
        smsNotification:Yup.boolean().default(true) 
    });
    const history = useHistory()
    function handleSubmit(prefInfo:PreferenceInfo){
        savePreference(prefInfo).then(result => {
            if(result) history.push('/')
        })
    }
    function onAccountCategoryChanges(value:string){
        const  list2 = AccountTypes.filter(acc => acc.Parent === value);
        console.log(value, list2);
        setAccTypes(accTypes => [...list2]) 
    }
    return (
        <>
            <Formik validationSchema={preferencesObj} initialValues={prefInfo} 
                onSubmit={(values)=>handleSubmit(values)} >
                     {({handleSubmit, isValid, isSubmitting, dirty}) => (
                     <Form className="ui form" autoComplete='off'>
                        <FormDropDown options={TradingCountries} name='tradingCountries' lable='Trading countries' placeholder='Trading countries' />
                        <FormDropDown options={Branches} name='preferedBranch' lable='Prefered branch' placeholder='Prefered branch' />
                        <FormDropDown options={AccountCategory} name='accountCategory' lable='Account category' placeholder='Account category'
                        onChanged={onAccountCategoryChanges} />
                        <FormDropDown options={accTypes} name='accountType' lable='Account type' placeholder='Account type'
                          />
                        
                        <Button.Group floated='right'>
                            <Button content='back' as={NavLink} to={'/opening/contacts'} basic />
                            <Button disabled={!isValid || isSubmitting } animated >
                                <Button.Content content='Next' visible/>
                                <Button.Content hidden>
                                    <Icon name='arrow right' />
                                </Button.Content>
                            </Button>
                        </Button.Group>
                    </Form>)}
            </Formik>   
        </>
    )
}

export default Preferencepage;
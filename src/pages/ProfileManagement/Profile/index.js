import {memo, 
  useEffect, 
  useState
} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import '../index.style.less';
import {Button, Form, Select, DatePicker,Input} from 'antd';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useFormMessage from 'hooks/useFormMessage';
import AppInput from '@crema/core/AppInput';
import AppPageMetadata from '@crema/core/AppPageMetadata';
import {useIntl} from 'react-intl';
import Avatar from '@assets/avatar_anh_Binh.png';
import BackGround from '@assets/logo-brg-avatar.svg';
import API from 'api/Request';
import { REQUEST_MUTED } from '@api/RequestEnum';
import {
  GET_GENDER_CATEGORY,
  GET_JOB_TYPE_CATEGORY
} from 'shared/constants/ApiUrls';
import { 
  //onGetUserInfo, 
  onUpdateAvatar, onUpdateInfo } from 'redux/actions/Auth';
import TextArea from 'antd/lib/input/TextArea';
import Validators from 'shared/validators';
import { AppInfoView } from '@crema';


const Profile = () => {

  const {messages} = useIntl();
  const { Option } = Select;
  const [form] = Form.useForm();

  const {formatRequiredMessageId: frm, formatRequiredLabelId: frl} = useFormMessage();

  const dispatch = useDispatch();

  const {profile, accessToken, avatar} = useSelector(({auth}) => auth);
  const [phone, setPhone] = useState(profile.phone);
  const [fullName, setFullName] = useState(profile.fullName);
  const [email, setEmail] = useState(profile.email);
  const [address, setAddress] = useState(profile.address);
  const [description, setDescription] = useState(profile.description);
  const [personalId, setPersonalId] = useState(profile.personalId);
  
  useEffect(() => {
    console.log("profile",profile,dispatch);
    console.log("accessToken",accessToken);
    console.log("fullName",fullName);
    setPhone(profile.phone);
    setFullName(profile.fullName);
    setEmail(profile.email);
    setAddress(profile.address);
    setPersonalId(profile.personalId);
    setDescription(profile.description);
  }, []);

  const onFinish = () => {
    console.log(form.getFieldValue(),dispatch);
    const formData = form.getFieldValue();
    console.log("formData",formData);
    const day = new Date(formData.birthday.format(''));
    const birthday =  day.toLocaleDateString("en-US")
    const dataReq = {
      fullName: formData.fullName,
      email: formData.email,
      jobType: {
        code: formData.jobType,
      },
      gender: {
        code: formData.gender,
      },
      personalId: formData.personalId,
      description: formData.description,
      birthday: birthday,
      address: formData.address,
    }
    dispatch(onUpdateInfo({dataReq,accessToken}));
  }

  const [listGender,setListGender] = useState();
  const [listJobType,setListJobType] = useState();
  useEffect(() => {
    console.log("profile",profile);
    console.log("accessToken",accessToken);
    //dispatch(onGetUserInfo({accessToken}));

    API.get(GET_GENDER_CATEGORY, {REQUEST_MUTED})
    .then((data) => { 
      const list = data.map((v) => <Option key={v.code} value={v.code} selected>{v.name}</Option>);
      setListGender(list);
    })
    .catch((err) => {
      console.log("err",err);
    });

    API.get(GET_JOB_TYPE_CATEGORY, {REQUEST_MUTED})
    .then((data) => { 
      const list = data.map((v) => <Option key={v.code} value={v.code}>{v.name}</Option>);
      setListJobType(list);
    })
    .catch((err) => {
      console.log("err",err);
    });
  }, []);

  const onChageFilePicker = (e) => {
    console.log(e.target.files[0]);
    const image = e.target.files[0];
    dispatch(onUpdateAvatar({image,accessToken})) ;
  }

  

  return (
    <div style={{marginBottom:"30px"}}>
      <AppInfoView></AppInfoView>
      <AppPageMetadata title={messages['route.group.profileManagement']} />
      <img className='background-img' alt='background' src={BackGround} />
      <div className='profile'>
        <div className='profile-avatar'>
          <img className='avatar-img' alt='avatar' src={ avatar == null ? Avatar : avatar} />
        </div>
        {/* <Form 
        form={formAvatar}
        onFinish={onChageFilePicker}>
          <Form.Item
            name='avatar'
            className='form-field'
          >
            <Input type='file'></Input>
          </Form.Item>
          <Button type='primary' htmlType='submit' className='sign-btn'>
              <IntlMessages id='common.login' />
            </Button>
          </Form> */}
          
        <div className='profile-text' >
          <div>
            <label htmlFor="filePicker" className='upload-btn'>
              Tải ảnh lên
            </label>
            <div></div>
            <input id="filePicker"  style={{display:"none"}} type="file" onChange={onChageFilePicker} />
          </div>

          <div className='profile-text-note'>Chỉ tải ảnh JPG, GIF hoặc PNG với dung lượng tối đa 10MB </div>
          
        </div>
        
        
      </div>

      <div className='profile-form'>
        
        <div className='profile-text-label'>Thông tin cá nhân </div>
        <Form
          form={form}
          className='sign-form'
          name='basic'
          layout='vertical'
          initialValues={{
            fullName: fullName,
            phone: phone,
            email: email,
            address: address,
            description: description,
            personalId: personalId,
          }}
          onFinish={onFinish}
          onFinishFailed={() => {}}>
          <div className='form-padding-start'></div>
          <Form.Item
            name='fullName'
            className='form-field'
            label={frl('common.fullName')}
            rules={[{required: true, message: frm('common.fullName')}]}>
            <Input maxLength={255} autoFocus value="abc"/>
          </Form.Item>

          <Form.Item
            name='email'
            className='form-field'
            label={frl('common.email')}
            rules={[{required: true, message: frm('common.email')}]}>
            <AppInput maxLength={255} className="input-email" />
          </Form.Item>

          <Form.Item
            name='phone'
            className='form-field'
            label={frl('common.phoneNumber')}
            rules={[{required: true, message: frm('common.password')},
              {
                validator: (_, v) => Validators.PhoneNumber(v),
                message: messages['validator.phoneNumber'],
              },]}>
            <AppInput maxLength={255} disabled={true}/>
          </Form.Item>

          <Form.Item
            name='jobType'
            className='form-field'
            label={frl('common.object')}  
            rules={[{required: true, message: frm('common.object')}]}>
            <Select placeholder="Đối tượng"> 
                {listJobType}
            </Select>
          </Form.Item>

          <Form.Item
            name='gender'
            className='form-field'
            label={frl('common.gender')}
            rules={[{required: true, message: frm('common.gender')}]}>
            <Select placeholder="Giới tính" >
              {listGender}
            </Select>
          </Form.Item>

          <Form.Item
            name='birthday'
            className='form-field'
            label={frl('common.birthDay')}
            rules={[{required: true, message: frm('common.birthDay')}]}>
            <DatePicker 
            placeholder="" 
            />
          </Form.Item>

          <Form.Item
            name='address'
            className='form-field'
            label={frl('common.address')}
            rules={[{required: true, message: frm('common.address')}]}>
            <AppInput maxLength={255} />
          </Form.Item>

          <Form.Item
            name='personalId'
            className='form-field'
            label={frl('common.personalId')}
            rules={[{required: true, message: frm('common.personalId')}]}>
            <AppInput maxLength={255} />  
          </Form.Item>

          <Form.Item
            name='description'
            className='form-field'
            label={frl('common.description')}
            rules={[{required: true, message: frm('common.description')}]}>
            <TextArea maxLength={255} />  
          </Form.Item>
    
          <div className='form-btn'>
            <div className='form-btn-field'>
              <Button type='primary' className='cancle-btn'>
                <IntlMessages id='common.cancel' />
              </Button>
            </div>
            <div className='form-btn-field'>
              <Button type='primary' htmlType='submit' className='sign-btn'>
                <IntlMessages id='common.save' />
              </Button>
            </div>

          </div>
       
        </Form>
      </div>
      
    </div>
  );
};

export default memo(Profile);

Profile.propTypes = {};

Profile.defaultProps = {};

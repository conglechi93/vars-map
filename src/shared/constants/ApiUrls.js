// AUTH
export const LOGIN_BY_PASSWORD_API = '/vid/web/ajax/auth/login';
export const LOGIN_REQUEST_OTP_API = 'https://192.168.1.26:8543/vid/api/auth/phone';
export const LOGIN_CONFIRM_OTP_API = '/auth/verifyOTP';
// export const SIGNUP_REQUEST_OTP_API = 'vextsec/otp/request';
export const SIGNUP_REQUEST_OTP_API = 'https://192.168.1.26:8543/vextsec/otp/request';
export const SIGNUP_CONFIRM_OTP_API = 'https://192.168.1.26:8543/vextsec/otp/validate';
export const SIGNUP_BY_PHONE_API = '/vid/web/ajax/users/signup/phone'
export const RESET_PASSWORD_API = '/auth/updatePassword';
export const FORGET_PASSWORD_REQUEST_OTP_API = '/vid/api/users/password/forget';
export const FORGET_PASSWORD_CONFIRM_OTP_API = '/auth/resetPassword';
export const LOGOUT_API = '/vid/web/ajax/auth/logout/all';
export const LOGIN_GOOGLE_API = '/vid/web/ajax/auth/login/social/google';
export const LOGIN_FACEBOOK_API = '/vid/web/ajax/auth/login/social/facebook';
export const REGISTER_GOOGLE_API = '/auth/registerByGoogle';
export const REGISTER_FACEBOOK_API = '/auth/registerByFacebook';
export const VERIFY_FACEBOOK_API = '/auth/verifyEmailFacebook';
export const REQUEST_OTAC_API = '/vid/api/auth/code/request';
export const REQUEST_PHONE_OAUTH_API = "export const";
export const CHECK_PHONE_NUMBER = 'vid/api/users/checking/phone';
export const VERIFY_SOCIAL_LOGIN_API = 'vid/web/ajax/auth/login/social/verify';
// PROFILE
export const GET_USER_INFO_API = 'https://192.168.1.26:8543/vcms/users/me';
export const UPDATE_AVATAR_API = 'https://192.168.1.26:8543/vcms/users/me/avatar';
export const UPDATE_PROFILE_API = 'https://192.168.1.26:8543/vcms/users/me';
export const CHANGE_PASSWORD_API = 'https://192.168.1.26:8543/vid/api/users/me/password/change';

// MEMBER VARS
export const GET_BALANCE_WALLET_API = 'https://192.168.1.26:8543/vcms/wallets/me/';
export const CHECK_PASSWORD_API = 'https://192.168.1.26:8543/vid/api/users/me/password/checking';
export const ENROLL_USER_MEMBER_API = 'https://192.168.1.26:8543/vcms/members/me/enroll';

// TRANSACTION 
export const CREATE_TRANSACTION_API = 'https://192.168.1.26:8543/vcms/depositing/me/';
export const GET_TRANSACTION_DETAIL_API = 'https://192.168.1.26:8543/vcms/depositing/me/';

// CATEGORY
export const CATEGORIES_LIST_API = 'http://192.168.1.26:8500/vcat/categories/all';


// USER APPLICATION
export const GET_MANAGABLE_APPLICATION_API =
  '/vid/web/ajax/apps/view/getManageableApp';

// SECURITY
export const CLIENT_SECURITY_CHECK = '/vid/api/auth/checkClientId';

//GET CATEGORY 

export const GET_GENDER_CATEGORY = 'https://192.168.1.26:8543/vcat/categories/code/gender';
export const GET_JOB_TYPE_CATEGORY = 'https://192.168.1.26:8543/vcat/categories/code/jobType';



/* -----------------------------------------------------------------------
   * @ description : Main module to include all the messages used in project.
----------------------------------------------------------------------- */

export default {
  accept: 'Accepted',
  confirm: 'Confirmed',
  success: 'Success!',
  systemError: 'Technical error ! Please try again later.',
  userNotActivated: 'User not activated',
  emailNotVerified: 'Email not verified',
  emailAlreadyExists: 'Email already registered',
  invalidCredentials: 'Invalid user email or password.',
  adminNotAccessed: 'Admin could not be accessed in user list',
  serveyAdded: 'Survey added successfully!',
  surveyExist: 'Survey already exist!',
  userUpdated: 'Successfully Updated!',
  userAdded: 'You are registered successfully! A Verification OTP has been send to your mobile number, Please Confirm ',
  otpVerifySuccess: 'OTP verification successfull.',
  otpNotMatched: 'OTP not matched. Please enter correct OTP.',
  userNotExist: 'Invalid user id',
  passwordNotMatched: 'Old password is not matched',
  userSubscribed: 'You are subscribed successfully!',
  userAlreadySubscribed: 'You are already subscribed!',
  accountNotActivated: 'Please verify your account.',
  deactivatedUser: 'Deactivated successfully!',
  activatedUser:  'Activated successfully!',
  bookAppointment: 'Appointment booked!',
  accessAppointment: 'you have no access to appointments', 
  doctorProfileVerificationPending: "Your Profile is not verified by Admin ",
  emailLinkVerified: "Thank you for confirming your email, you can go back to the app and write your email in the chat to sign in",
  requirementMissing: "Please fill correct information.", 
  loginConfirmMessage: "Email has been verified, please go to app for the next steps",
  doctorProfileVerificationIntimation: "The account has been verified. Our team will conduct a diligence, and interview to verify the credentials and notify you.",
  unauthorizedUser: "You are not an authorized user to perform this action",
  tokenExpired: "Token is expired",
  redeemedCoupon: val => `Coupon has been successfully redeemed.`,
  

  /************ Common message by parameter **************/
  dataAdded: val => `${val} has been successfully added.`,
  dataUpdated: val => `${val} has been successfully updated.`,
  dataDeleted: val => `${val} has been successfully deleted.`,
  dataExist: val => `Same ${val} is already exist. Please try with another ${val}!`,
  dataNotExist: val => `${val} not exist.`,
  registrationOtp: otp => `${otp} is registration verification otp for Bestpay app. Do not share it with anyone.`,
  cantDeletedWithoutDeleteRelativeData: (param1, param2) => `${param1} can't be deleted without delete its ${param2}.`,

  /************ Transaction **************/
  trasactionMade: val => `${val} has been made successfully.`,
  invalidAmount: `Transaction amount should be less than user wallet amount`,
  invalidRedeemAmount: `Not enough balance. Please add money in your wallet.`,

  /************ Location **************/
  locationNotExist: 'Invalid location id',
  locationNotAssigned: 'Location not assigned to this user',

  /************ Page **************/
  pageAdded: val => `${val} has been successfully added.`,
  pageUpdated: val => `${val} has been successfully updated.`,
  pageDeleted: val => `${val} has been successfully deleted.`,
  pageExist: 'Same page title is already exist. Please try with another title!'

};

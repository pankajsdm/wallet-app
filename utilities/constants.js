/*
 * @file: constants.js
 * @description: It Contain all constants for application.
 * @author: Pankaj Pandey
 */

/********* User roles ********/
export const ROLE = {
  ADMIN: 1,
  DOCTOR: 2,
  PATIENT:3,
  CENTRALOFFICEUSER: 4,
  MARKEDLOCATIONUSER: 5
};
/********* Records limit ********/
export const LIMIT = {
  USERS: 10,
  APPOINTMENTS: 10,
  TRANSACTIONS: 10
};

/******** Doctors Day Shift Time **********/
export const dayShift = {
  start: "08:00:00",
  end: "21:59:00"
}
/********* Device types ********/
export const DEVICE = {
  IOS: 'ios'
};
/********* File types ********/
export const FILE_TYPE = {
  original: 'original',
  thumbnail: 'thumbnail'
};
/********* Folder types for file upload ********/
export const FOLDER_TYPE = {
  chat: 'chatMedia',
  profile: 'profile_pic',
  idp: 'idp' // ID proof for doctor connected account
};
/********* Static page Type/Slug ********/
export const PAGE_TYPE = {
  ABOUT_US: 'about-us',
  CONTACT_US: 'contact-us',
  PRIVACY_POLICY: 'privacy-policy',
  TERMS_CONDITIONS: 'terms-conditions'
};

/******LAT LONG Radius ************/
export const RADIUS = {
  VALUE: 1000
};

export const NOTIFICATION_CATEGORY = {
  BOOKING: "Booking",
  MESSAGE: "Chat Notification"
};
export const NOTIFICATION_MESSAGE = {
  NEWBOOKING: "New Booking",
  APPROVEDBOOKING: "Booking Accepted",
  REJECTBOOKING: "Booking Rejected",
  NEWMESSAGE: "New Message Received.",
};

export const encrytedStr = {
  secretkey: "B!O@K#Z$D%C^T&R@2@2$"
};
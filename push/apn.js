/* -----------------------------------------------------------------------
   * @ description : Here defines all push notification configration and functions.
----------------------------------------------------------------------- */
//************* $ npm install apn **************/

import APN from 'apn';
import config from 'config';
import path from 'path';
const { keyId, teamId, appTitle } = config.get('apn');

const options = {
  token: {
    key: path.resolve(__dirname + '/AuthKey_CKSJQFW5LZ.p8'), //'path/to/APNsAuthKey_XXXXXXXXXX.p8',
    keyId,
    teamId
  },
  production: false
};

const apnProvider = new APN.Provider(options);
const note = new APN.Notification();

export default (deviceToken, title, message, payload) => {
  note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
  note.badge = 1;
  note.sound = 'ping.aiff';
  note.alert = message;
  note.payload = payload ? payload : { messageFrom: appTitle };
  note.topic = 'com.bookzdoctor';
  apnProvider.send(note, deviceToken).then(result => {
    console.log('APN result =>>>>>>>>>>.!', result.failed, result);
  });
};

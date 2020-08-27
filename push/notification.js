/* -----------------------------------------------------------------------
   * @ description : Here defines all notification functions.
----------------------------------------------------------------------- */
import User from '../collections/user';
import config from 'config';
import sendAPN from './apn';
export default {
  /***************** Send single user notification *************/
  SINGLE: async payload => {
    const userData = await User.findOneByCondition({ _id: payload.targetId }).select({
      loginToken: 1
    });
    if (userData) {
      /********* Get tokens accourding to platform **********/
      const { iosTokens } = userData.loginToken.reduce(
        (data, row) => {
          if (data.iosTokens.findIndex(token => token === row.deviceToken) === -1) {
            data.iosTokens.push(row.deviceToken);
          }
          return data;
        },
        { iosTokens: [] }
      );
      if (iosTokens && iosTokens.length) {
        sendAPN(iosTokens, payload.type, payload.message, payload);
      } 
    }
  }
/*
    TEST: async (payload, message) => {
   
      payload = {};
      const token =
        "FCA6A8BD-FC78-4D44-B5D7-012FECDB7453";
      sendAPN("testing", token, {});
    }*/
};

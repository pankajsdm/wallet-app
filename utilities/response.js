/*
 * @file: response.js
 * @description: It Contain function layer for api response status with data.
 * @author: Pankaj Pandey
 */
import CryptoJS from "crypto-js";
import { encrytedStr } from './constants';

export const successAction = (data, message = 'OK') => {
    const data1 = { statusCode: 200, data, message };
    return data1;
	const dataToEncrypt = JSON.stringify(data1);
    const encPassword = encrytedStr.secretkey;
    const encryptedData = CryptoJS.AES.encrypt(dataToEncrypt.trim(), encPassword.trim()).toString();
    return ({"encrytData": encryptedData});
}

export const failAction = (message = 'Fail', statusCode = 400, data = null) => {
    const data1 = { statusCode, data, message };
    return data1;
	const dataToEncrypt = JSON.stringify(data1);
    const encPassword = encrytedStr.secretkey;
    const encryptedData = CryptoJS.AES.encrypt(dataToEncrypt.trim(), encPassword.trim()).toString();
    return ({"encrytData": encryptedData});

}
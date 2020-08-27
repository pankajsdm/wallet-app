/*
 * @file: stripe.js
 * @description: It Contain function layer for informatica.
 * @author: Pankaj
 */

import Message from '../collections/message';

/*********** Create customer ***********/
export const createInformatica = async payload => {
    
    //console.log("payload is", payload)
    return await Message.saveManyMessage(payload);
};
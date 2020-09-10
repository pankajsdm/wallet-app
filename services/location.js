/*
 * @file: page.js
 * @description: It contain function layer for service controller.
 * @author: Pankaj Pandey
 */


import Location from '../collections/location';
import Message from '../utilities/messages';
import { generateSlug } from '../utilities/universal';

/********** Save Page **********/
export const addLocation = async payload => {
    payload.slug = generateSlug(payload.title);
    return await Location.add(payload);
};


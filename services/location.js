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
    payload.location = {
        type : "Point",
        coordinates : [payload.latitude, payload.longitude]
    }
    return await Location.add(payload);
};

/********** Save Page **********/
export const getNearBy = async payload => {
    const coordinates = [payload.latitude, payload.longitude];
    const query = {
      location: {
          $near: {
            $geometry: { type: "Point",  coordinates: coordinates },
            $maxDistance: payload.distance
        }
      }
    }
    return await Location.findAll(query);
};


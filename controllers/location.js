/*
 * @file: Page.js
 * @description: It contain function layer for location controller.
 * @author: Pankaj Pandey
 */

import { successAction, failAction } from '../utilities/response';
import * as locationService from '../services/location';
import Message from '../utilities/messages';
import * as COUNTRIES from '../utilities/countries';
import { ROLE, STATUSCODE } from '../utilities/constants';

/**************** Get country lists ***********/
export const getCountryLists = async (req, res, next) => {
  try {

    console.log("COUNTRIES", COUNTRIES)
    res.status(STATUSCODE.SUCCESS).json(successAction(COUNTRIES, Message.success));
  } catch (error) {
    res.status(STATUSCODE.SERVERERROR).json(failAction(error.message));
  }
};

/**************** Get location lists ***********/
export const getLists = async (req, res, next) => {
  try {
    const payload = req.body;
    const data = await locationService.getAll(payload);
    res.status(STATUSCODE.SUCCESS).json(successAction(data, Message.success));
  } catch (error) {
    res.status(STATUSCODE.SERVERERROR).json(failAction(error.message));
  }
};

/**************** Add location for branch and marked location ***********/
export const add = async (req, res, next) => {
  try {
    const payload = req.body;
    payload.files = req.files;
    payload.appUrl = `${req.protocol}://${req.headers.host}`;
    payload.userId = req.user.userId;
    if(payload.translation)
      payload.translation = JSON.parse(payload.translation);

    const data = await locationService.addLocation(payload);
    res.status(STATUSCODE.SUCCESS).json(successAction(data, Message.dataAdded("Location")));
  } catch (error) {
    res.status(STATUSCODE.SERVERERROR).json(failAction(error.message));
  }
};


/**************** Update location ***********/
export const update = async (req, res, next) => {
  try {
    const payload = req.body;
    payload.files = req.files;
    payload.appUrl = `${req.protocol}://${req.headers.host}`;
    if(payload.translation)
      payload.translation = JSON.parse(payload.translation);
      
    const data = await locationService.updateLocation(payload);
    res.status(STATUSCODE.SUCCESS).json(successAction(data, Message.dataUpdated('Location')));
  } catch (error) {
    res.status(STATUSCODE.SERVERERROR).json(failAction(error.message));
  }
};


/**************** Get single location ***********/
export const get = async (req, res, next) => {
  try {
    const payload =  req.params;
    const data = await locationService.getLocationById(payload);
    res.status(STATUSCODE.SUCCESS).json(successAction(data, Message.success));
  } catch (error) {
    res.status(STATUSCODE.SERVERERROR).json(failAction(error.message));
  }
};

/**************** Get nearby office ***********/
export const nearby = async (req, res, next) => {

  try {
    const payload = req.body;
    const data = await locationService.getNearBy(payload);
    res.status(STATUSCODE.SUCCESS).json(successAction(data, Message.success));
  } catch (error) {
    res.status(STATUSCODE.SERVERERROR).json(failAction(error.message));
  }
};

/**************** Delete location ***********/
export const deleteLocation = async (req, res, next) => {
  try {
    const payload = req.params;
    const data = await locationService.deleteLocation(payload);
    res.status(STATUSCODE.SUCCESS).json(successAction(data, Message.dataDeleted('Location')));
  } catch (error) {
    res.status(STATUSCODE.SERVERERROR).json(failAction(error.message));
  }
};




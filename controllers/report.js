/*
 * @file: report.js
 * @description: It contain function layer for report controller.
 * @author: Pankaj Pandey
 */

import { successAction, failAction } from '../utilities/response';
import * as reportService from '../services/report';
import Message from '../utilities/messages';
import { STATUSCODE } from '../utilities/constants';

/**************** Get report lists ***********/
export const getReports = async (req, res, next) => {
  try {
    const payload = req.body;
    const data = await reportService.getAll(payload);
    res.status(STATUSCODE.SUCCESS).json(successAction(data, Message.success));
  } catch (error) {
    res.status(STATUSCODE.SERVERERROR).json(failAction(error.message));
  }
};

/**************** create new report  ***********/
export const add = async (req, res, next) => {
  try {
    const payload = req.body;
    payload.files = req.files;
    payload.userId = req.user.userId;
    payload.appUrl = `${req.protocol}://${req.headers.host}`;
    const data = await reportService.addReport(payload);
    res.status(STATUSCODE.SUCCESS).json(successAction(data, Message.dataAdded("Report")));
  } catch (error) {
    res.status(STATUSCODE.SERVERERROR).json(failAction(error.message));
  }
};

/**************** View report by ID ***********/
export const view = async (req, res, next) => {
  try {
    const payload =  req.params;
    const data = await reportService.getReportById(payload);
    res.status(STATUSCODE.SUCCESS).json(successAction(data, Message.success));
  } catch (error) {
    res.status(STATUSCODE.SERVERERROR).json(failAction(error.message));
  }
};


/**************** Delete location ***********/
export const deleteReport = async (req, res, next) => {
  try {
    const payload = req.params;
    const data = await reportService.deleteReport(payload);
    res.status(STATUSCODE.SUCCESS).json(successAction(data, Message.dataDeleted('Report')));
  } catch (error) {
    res.status(STATUSCODE.SERVERERROR).json(failAction(error.message));
  }
};




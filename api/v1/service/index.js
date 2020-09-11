/*
 * @file: index.js
 * @description: It's combine all service routers.
 * @author: Pankaj Pandey
 */


import addService from './add-service';
import updateService from './update-service';
import getServices from './get-services';
import deleteServices from './delete-service';
import getSingleService from './get-single-service';
import addProvider from './add-provider';

export default [
    addService,
    updateService,
    getServices,
    deleteServices,
    getSingleService,
    addProvider
];

/*
 * @file: index.js
 * @description: It's combine all service routers.
 * @author: Pankaj Pandey
 */


import addService from './add-service';
import updateService from './update-service';
import listServices from './list-service';
import getSingleService from './get-single-service';
import deleteService from './delete-service';

import listProvider from './list-provider';
import addProvider from './add-provider';
import updateProvider from './update-provider';
import getSingleProvider from './get-single-provider';
import deleteProvider from './delete-provider';

import addProviderPlan from './add-plan';
import updateProviderPlan from './update-plan';
import listProviderPlan from './list-provider-plan';
import getSingleProviderPlan from './get-single-plan';
import deleteProviderPlan from './delete-plan';


export default [
    addService,
    updateService,
    listServices,
    getSingleService,
    deleteService,

    listProvider,
    addProvider,
    updateProvider,
    getSingleProvider,
    deleteProvider,

    addProviderPlan,
    updateProviderPlan,
    listProviderPlan,
    getSingleProviderPlan,
    deleteProviderPlan
];

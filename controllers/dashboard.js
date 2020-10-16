/*
 * @file: dashboard.js
 * @description: It contain function layer for dashboard controller.
 * @author: Pankaj Pandey
 */

import { successAction, failAction } from '../utilities/response';
import User from '../collections/user';
import Service from '../collections/service';
import Provider from '../collections/provider';
import Location from '../collections/location';
import Message from '../utilities/messages';
import { STATUSCODE } from '../utilities/constants';



/**************** get service list ***********/
export const getDashboardListing = async (req, res, next) => {
  try {
    const totalUsers = await User.count();
    const totalBranchLocation = await User.findByCondition({role:2}).count();
    const totalMarkedLocator = await User.findByCondition({role:3}).count();
    const totalServices = await Service.count();
    const totalProviders = await Provider.count();
    const totalLocation = await Location.count();
    
    const countSection = {
        totalUsers: totalUsers,
        totalMarkedLocator: totalMarkedLocator,
        totalBranchLocation: totalBranchLocation,
        totalServices: totalServices,
        totalProviders: totalProviders,
        totalLocation: totalLocation,
    }

    const aggrQuery = [
        { $project: {plans: 1}},
        { $unwind: '$plans'},
        { $count: "plans" }
    ];
    const planData = await Provider.aggregate(aggrQuery);
    if(planData && planData[0].plans)
        countSection.plans = planData[0].plans;
    
    res.status(STATUSCODE.SUCCESS).json(successAction(countSection, Message.success));
  } catch (error) {
    res.status(STATUSCODE.SERVERERROR).json(failAction(error.message));
  }
};






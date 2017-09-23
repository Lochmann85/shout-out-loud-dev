import { MAX_SHOWN_SHOUTS } from './../../../configurations';

import { shoutModel } from './../../models';

import convertMongooseError from './../../convertMongooseToReadableError';

import {
   CustomError,
   MongooseSingleError
} from './../../../errorsApi';

/**
 * @private
 * @member _firstShoutId
 * @description id of the first shout, saved for deleting
 */
let _firstShoutId;

/**
 * @public
 * @function findAllShouts
 * @description looks for all Shouts
 * @returns {Promise} of Shouts
 */
const findAllShouts = () => {
   return shoutModel.find().exec()
      .then(shoutsQueue => shoutsQueue.reverse())
      .catch(error => new MongooseSingleError(error));
};

/**
 * @public
 * @function initializeShoutsQueue
 * @description gets the id of the first Shout
 * @returns {Promise} of initialized shouts queue
 */
const initializeShoutsQueue = () => {
   return findAllShouts().then(shoutsQueue => {
      if (shoutsQueue.length > 0) {
         _firstShoutId = shoutsQueue[shoutsQueue.length - 1].id;
      }
   });
};

/**
 * @public
 * @function cycle
 * @description cycles the table of shouts adds the new at front and deletes the last
 * @param {object} shoutData - data for the new Shout
 * @returns {Promise} of shouts queue
 */
const cycle = (shoutData) => {
   const shout = new shoutModel(shoutData); // eslint-disable-line new-cap

   return shout.save()
      .then(newShout => {
         return shoutModel.count().exec().then(numberOfShouts => {
            console.log(numberOfShouts);
            return findAllShouts();
         });
      })
      .catch(convertMongooseError);
};

/**
 * @public
 * @function alterShoutInput
 * @description validates and alters the shout input
 * @param {object} shoutData - data for the new Shout
 * @returns {Promise} of validated shout
 */
const alterShoutInput = (shoutData) => new Promise((resolve, reject) => {
   const shout = new shoutModel(shoutModel.alterShoutInput(shoutData)); // eslint-disable-line new-cap
   shout.validate(error => {
      if (error) {
         convertMongooseError(error).catch(reject);
      }
      else {
         resolve(shout);
      }
   });
});

export {
   findAllShouts,
   initializeShoutsQueue,
   cycle,
   alterShoutInput
};
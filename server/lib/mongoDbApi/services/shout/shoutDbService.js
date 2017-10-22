import { MAX_SHOWN_SHOUTS } from './../../../configurations';

import { shoutModel } from './../../models';

import convertMongooseError from './../../convertMongooseToReadableError';

import {
   MongooseSingleError
} from './../../../errorsApi';

/**
 * @private
 * @function _populated
 * @description adds the needed shout population
 * @returns {Promise} of mongoose query
 */
const _populated = (query) => {
   return query.populate("user").exec();
};

/**
 * @public
 * @function findAllShouts
 * @description looks for all Shouts
 * @returns {Promise} of Shouts
 */
const findAllShouts = () => {
   return _populated(shoutModel.find())
      .then(shoutsQueue => shoutsQueue.reverse())
      .catch(error => new MongooseSingleError(error));
};

/**
 * @private
 * @function _manageQueueSize
 * @description checks if the queue size is too large, if so deletes the first
 * @param {array} shownShoutsQueue - array of shown shouts
 * @returns {Promise} of shown shouts queue
 */
const _manageQueueSize = (shownShoutsQueue) => {
   const length = shownShoutsQueue.length;
   if (length > MAX_SHOWN_SHOUTS) {
      return shoutModel.findByIdAndRemove(shownShoutsQueue[length - 1].id).exec()
         .then(() => {
            shownShoutsQueue.pop();
            return shownShoutsQueue;
         });
   }
   else {
      return shownShoutsQueue;
   }
};

/**
 * @public
 * @function cycle
 * @description cycles the table of shouts adds the new at front and deletes the last
 * @param {object} shoutModel - data for the new Shout
 * @returns {Promise} of shouts queue
 */
const cycle = (shoutModel) => {
   return shoutModel.save()
      .then(newShout => {
         return findAllShouts().then(allShouts => {
            return _manageQueueSize(allShouts);
         });
      })
      .catch(convertMongooseError);
};

/**
 * @public
 * @function createShout
 * @description creates the new shout
 * @param {object} shoutData - data for the new Shout
 * @returns {Promise} of validated shout
 */
const createShout = (shoutData) => new Promise((resolve, reject) => {
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
   cycle,
   createShout
};
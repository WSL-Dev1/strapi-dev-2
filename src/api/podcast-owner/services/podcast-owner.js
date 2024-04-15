'use strict';

/**
 * podcast-owner service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::podcast-owner.podcast-owner');

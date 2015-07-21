/**
 * # trelloWebComponent.js
 *
 * This file contains the render functions for Trello content
 *
 * @author Cole Diffin <cole.diffin@gmail.com>
 * @module trelloWebComponent
 * @version 0.0.1
 */

'use strict';
var //fs = require('fs'),
    template = require('lodash.template'),
    request = require('superagent'),
    trelloWebComponent;

/*
 * Initialize Function
 *
 */
 module.exports = function (options){
    var trelloColumnTemplate,
        css,
        requestParams;

    //trelloColumnTemplate = template(fs.readFileSync(__dirname + '/../dist/src/template.html', 'utf8'));

    options = (options||{});

    requestParams = {
        host: options.host||window.location.hostname,
        port: options.port||window.location.port,
        path: options.path||'jiraSearch'
    };

    return {
        /**
        * # Renders the Column
        *
        * ### Examples
        *       var trello = require('trelloWebComponent')(options);
        *       trello.renderColumn(12345, '#selector')
        *
        * @alias module:trelloWebComponent.render
        **/
        renderColumn: function(boardID, selector){

            bluebird.fromNode(function(callback) {
                request.get(url, callback);
            }).then(function(data) {

                var selectorNode = document.querySelector(selector);
                selectorNode.innerHTML = jiraResultsTableTemplate({
                    headings:[1,2,3],
                    // Adds Variables
                    issues: data.body.issues
                });

            });

        }
    };
};


// * ### Examples:
//  *
//  *     require('trelloWebComponent')(options);
//  *
//  * ### Available Options
//  *   * AppKey
//  *   * UserToken
//  *
//  * @param {Object} The options to initialise the module
//  * @return {Object} The trelloWebComponent module
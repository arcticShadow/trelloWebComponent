/**
 * # trelloWebComponent.js
 *
 * This file contains the render functions for Trello content.
 * ### Examples:
 *
 *     require('trelloWebComponent')(options);
 *
 * ### Available Options
 *   * AppKey
 *   * UserToken
 *
 * @param {Object} The options to initialise the module
 * @return {Object} The trelloWebComponent module
 *
 * @author Cole Diffin <cole.diffin@gmail.com>
 * @module trelloWebComponent
 * @version 0.0.1
 */

'use strict';
var template = require('lodash.template'),
    request = require('superagent'),
    bluebird = require('bluebird'),
    trelloWebComponent;

var fs = require('fs');


 module.exports = function (options){
    var trelloColumnTemplate,
        css,
        url,
        urlParams;

    options.debug = options.debug||false;
    if(options.appKey == undefined || options.userToken == undefined){
        console.log("Miasing App key or User Token");
        return fasle;
    }

    // Prepare URL
    url = "https://api.trello.com/1/boards/"

    urlParams = "key=" + options.appKey +
        "&token=" + options.userToken;

    var templateSource = fs.readFileSync( __dirname '/../dist/src/template.html');

    trelloColumnTemplate = template(templateSource);

    return {
        /**
        * # Renders the Column from given board
        *
        * ### Examples
        *       var trello = require('trelloWebComponent')(options);
        *       trello.renderColumn(12345, '#selector')
        *
        * @alias module:trelloWebComponent.render
        **/
        renderColumn: function(boardID, columnID, selector){
            // lists=all&
            if (boardID == undefined) {
                console.err("Missing boardID")
                return false;
            }

            bluebird.fromNode(function(callback) {
                // should be cards=visible, but thats not working
                request.get(url+boardID + "/lists?cards=open&" + urlParams, callback);
            }).then(function(data) {
                if (options.debug) {
                    console.log(data.body);
                }

                //TODO: do this better
                var list;
                data.body.forEach(function(currentList){
                    if (currentList.id == columnID)
                        list = currentList;
                });

                var selectorNode = document.querySelector(selector);
                selectorNode.innerHTML = jiraResultsTableTemplate({
                    // Adds Variables
                    cards: list.cards
                 });

            });

        }
    };
};



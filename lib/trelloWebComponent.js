/**
 * # terlloWebComponent.js
 *
 * This file contains the render functions for Trello content
 *
 * @author Cole Diffin <cole.diffin@gmail.com>
 * @module trelloWebComponent
 * @version 0.0.1
 */

'use strict';
var insertCss = require('insert-css'),
    fs = require('fs'),
    template = require('lodash').template,
    request = require('superagent'),
    trelloWebComponent;

/*
 * This method log a given message to the console.
 *
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
 */
 trelloWebComponent = function (options){
    var trelloColumnTemplate,
        css,
        requestParams;

    trelloColumnTemplate = template(fs.readFileSync(__dirname + '/../dist/src/template.html', 'utf8'));

    css = fs.readFileSync(__dirname + '/tmp/theme.css', 'utf8');
    insertCss(css, { prepend: true });

    options = (options||{});

    requestParams = {
        host: options.host||window.location.hostname,
        port: options.port||window.location.port,
        path: options.path||'jiraSearch'
    };

    return {
        /**
        * @alias module:trelloWebComponent.render
        **/
        render: function(filterID, selector){
            var url = 'http://' +
                requestParams.host + ':' +
                requestParams.port + '/' +
                requestParams.path + '/' +
                filterID;

            bluebird.fromNode(function(callback) {
                request.get(url, callback);
            }).then(function(data) {

                var selectorNode = document.querySelector(selector);
                selectorNode.innerHTML = jiraResultsTableTemplate({
                    headings:[1,2,3],
                    issues: data.body.issues
                });

            });

        }
    };
};


module.exports = trelloWebComponent;
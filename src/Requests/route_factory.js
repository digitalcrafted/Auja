/**
 * Routing factory, will put all routes in place and ables request object
 * to pass request to correct handler
 */

import signals from 'signals';
import crossroads from 'crossroads';
import * as routers from './Routers/index.js';

if (!window.crossroads) {
    window.crossroads = crossroads;
}

//TODO make this working again (circular dependency, flux -> request -> route_factory -> flux)
//flux.store('AujaStore').on('change', function () {
//    crossroads.removeallroutes();
//
//    this.getstate().routes.map(function (route) {
//        routers[route.type].addroute(route);
//    }.bind(this));
//
//    //add fallback route to http router 
//    routers['http'].addroute({
//        target: /(.*)/
//    });
//});


//Add fallback route to http router 
//TODO use bypassed for this
routers['http'].addRoute({
    target: /(.*)/
});

module.exports = new function () {
    /**
     * Getter for the handler
     * @param url
     * @return handler
     */
    this.handler = function (url) {
        var handler = false;
        var route = false;

        //Return same handler as last time when same url is requested
        //crossroads will not parse same route twice in a row
        if (this.last && this.last.url == url) {
            handler = this.last.handler;
            route = this.last.route;
        } else {
            //Parse the url to fetch the corresponding handler
            crossroads.parse(url, [url, function (h, r) {
                handler = h;
                route = r;
            }.bind(this)]);

            if (handler) {
                this.last = {
                    url: url,
                    handler: handler,
                    route: route
                }
            }
        }

        //Log an error
        if (!handler) {
            console.error('No corresponding handler found for: ' + url);
        }

        //Instantiate the collected handler otherwise return false
        return handler ? new handler(url, route) : false;
    }
};


/*! Javascript logging library for jQuery 0.9.0 Beta
 *
 * Author: Adi Srikanth
 * Dependencies: jquery > 1.6 version
 * Free to use.
 * Under no license.
 */
 
/*
 * overrides native console object and pushes the logs to server
 * currently pushes logs to server only when console.log() is called. 
 */

(function(){
    window.logger = $.extend(true,{}, console); //clone console object
    logger.c = console; //backup of console for methods which are overridden
    logger.properties= {
      url : '',
      count: 5,
      timer: false, //if timer is false, ajax request is sent
      timeStamp: true
    };
    var logs = [];
    var pushLogs = function(str) {
        var msg = '';
        if(logger.properties.timeStamp) {
            var date = new Date();
            msg += date.toString();
            msg += '   ::::  ';
        }
        msg += str;
        logs.push(msg);
    }
    logger.log = function(msg) {
        pushLogs(msg);
        logger.c.log(msg);
    }
    window.console = logger;
}());


/*! Javascript logging library 0.9.0 Beta for jQuery
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
      timer: false, //if timer is false, ajax request is sent for every 5 log calls
      timeStamp: true
    };
    logger.logs = [];
    var pushLogs = function(str) {
        var msg = '';
        if(logger.properties.timeStamp) {
            var date = new Date();
            msg += date.toString();
            msg += '   ::::  ';
        }
        msg += str;
        logger.logs.push(msg);
    }
    logger.log = function(msg) {
        pushLogs(msg);
        logger.c.log(msg);
        if(logger.logs.length===5) {
            logger.send();
        }
    }
    logger.error = function(msg) {
        pushLogs(msg);
        logger.c.error(msg);
        if(logger.logs.length===5) {
            logger.send();
        }
    }
    logger.send = function() {
        var msgs = $.extend(true,[],logger.logs);
        logger.logs.length = 0;
        $.ajax({
            type: "POST",
            url: logger.properties.url,
            data: {logs:msgs},
            success: function(data){}
        });
    }
    
    //Also handle errors on page level
    window.onerror = function(message, file, line_number) {
        var msg = message + "::: File = " + file + "::: Linenumber = " + line_number;
        pushLogs(msg);
    };
    window.console = logger;
}());


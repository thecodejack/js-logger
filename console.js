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
    }
    window.console = logger;
}());


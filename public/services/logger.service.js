(function (){
'use strict';
angular.module('mdApp').factory('mdLoggerService', logger);

    logger.$inject = ['$log'];
    function logger($log) {
        
        var service = {
            error: error,
            success: success,
            info: info,
            warning: warning
        };
        return service;
        
        ////////////////
        function error(msg,data){
            $log.error("Error: " + msg,data)
        }
        
        function success(msg,data){
            $log.success("success: " + msg,data)
        }
        
        function info(msg,data){
            $log.info("info: " + msg,data)
        }
        
        function warning(msg,data){
            $log.warning("worning: " + msg,data)
        }
    }
})();
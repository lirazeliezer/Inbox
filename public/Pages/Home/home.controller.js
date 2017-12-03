(function (){
'use strict';
angular.module('mdApp').controller('homeCtrl', HomeController);
    
    HomeController.$inject = ['$http','mdMessageService'];
    
    function HomeController($http,msgService) {
        var homeVm = this;
        
        homeVm.unreadMessages = msgService.getUnreadMessages();
        homeVm.totalMessages = msgService.getMessagesAmount();
    };
})();
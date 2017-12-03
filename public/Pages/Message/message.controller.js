(function (){
'use strict'; 
angular.module('mdApp').controller('messageCtrl',MessageController); 
    
    MessageController.$inject = ['$routeParams','mdMessageService'];
    
    function MessageController($routeParams,msgService) {
        var messageVm = this;
        var msgId = parseInt($routeParams.id);
        
        messageVm.message = msgService.getMessageById(msgId);
        messageVm.message.dateString = 
            new Date(messageVm.message.receivedDate).toLocaleDateString("en-us", { month: "short", day: "numeric", year: "numeric" });

        if(!messageVm.message.isRead){
            msgService.setMsgAsRead(msgId)
        }
    }
})();
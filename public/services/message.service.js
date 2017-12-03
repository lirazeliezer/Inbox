(function (){
'use strict';
angular.module('mdApp').factory('mdMessageService',mdMessageService);

    mdMessageService.$inject = ['$http','$q','mdLoggerService','$rootScope'];
    
    function mdMessageService($http,$q, logger,$rootScope){
        var messagesList = [];
        
        var service= {
          initiaizeMsg: initiaizeMsg,
          getMessages: getMessages,
          getUnreadMessages: getUnreadMessages,
          getMessagesAmount: getMessagesAmount,
          getMessageById: getMessageById,
          setMsgAsRead: setMsgAsRead
        }
        return service;

        ////////////////////////
        function initiaizeMsg(){
            if(messagesList.length >0){
                return $q.when(messagesList);
            }
            else{
                 return $http.get('messages.json').then(getMessagesComplete).catch(getMessagesFailed);   
            }
        }
         
        function getMessages(){
            return messagesList;
        }
        
        function getMessagesComplete(response){
            messagesList = response.data.messages;
            return messagesList;
        }
        
        function getMessagesFailed(response){
            logger.error('Failed for initiaizeMsg.' + response.data);
            $q.reject(response);
        }
        
        function getUnreadMessages(){
             return messagesList.filter(message => !message.isRead).length;
        }

        function getMessagesAmount(){
            return messagesList.length;
        }

        function getMessageById(id){
            var msg;
            
            if(isNaN(id)){
               logger.error('Failed for getMessageById with invalid id ' + id);
               msg= messagesList[0]; 
                
            }else{
                msg = messagesList.filter(message => (message.id == id))[0];
                if(!msg){
                   logger.error('Failed for getMessageById, message doesnt exit with id  ' + id);
                   msg = messagesList[0];  
                }
            }
            return msg;
        }

        function setMsgAsRead(id){ 
            getMessageById(id).isRead = true;
            $rootScope.$broadcast('unreadMessages:updated',-1);
        }
    }
})();
(function (){
'use strict';
angular.module('mdApp').controller('inboxCtrl', InboxController);
    
    InboxController.$inject = ["mdMessageService","$location"];
    
    function InboxController(msgService,$location) {
        var inboxVm = this;
        var messagesList = msgService.getMessages();
        
        inboxVm.msgByDate = [];
        inboxVm.displayFullMessage = displayFullMessage;

        initializeInbox();
        
        ////////////
        function displayFullMessage(msg){
            $location.path("/message/" + msg.id);
        }
        
        function initializeInbox(){ 
            setDateProperties();
            splitMessagesByCategoryOrder();
        }
        
        // The properties should be already defined at the sql query
        function setDateProperties(){
            for(var i=0; i <messagesList.length; i++)
            {
                messagesList[i].receivedDate = new Date(messagesList[i].receivedDate);
                var msgDate = messagesList[i].receivedDate;
                var todayString = new Date().toLocaleDateString();
                var yesterdayString = new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString();
                
                if(new Date().getFullYear() > msgDate.getFullYear()){
                    messagesList[i]["dateCategory"] = "Earlier";
                    messagesList[i]["categoryOrder"]= 14;
                    
                }else if (msgDate.toLocaleDateString() == todayString){
                    messagesList[i]["dateCategory"] = "Today";
                    messagesList[i]["categoryOrder"]= 0;

                }else if (msgDate.toLocaleDateString() == yesterdayString){
                    messagesList[i]["dateCategory"] = "Yesterday";
                    messagesList[i]["categoryOrder"] = 1;
                }
                else{
                    messagesList[i]["dateCategory"] = msgDate.toLocaleString("en-us", { month: "long" });
                    messagesList[i]["categoryOrder"] = 2 + 11-msgDate.getMonth();
                }
            }
        }      
        
        function splitMessagesByCategoryOrder(){
            var objByCategory = {};
             angular.forEach(messagesList,function(msg){
                if(!objByCategory[msg["categoryOrder"]]){
                    objByCategory[msg["categoryOrder"]] = 
                        {category: msg["dateCategory"], messages :[]};
                }
                objByCategory[msg["categoryOrder"]].messages.push(msg);
            });
        
            Array.prototype.sort.call(objByCategory);
            
            angular.forEach(objByCategory,function(categoryObj){
                inboxVm.msgByDate.push(categoryObj);
            });
        }
    }
})();


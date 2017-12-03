(function (){
'use strict';
angular.module('mdApp').controller('mainCtrl', MainController);
    
    MainController.$inject = ['$scope','$http','mdMessageService'];
    
    function MainController($scope,$http,msgService) {
        var mainVm = this;
        
        msgService.initiaizeMsg().then(function(msg){
            mainVm.unreadMessages = msgService.getUnreadMessages();
        });
        
        $scope.$on('unreadMessages:updated', function(event,change) {
            mainVm.unreadMessages += change;
       });
    }
})();

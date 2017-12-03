(function (){
'use strict'; 
angular.module('mdApp', ['ngRoute']).config(appConfig);
    
    function appConfig($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl : 'Pages/Home/home.html',
                controller  : 'homeCtrl',
                controllerAs: 'homeVm',
                resolve: {
                  messagePrepService:messagePrepService
                }
            })
            .when('/inbox', {
                templateUrl : 'Pages/Inbox/inbox.html',
                controller  : 'inboxCtrl',
                controllerAs:'inboxVm', 
                resolve: {
                  messagePrepService:messagePrepService
                }
            })
            .when('/message/:id', {
                templateUrl : 'Pages/Message/message.html',
                controller  : 'messageCtrl',
                controllerAs: 'messageVm',
                resolve: {
                  messagePrepService : messagePrepService
                }
            });
}
    
    messagePrepService.$inject = ['mdMessageService'];
    function messagePrepService(mdMessageService){
        return mdMessageService.initiaizeMsg();
    }
})();

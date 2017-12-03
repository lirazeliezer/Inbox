(function (){
'use strict';
angular.module('mdApp').directive('mdMessage', mdMessageDirective);
    
    function mdMessageDirective() {
        return {
            restrict: 'E',
            templateUrl:
                function(elem, attr){
                    if (angular.isDefined(attr.detailed)){
                        return 'Message/mdFullDisplay.html';
                    }
                    else{
                        return 'Message/mdPartialDisplay.html';
                    }
            },
            scope: {
                message:"="
            }
        }
    }
})();

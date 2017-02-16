(function(){

angular.module("DSTInterfaceApp")
.factory('Requests', ['$http', function($http){
    return {

        getClusterList: function(){
            return $http.get(urlpath("dstapi/clusters"));
        },
        startCluster: function(cluster){
            return $http.post(urlpath("dstapi/clusters/start"), cluster);
        },

        stopCluster: function(){
            return $http.post(urlpath("dstapi/servers/stop"));
        }
    };
}]);

})();

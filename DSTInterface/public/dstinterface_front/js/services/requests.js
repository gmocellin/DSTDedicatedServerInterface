(function(){

angular.module("DSTInterfaceApp")
.factory('Requests', ['$http', function($http){
    return {
        // send_command: function(command){
        //     return $http.post(urlpath("dstapi/command"), command);
        // },
        // get_stdout: function(){
        //     return $http.get(urlpath("dstapi/stdout"));
        // },
        get_cluster_list: function(){
            return $http.get(urlpath("dstapi/list_clusters"));
        },
        run_cluster: function(cluster){
            return $http.post(urlpath("dstapi/start_cluster"), cluster);
        },

        close_cluster: function(){
            return $http.put(urlpath("dstapi/close_cluster"));
        }
    };
}]);

})();

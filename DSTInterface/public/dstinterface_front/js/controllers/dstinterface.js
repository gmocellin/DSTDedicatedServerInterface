(function(){

angular.module('DSTInterfaceApp')
.controller('DSTInterfaceController', function ($http, Requests, Notification) {

  this.command = "";
  this.clusterName = "";
  this.clusterList = [];

  var that = this;

  //recebe o response.data como parametro
  var notifyResponse = function(response){
    if(response.context.status == "error"){
      Notification.error(response.context.msg);  
    } else {
      Notification.success(response.context.msg);  
    }
  }
  
  this.getClusterList = function(){
    Requests.getClusterList().then(function(response) {
      notifyResponse(response.data);
      that.clusterList= response.data.clusterList;
    },function(response){
      Notification.error("Erro para listar os clusters");
      console.log("erro get_stdout");
    });
  }

  this.startCluster = function(){
    if (isInArray(this.clusterName, this.clusterList)){

      Requests.startCluster({"cluster": this.clusterName}).then(function(response) {
        notifyResponse(response.data);
      },function(response){
        console.log(response);
        Notification.error("Erro ao executar o cluster");
        console.log("Erro ao executar o cluster");
      });
    } else {
      Notification.error("Cluster inválido");
    }
    this.clusterName = "";
  };

  this.stopCluster = function(){
    Requests.stopCluster().then(function(response) {
      notifyResponse(response.data);
      console.log(response.data);
    },function(response){
      Notification.error("Erro ao terminar o cluster");
      console.log("Erro ao terminar o cluster");
    });
  };

  this.updateServer = function(){
    Requests.updateCluster().then(function(response) {
      notifyResponse(response.data);
      console.log(response.data);
    },function(response){
      Notification.error("Erro ao terminar o cluster");
      console.log("Erro ao terminar o cluster");
    });
  };

});

})();

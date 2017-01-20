(function(){

angular.module('DSTInterfaceApp')
.controller('DSTInterfaceController', function ($http, Requests, Notification) {

  this.command = "";
  this.start_cluster = "";
  this.cluster_list = [];
  this.stdout_list = [];

  var that = this;

  var notify_response = function(response){
    if(response.context.status == "error"){
      Notification.error(response.context.msg);  
    } else {
      Notification.success(response.context.msg);  
    }
  }

  Requests.get_cluster_list().then(function(response) {
    console.log(response.data);
    notify_response(response.data);
    //Notification.success("Cluster fechado.");
    that.cluster_list= response.data.cluster_list;
  },function(response){
    Notification.error("Erro para listar os clusters");
    console.log("erro get_stdout");
  });
  
  // this.send_command = function(){
  //   var that = this;
  //   console.log(this.command);
  //   Requests.send_command({"command": this.command}).then(function(response) {
  //     console.log(response.data.stdout);
  //     Notification.success("Cluster fechado.");
  //     that.stdout_list.push(response.data.stdout);
  //     console.log(that.stdout_list);
  //   },function(response){
  //     Notification.error("Erro ao terminar o cluster");
  //     console.log("erro");
  //   });
  //   this.command = "";
  // };

  this.run_cluster = function(){
    if (isInArray(this.start_cluster, this.cluster_list)){
      Requests.run_cluster({"cluster": this.start_cluster}).then(function(response) {
        notify_response(response.data);
        console.log(response.data);
      },function(response){
        Notification.error("Erro ao executar o cluster");
        console.log("Erro ao executar o cluster");
      });
    } else {
      Notification.error("Cluster inválido");
    }
    this.start_cluster = "";
  };

  this.close_cluster = function(){
    Requests.close_cluster().then(function(response) {
      notify_response(response.data);
      console.log(response.data);
    },function(response){
      Notification.error("Erro ao terminar o cluster");
      console.log("Erro ao terminar o cluster");
    });
  };

});

})();

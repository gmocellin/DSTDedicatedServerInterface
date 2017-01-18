(function(){

angular.module('DSTInterfaceApp')
.controller('DSTInterfaceController', function ($http, Requests) {

  this.command = "";
  this.cluster = "";
  this.clusters = "";
  this.stdout_list = [];

  var that = this;

  Requests.get_cluster_list().then(function(response) {
    console.log(response.data);
    that.clusters= response.data.cluster_list;
  },function(response){
    console.log("erro get_stdout");
  });
  
  // this.send_command = function(){
  //   var that = this;
  //   console.log(this.command);
  //   Requests.send_command({"command": this.command}).then(function(response) {
  //     console.log(response.data.stdout);
  //     that.stdout_list.push(response.data.stdout);
  //     console.log(that.stdout_list);
  //   },function(response){
  //     console.log("erro");
  //   });
  //   this.command = "";
  // };

  this.run_cluster = function(){
    var that = this;
    console.log(this.cluster);
    Requests.run_cluster({"cluster": this.cluster}).then(function(response) {
      console.log(response.data);
    },function(response){
      console.log("erro ao executar o cluster");
    });
    this.cluster = "";
  };

});

})();

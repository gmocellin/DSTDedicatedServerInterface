var express = require('express');
var router = express.Router();
var exec = require('child_process').exec;

var fullRote = "/home/dst/";
var dstFolder = fullRote + ".klei/DoNotStarveTogetherANewReignBeta/";
var serverFolder = fullRote + "server_dst/bin/";
var startServer = fullRote + "start_all.sh ";

var clusterList = [];

// router.get('/', function(req, res, next) {
//     res.render('index.html');
// });

router.get('/clusters', function(req, res) {

    var context = {};
    context.status = 'error';

    //command = "cat " + dstFolder + "clusterList.txt";
    command = "ls " + dstFolder + " | grep Cluster_";

    exec(command, (error, stdout, stderr) => {
        if (error) {
            context.status = "error";
            context.msg = "Erro ao listar os clusters";
            res.json({"context": context});
            return;
        }
        list = stdout.split('\n');
        if (list[list.length-1] == ""){
            list = list.slice(0, list.length-1);
        }
        context.status = "success";
        context.msg = "Clusters listados com sucesso";
        res.json({"context": context, "clusterList": list});
    });
});

router.post('/clusters/start', function(req, res) {

    var context = {};
    context.status = 'error';

    //console.log(req.body);
    var data = (req.body) ? req.body : undefined;
    if(data && data.cluster != "" ){
        var command = 'sh '+ startServer + data.cluster;
        exec(command, (error, stdout, stderr) => {
            if (error) {
                context.status = "error";
                context.msg = "Erro ao iniciar o cluster";
                res.json({"context": context});
                return;
            }
            context.status = "success";
            context.msg = "Cluster iniciado";
            res.json({"context": context});
        });
    } else {
        context.status = "error";
        context.msg = "Nome do cluster inválido";
        res.json({"context": context});
    }
});

router.post('/clusters/stop', function(req, res) {

    var context = {};
    context.status = 'error';

    command = "screen -X -S dst_server1 quit | screen -X -S dst_server2 quit";
    //console.log(command);
    exec(command, (error, stdout, stderr) => {
        if (error) {
            context.status = "error";
            context.msg = "Não foi possível fechar o cluster";
            res.json({"context": context});
            return;
        }
        context.status = "success";
        context.msg = "Cluster finalizado";
        res.json({"context": context});
    });
});

router.post('/servers/update', function(req, res) {

    var context = {};
    context.status = 'error';

    command = "sh " + serverFolder + "update.sh";
    //console.log(command);
    exec(command, (error, stdout, stderr) => {
        if (error) {
            context.status = "error";
            context.msg = "Não foi possível atualizar o servidor";
            res.json({"context": context});
            return;
        }
        context.status = "success";
        context.msg = "Servidor atualizado";
        res.json({"context": context});
    });
});

module.exports = router;

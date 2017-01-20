var express = require('express');
var router = express.Router();
var exec = require('child_process').exec;

var full_rote = "/home/giovane/";
var dst_folder = full_rote + ".klei/DoNotStarveTogetherANewReignBeta/";
var server_folder = full_rote + "server_dst/bin/";
var start_server = full_rote + "start_all.sh ";

var cluster_list = [];

router.get('/', function(req, res, next) {
    res.render('index.html');
});

router.get('/list_clusters', function(req, res, next) {

    var context = {};
    context.status = 'error';

    command = "cat " + dst_folder + "cluster_list.txt";

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
        res.json({"context": context, "cluster_list": list});
    });
});

router.post('/start_cluster', function(req, res, next) {

    var context = {};
    context.status = 'error';

    //console.log(req.body);
    var data = (req.body) ? req.body : undefined;
    if(data && data.cluster != "" ){
        var command = 'sh '+ start_server + data.cluster;
        exec(command, (error, stdout, stderr) => {
            if (error) {
                context.status = "error";
                context.msg = "Erro ao iniciar o cluster";
                res.json({"context": context});
                return;
            }
            context.status = "success";
            context.msg = "Cluster iniciado";
            res.json({"status": "success"});
        });
    } else {
        context.status = "error";
        context.msg = "Nome do cluster inválido";
        res.json({"status": "error"});
    }
});

router.put('/close_cluster', function(req, res, next) {

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
        res.json({"context": contexts});
    });
});

// router.get('/dir', function(req, res, next) {
//     exec('pwd', (error, stdout, stderr) => {
//         if (error) {
//             console.log("error cd ~");
//             return;
//         }
//         res.json({"dir": stdout});
//     });
// });

// executes `commands`
// router.post('/command', function(req, res, next) {

//     var context = {};
//     context.status = 'error';

//     var data = (req.body) ? req.body : undefined;
//     if(data){
//         if(data.command != ""){
//             data.command += " " + full_rote;
//             exec(data.command, (error, stdout, stderr) => {
//                 if (error) {
//                     context.status = 'error';
//                     context.error = error;
//                     res.json(context);
//                     return;
//                 }
//                 context.status = "success";
//                 context.stdout = stdout;
//                 res.json(context);
//             });
//             data.command = "echo '    "+ data.command +"' >> log/command_log";
//             exec(data.command, (error, stdout, stderr) => {
//                 if (error) {
//                     return;
//                 }
//                 return;
//             });
//         } else {
//             context.status = 'error';
//             context.msg = 'Missing command.';
//             res.json(context);
//         }
//     } else {
//         context.status = 'error';
//         context.msg = 'No Data';
//         res.json(context);
//     }
// });

module.exports = router;

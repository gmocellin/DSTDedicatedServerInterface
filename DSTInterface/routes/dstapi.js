var express = require('express');
var router = express.Router();
var exec = require('child_process').exec;

var dst_folder = "~/.klei/DoNotStarveTogetherANewReignBeta/";
var server_folder = "~/server_dst/bin/";
var start_server = "~/start_server.sh/";
var full_rote = "/home/dst/"

var command;

router.get('/', function(req, res, next) {
    res.render('index.html');     
});

router.get('/list_clusters', function(req, res, next) {
    command = "ls " + dst_folder;
    console.log(command);
    exec(command, (error, stdout, stderr) => {
        if (error) {
            res.json({"error": error});
            return;
        }
        res.json({"cluster_list": stdout});
    });
});

router.post('/start_cluster', function(req, res, next) {

    console.log(req.body);
    var command = 'sh '+ full_rote + 'start_all.sh ' + req.body.cluster;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            res.json({"error": error});
            return;
        }
        res.json({"response": stdout});
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

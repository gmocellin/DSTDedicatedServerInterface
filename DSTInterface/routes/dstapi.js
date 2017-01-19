var express = require('express');
var router = express.Router();
var exec = require('child_process').exec;

var full_rote = "/home/dst/";
var dst_folder = full_rote + ".klei/DoNotStarveTogetherANewReignBeta/";
var server_folder = full_rote + "server_dst/bin/";
var start_server = full_rote + "start_all.sh ";

var command;

router.get('/', function(req, res, next) {
    res.render('index.html');
});

router.get('/list_clusters', function(req, res, next) {
    command = "ls " + dst_folder;
    //console.log(command);
    exec(command, (error, stdout, stderr) => {
        if (error) {
            res.json({"status": "error"});
            return;
        }
        res.json({"status": "success", "cluster_list": stdout});
    });
});

router.post('/start_cluster', function(req, res, next) {

    //console.log(req.body);
    var data = (req.body) ? req.body : undefined;
    if(data && data.cluster != "" ){
        var command = 'sh '+ start_server + data.cluster;
        exec(command, (error, stdout, stderr) => {
            if (error) {
                res.json({"status": "error"});
                return;
            }
            res.json({"status": "success"});
        });
    } else {
        res.json({"status": "error"});
    }
});

router.put('/close_cluster', function(req, res, next) {
    command = "screen -X -S dst_server1 quit | screen -X -S dst_server2 quit";
    //console.log(command);
    exec(command, (error, stdout, stderr) => {
        if (error) {
            res.json({"status": "error"});
            return;
        }
        res.json({"status": "success"});
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

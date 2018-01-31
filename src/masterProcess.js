const cluster = require('cluster');
const os = require('os');

module.exports = function () {
    const numWorkers = process.env.WEB_CONCURRENCY || os.cpus().length;
    console.log('Master cluster setting up ' + numWorkers + ' workers...');

    for (let i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('online', (worker) => {
        console.log('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', (worker, code, signal) => {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });
};
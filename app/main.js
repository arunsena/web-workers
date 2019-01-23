//Create a web worker
if(worker in window){
    //Chrome doesn't allow workers if running scripts from a local file
    var worker = new Worker(URL.createObjectURL(new Blob(["("+workerFunction.toString()+")()"], {type: 'text/javascript'})));
    //Pass data to spawned process
    worker.postMessage('Hello World!');
    //log the return value
    worker.addEventListener('message', function response(event){
        console.log('Data coming from worker : ' + event.data);
    }, false);
}
if(window!=self){
    workerFunction();
}
function workerFunction (){
    self.addEventListener('message', function(e){
        self.postMessage(e.data);
    },false);
}

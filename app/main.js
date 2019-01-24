//Create a web worker
if(worker in window){
    //Chrome doesn't allow workers if running scripts from a local file
    var worker = new Worker(URL.createObjectURL(new Blob(["("+workerFunction.toString()+")()"], {type: 'text/javascript'})));
    //Pass data to spawned process
    worker.postMessage('Hello World!');
    //log the return value
    worker.addEventListener('message', function response(event){
        document.getElementById('result').innerHTML = 'Data coming through Ajax call in worker: '+ event.data;
        console.log('Data coming from worker : ' + event.data);
    }, false);
}
if(window!=self){
    workerFunction();
}
function workerFunction (){
    self.addEventListener('message', function(e){
        if(self.XMLHttpRequest){
            var xhttp = new XMLHttpRequest();
            xhttp.open('GET', 'https://jsonplaceholder.typicode.com/todos/10', true);
            xhttp.send();
            xhttp.onreadystatechange = function response(response){
                if(this.readyState ===4 && this.status ===200){
                    self.postMessage(this.responseText);
                }
            };
        }
    },false);
}

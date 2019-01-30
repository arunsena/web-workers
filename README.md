# Web Workers

JavaScript is a single threaded process. 

Scripts are executed in a sequential flow and are non concurrent, but developers mimic concurrency using timeout's and XMLHttpRequests

Though they are concurrent they are not non-blocking which means async events are executed once the current context is executed

With Intoduction to web workers, we can achieve multi thread process. Child processes are spawned to execute complex calcuations and executions

## Create a Web Worker

A worker can be created using and postMessage inferface is used for thread to thread communications

```
var worker = new Worker('worker.js');
```

Start a worker using ```worker.postMessage()```

## Communication

Since web workers are executed in seperate thread, they need to be in a seperate file

```
var worker = new Worker('doWork.js');

worker.addEventListener('message', function(e) {
  console.log('Worker said: ', e.data);
}, false);

worker.postMessage('Hello World'); // Send data to our worker.
```

## Worker Scope

In worker context, ```this``` and ```self``` refer to global scope

Workers have these subset of features available

* Navigator Object
* Location Object
* XMLHttpRequest
* Timeout's and Interval's
* App cache
* importScripts()
* Spawn other workers

Worker don't have access to

* DOM
* Window object
* Document object
* Parent object

## Inline workers

Not always, we can create a new script file for workers. With Blob(), we can create inline worker in the same script file

```
var blob = new Blob([
    "onmessage = function(e) { postMessage('msg from worker'); }"]);

// Obtain a blob URL reference to our worker 'file'.
var blobURL = window.URL.createObjectURL(blob);

var worker = new Worker(blobURL);
worker.onmessage = function(e) {
  // e.data == 'msg from worker'
};
worker.postMessage(); // Start the worker.
```


## Author

* Arun Bojja

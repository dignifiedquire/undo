var BCSocket = require('browserchannel/dist/bcsocket').BCSocket;
var sharejs = require('share/lib/client');
require('codemirror');
var CodeMirror = window.CodeMirror;
var attach = require('share-codemirror');

// Create a document
var elem = document.getElementById('pad');
var cm = CodeMirror.fromTextArea(elem, {
  mode: "text/plain"
});

var s = new BCSocket(null, {reconnect: true});
var connection = new sharejs.Connection(s);
var doc = connection.get('users', 'codemirror');

doc.subscribe();
doc.whenReady(function () {
  if (!doc.type) {
    doc.create('text', 'hello');
  }
  if (doc.type && doc.type.name === 'text') {
    var context = doc.createContext();

    // Attach to CodeMirror
    attach(cm, context);
  }
});



const textareas = {}

document.querySelectorAll('textarea').forEach((snippet) => {
  textareas[snippet.id] = CodeMirror.fromTextArea(snippet, {
    mode: 'javascript',
    lineNumbers: true
  })
})

document.querySelectorAll('button').forEach((button) => {
  button.addEventListener('click', function () {
    const id = this.getAttribute('for')
    const item = textareas[id]
    item.save()
    const el = item.getTextArea()
    var code = el.value
    let replacedCode;
    if(id=="stacking") {
    	var num = parseInt(window.document.getElementById('stack-num').value);
    	var stackDelay = parseInt(window.document.getElementById('stack-delay').value);
    	console.log("stack delay = "+stackDelay);
    	var whenToEval = 0;
    	if(!num) {
    		num = 1;
    	}
    	var originalCode = code;
    	for(var i = 0 ; i < num ; i++) {
    		code = originalCode.replace('{i}', i+1);
    		replacedCode = code.replace('electron-notifications', '../index.js');
    		setTimeout(eval, whenToEval,replacedCode);
    		whenToEval += stackDelay;
    		console.log("will evaluate next in "+whenToEval);
    	}
    } else {
    	replacedCode = code.replace('electron-notifications', '../index.js')
    	eval(replacedCode)
    }
  })
})

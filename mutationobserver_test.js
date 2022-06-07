<!DOCTYPE html>
<html>
<!-- Include stylesheet -->
<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
 
<!-- Create the editor container -->
<div id="editor">
  <p>Hello World!</p>
  <p>Some initial <strong>bold</strong> text</p>
  <p><br></p>
</div>
 
<!-- Include the Quill library -->
<script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
 
 <style>
 	.change-highlighter{
    	background:red;
    }
 </style>
<!-- Initialize Quill editor -->
<script>
var x = document.getElementById('editor');
  var quill = new Quill(x,{theme:'snow'});  
  function callback(mutations) {
    console.log(mutations);
    mutations.forEach(function(mutation){
    	if(mutation.type == 'characterData'){
        	// Get a reference to the parent node
                    let parentNode = mutation.target.parentElement;
                    if (parentNode.classList != '' && parentNode.classList != undefined) {
                        if (parentNode.classList.includes('change-highlighter')) {
                            return;
                        }
                    }
                    let sibling = mutation.target.nextSibling;

                    // Create the new node to insert
                    let newNode = document.createElement("span");
                    newNode.classList.add('change-highlighter');

                    // appending existing text node to new span element
                    newNode.appendChild(mutation.target);

                    if (sibling == null) {
                        sibling = mutation.target.previousSibling;

                        if (sibling == null) {
                            parentNode.appendChild(newNode);
                        }
                        else {
                            parentNode.insertAfter(newNode, sibling);
                        }
                    }
                    else {
                        parentNode.insertBefore(newNode, sibling);
                    }
                    
        }
        if(mutation.type == 'childList' && mutation.addedNodes.length>0){
        	//mutation.target.style.backgroundColor = 'red';
        }
    });
  }
window.onload = function(){
	loadObserver();
}
function loadObserver(){ 
console.log('loading');
let options = {
    childList: true,
    attributes: true,
    characterData: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true
};
let observer = new MutationObserver(callback);
let editor = document.querySelector('#editor');
observer.observe(editor, options);
   }
</script>
</html>

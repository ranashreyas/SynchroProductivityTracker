var myId = 0;
window.onload = function() {

	$('.dropzone').sortable({
		connectWith: '.dropzone',
		stop: function(e,ui){
			saveData(e);
    	}
	});

	$("#deleteTask").droppable({
		hoverClass: "trash-hover",
		drop: function ( event, ui ) {			
			ui.draggable.remove();
		}
	});

	// document.getElementById("deleteTask").addEventListener("drop", function(event){
	// 	event.preventDefault();
	// 	const id = event
	// 		// .originalEvent
	// 		.dataTransfer
	// 		.getData("text");
	// 	const taskElement = document.getElementById(id);
	// 	const dropzone = event.target;
	// 	dropzone.appendChild(taskElement);
	// 	document.getElementById(id).remove();
	// 	event
	// 		.dataTransfer
	// 		.clearData();
	// 	saveData();
	// 	document.getElementById("trash-icon").style.width = "30px";
	// 	document.getElementById("trash-icon").style.height = "30px";
	// });
	
	document.getElementById("add-task").addEventListener("click", function(){
		myId += 1;

		if(document.getElementById("task").value.toString().length > 0){
			var val = document.getElementById("task").value;
			document.getElementById("task").value = "";

			createBlock("todo", val);
			saveData();
		}
	});

	// document.onkeypress = function(evt) {
	// 	evt = evt || window.event;
	// 	var charCode = evt.keyCode || evt.which;
	// 	// var charStr = String.fromCharCode(charCode);

	// 	myId += 1;
	// 	if(charCode == 13 && document.getElementById("task").value.toString().length > 0){
	// 		var val = document.getElementById("task").value;
	// 		document.getElementById("task").value = "";

	// 		createBlock("todo", val);

	// 		setAllIdData();
	// 	}
	// };


	//retrieve data
	chrome.storage.sync.get("todo", function(data) {
		var i;
		for(i = 0; i < data.todo.length; i+=1){
			createBlock("todo", data.todo[i]);
		}
	});
	chrome.storage.sync.get("in_progress", function(data) {
		var i;
		for(i = 0; i < data.in_progress.length; i+=1){
			createBlock("in_progress", data.in_progress[i]);
		}
	});
	chrome.storage.sync.get("completed", function(data) {
		var i;
		for(i = 0; i < data.completed.length; i+=1){
			createBlock("completed", data.completed[i]);
		}
	});
	chrome.storage.sync.get("id", function(data) {
		myId = data.id;
	});

	document.getElementById("checkStorage").addEventListener("click", function(){
		checkStorage();
	});
	
	document.getElementById("clearData").addEventListener("click", function() {
		clearData();
	});
}

function createBlock(location, val) {
	const myDiv = document.createElement('div');
	myDiv.innerHTML = val.toString();
	// const newContent = document.createTextNode(val.toString());
	// myLi.appendChild(newContent);

	myDiv.id = (val.toString() + "-" + myId.toString(10));

	// myLi.setAttribute("class", "sortable li");
	// div.setAttribute("draggable", true);

	// myLi.addEventListener("dblclick", function(event) {
	// 	myLi.setAttribute("contenteditable", true);
	// });

	// myLi.addEventListener("clickout", function(event) {
	// 	myLi.setAttribute("contenteditable", false);
	// });
	// div.setAttribute("contenteditable", true);
	
	document.getElementById(location).appendChild(myDiv);
}

function saveData(event) {
	var arr1 = [];
	for(var currDiv = 0; currDiv < document.getElementById("todo").children.length; currDiv += 1){
		arr1.push(document.getElementById("todo").children[currDiv].innerHTML);
	}

	var arr2 = [];
	for(var currDiv = 0; currDiv < document.getElementById("in_progress").children.length; currDiv += 1){
		arr2.push(document.getElementById("in_progress").children[currDiv].innerHTML);
	}

	var arr3 = [];
	for(var currDiv = 0; currDiv < document.getElementById("completed").children.length; currDiv += 1){
		arr3.push(document.getElementById("completed").children[currDiv].innerHTML);
	}

	chrome.storage.sync.set({"todo" : arr1});
	chrome.storage.sync.set({"in_progress" : arr2});
	chrome.storage.sync.set({"completed" : arr3});
}

function checkStorage() {
	chrome.storage.sync.get("todo", function(data) {
		console.log(data);
	});
	chrome.storage.sync.get("in_progress", function(data) {
		console.log(data);
	});
	chrome.storage.sync.get("completed", function(data) {
		console.log(data);
	});
}

function clearData(){
	console.log("Clearning data in storage");
	var arr = [];
	chrome.storage.sync.set({'todo' : arr});
	chrome.storage.sync.set({'in_progress' : arr});
	chrome.storage.sync.set({'completed' : arr});
}
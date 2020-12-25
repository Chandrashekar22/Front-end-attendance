/*
$("#login-form").submit(function(e){
	e.preventDefault();
	let url = $(this).attr("action");
	console.log(url);
	let tid = $("input[name=\"teachername\"]").val();
	console.log(tid);
	//$.post(url, tid);	// either this method
	//or
	url = "http://18b9735fa65e.ngrok.io/student/01JST18CS066"
	$.getJSON(url, {tid}, function(data){
		console.log(data);
		console.log(typeof(data));
	});

	// if the response header says invalid username, display message "Invalid ID"
});
*/
$("form").submit(function(e){
	e.preventDefault();
	let thisForm = this;
	let thisFormName = this.name;
	let tid = $(this)[0][0].value;
	console.log(thisForm);
	console.log(thisFormName);
	//console.log(tid);
	// store only tid in session storage
	sessionStorage.setItem("tid", tid);
	console.log("tid="+tid);
	url = "http://77bcbb72f106.ngrok.io/login/" + thisFormName + "/" + tid;
	$.getJSON(url, {tid}, function(data){
		console.log(data);
		if(data.valid == true) {
			thisForm.submit();
		} else {
			alert("The usn or teacher id you entered is invalid");
		}
	});
	//$.post(url, tid);	// either this method
	//or
	//url = "http://18b9735fa65e.ngrok.io/student/01JST18CS066";
	

	// if the response header says invalid username, display message "Invalid ID"
});

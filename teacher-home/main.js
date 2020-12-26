var tid = sessionStorage.getItem("tid");
var url = "http://35.200.201.98:5000/teacher/" + tid;
//var url = "http://35.200.201.98:5000/teacher/t2";
//var url = "/t2.json";
var teacherDetails;

$.getJSON(url, {tid}, function(data){
	console.log(data.courses);
	console.log(typeof(data));

}).done(function(data){
	let items = [];
	//items.push("<select name=\"courseid\" id=\"ccode\">");
	$.each( data.courses, function(key, val) {
		items.push("<option value=" + "\"" + key + "\"" + ">" + key + "</option>");
	});
	//items.push("</select>");
	$("#ccode").html(items.join(""));
	$(".item2").html("Course: " + data.courses[Object.keys(data.courses)[0]].course_name);
	$(".item3").html("Number of Class: " + data.courses[Object.keys(data.courses)[0]].no_of_classes_taken);
	console.log(items);
	items.splice(0, items.length);
	console.log(items);
	$.each(data.courses[Object.keys(data.courses)[0]].students, function(key, val) {
		console.log(key, val);
		// change val.email to val.usn later
		items.push("<tr><td>" + val.name + "</td><td>" + val.usn + "</td><td><div class=\"checkabsent\"> <input type=\"checkbox\" name=\"absent\" value=\"" + val.usn + "\"></div></td></tr>");
		console.log("items of table=" + items);
	});
	$(".styled-table tbody").html(items.join(""));
	teacherDetails = data;
	//$.each( data.courses, function(key, val) {
});

$("#ccode").change(function(){
	console.log(this.value);
	console.log(teacherDetails);
	$(".item2").html("Course: " + teacherDetails.courses[this.value].course_name);
	$(".item3").html("Number of Class: " + teacherDetails.courses[this.value].no_of_classes_taken);
	let items = [];
	$.each(teacherDetails.courses[this.value].students, function(key, val) {
		console.log(key, val);
		// change val.email to val.usn later
		items.push("<tr><td>" + val.name + "</td><td>" + val.usn + "</td><td><div class=\"checkabsent\"> <input type=\"checkbox\" name=\"absent\" value=\"" + val.usn + "\"></div></td></tr>");
		console.log("items of table=" + items);
	});
	$(".styled-table tbody").html(items.join(""));
	/*
	$.each( teacherDetails.courses, function(key, val) {

	}*/

});

$("form").submit(function(e){
	e.preventDefault();
	let abs_date = $("#dtime").val();
	let abs_time = $("#dtime1").val();
	console.log(abs_date + " " + abs_time);
	let ccode = $("#ccode").val();
	console.log(ccode);
	console.log($(this).serialize());
	console.log($("input[type=checkbox]:checked"));
	let absentees_usn = [];
	let marked_absent = $("input[type=checkbox]:checked");
	$.each(marked_absent, function(key, val){
		absentees_usn.push(val.value);
	});
	console.log(absentees_usn);
	let the_json_obj = {teacher_id: tid, course_id: ccode, absent: absentees_usn, datetime: abs_date + " " + abs_time};
	console.log(the_json_obj);
	the_json = JSON.stringify(the_json_obj);
	let url1 = "http://35.200.201.98:5000/attendance";
	console.log(the_json);
	//$.post(url1, the_json, null, "json");
	/*$.ajax({
	  type: "POST",
	  url: url1,
	  data: the_json,
	  success: null,
	  dataType: "json",
	  contentType: "application/json;charset=utf-8",
	  headers: { "Access-Control-Request-Headers" : "*"},
	  accepts: "application/json"
	});*/
	let xhttp = new XMLHttpRequest();
	xhttp.open("POST", "http://35.200.201.98:5000/attendance", true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send(the_json); 
	/*const options = {
		method: "POST",
		body: the_json,
		headers: {
			"Content-Type": "application/json"
		}
	}

	//fetch(url1, options).then(res => res.json()).then(res => console.log(res)).catch(err => console.error(err));
	fetch(url1, options).then(res => res.json()).then(res => console.log(res));*/
});
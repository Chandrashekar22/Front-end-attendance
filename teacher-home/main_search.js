var tid = sessionStorage.getItem("tid");
//var url = "http://35.200.201.98:5000/teacher/" + tid;
var url = "http://35.200.201.98:5000/teacher/t2";
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
		items.push("<tr><td>" + val.name + "</td><td>" + val.email + "</td><td>" + val.phone + "</td><td>" + val.email + "</td></tr>");
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
		items.push("<tr><td>" + val.name + "</td><td>" + val.email + "</td><td><div class=\"checkabsent\"> <input type=\"checkbox\" name=\"absent\" value=\"" + val.email + "\"></div></td></tr>");
		console.log("items of table=" + items);
	});
	$(".styled-table tbody").html(items.join(""));
	/*
	$.each( teacherDetails.courses, function(key, val) {

	}*/

});

/*$("form").submit(function(e){
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
	let the_json_obj = {teacher_id: tid, course_id: ccode, absent: absentees_usn};
	console.log(the_json);
	//the_json = JSON.stringify(the_json_obj);
	$.post(url, the_json);
});*/
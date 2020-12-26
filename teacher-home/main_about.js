var tid = sessionStorage.getItem("tid");
//var url = "http://35.200.201.98:5000/teacher/" + tid;
var url = "http://35.200.201.98:5000/teacher/t2";
//var url = "/t2.json";

$.getJSON(url, {tid}, function(data){
	console.log(data.courses);
	console.log(typeof(data));

}).done(function(data){
	//let items = [];
	//items.push("Teacher name: " + data.teacher_name + "Department: " + data.department_name + "HOD: " + data.HOD);
	$(".item1").html("Teacher ID: " + tid);
	$(".item2").html("My Name: " + data.teacher_name);
	$(".item3").html("Department: " + data.department_name);
	$(".item4").html("HOD: " + data.HOD);
});
$("#contact-info").hide();
/*
$(".right button").click(function(){
	$("#student-details").hide();
	$("#contact-info").toggle();
});
*/
/*
$("#student-details").click(function(){
	$(this).toggle();
});
*/

var url = "http://77bcbb72f106.ngrok.io/student/01JST18CS001";
var tid = sessionStorage.getItem("tid");
//var url = "http://77bcbb72f106.ngrok.io/student/" + tid;

$.getJSON(url, {tid}, function(data){
	console.log(data);
	console.log(typeof(data));
}).done(function(data){
	//console.log(data);
	//$("#student-details").html("Name: "+ data.name + "<br>Semester: " + data.sem);
	let items = [];
	$.each( data, function(key, val) {
		if(key == "courses") {
			console.log(val);
			items.push("<table id=\"attendance-details-table\"><tr><th>Course</th><th>Teacher</th><th>Attendance Percentage</th><th>Absent Dates</th></tr>");
			val.forEach(function(v, i, theArray){
				items.push("<tr><td>" + v.course + "</td><td>" + v.teacher + "</td><td>" + v.attendance + "</td><td>");
				if(v.absent_dates != null) {
					v.absent_dates.forEach(function(v1, i1) {
						items.push(v1 + "<br>");
					});
					//items.push("<td>" + v.absent_dates + "</")
					items.push("</td>");
				}
			});
			items.push("</table>");
			return;
		}
	  	items.push( "<li id='" + key + "'>" + capitalize(key) + ": " + val + "</li>" );
	});
	$("#student-details").html("<ul>" + items.join("") + "</ul>");
	console.log(data["usn"]);
});

function capitalize(string) {
	return(string.charAt(0).toUpperCase() + string.substr(1).toLowerCase());
}
$("#contact-info").hide();

$(".right button").click(function(){
	$("#contact-info").toggle();
});

var url = "http://18b9735fa65e.ngrok.io/student/01JST18CS066";
var tid = sessionStorage.getItem("tid");
$.getJSON(url, {tid}, function(data){
	console.log(data);
	console.log(typeof(data));
}).done(function(data){
	//console.log(data);
	//$("#student-details").html("Name: "+ data.name + "<br>Semester: " + data.sem);
	let items = [];
	$.each( data, function(key, val) {
	  items.push( "<li id='" + key + "'>" + capitalize(key) + ": " + val + "</li>" );
	});
	$("#student-details").html("<ul>" + items.join("") + "</ul>");
	console.log(data[0]);
});

function capitalize(string) {
	return(string.charAt(0).toUpperCase() + string.substr(1).toLowerCase());
}
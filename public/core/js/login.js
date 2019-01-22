$(window).load(function(){
	$("#login-wrapper").center().fadeIn(200);
});
$(window).resize(function(){
	$("#login-wrapper").center();
});
function login(e){
	location.reload();
}
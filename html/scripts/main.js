io.emit('getGroups', function(){
	// puts initial groups down
});

io.emit('getAnnouncements', function(){
	// puts initial announcements down
});

socket.on('groupMessage', function(user, group, message){
	
});

socket.on('announcement', function(user, announcement){

});

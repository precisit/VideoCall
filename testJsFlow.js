
console.log('Hej from javascript');

jsFlow.onRecievedUserId = function(userId) {
	console.log('userId', userId);
};

jsFlow.run("31bc728296d8da7e14e132k",{sessionAuthURL: 'http://corslabs.com/jsflow', 
									debugMsg: true});

var sendMessage = function(toUser, payload, tag) {
	jsFlow.messageUser(toUser, payload, tag);
}

//Send SDP Offer
//jsFlow.messageUser(toUser, sdp_offer, 'SDP_offer');

//Send SDP Answer
//jsFlow.messageUser(toUser, sdp_answer, 'SDP_answer');

//Send ICE candidate
//jsFlow.messageUser(toUser, candidate, 'ICE_candidate');

jsFlow.addHandler("helloworld", function (payload, from){
		console.log('From', from);
		console.log('Payload', payload);
});



//Handle SDP Offer B hanterar (A->B)
sFlow.addHandler("SDP_offer", function (payload, from){
	//Insert offer in peer connection
});

//Handle SDP Answer A hanterar (B->A)
sFlow.addHandler("SDP_answer", function (payload, from){
	//Insert answer in peer connection
});

//Handle ICE Candidate (A<->B)
sFlow.addHandler("ICE_candidate", function (payload, from){
	//Add ice candidate to peer connection
});


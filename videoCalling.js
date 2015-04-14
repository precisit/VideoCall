
// Run jsFlow
jsFlow.onRecievedUserId = function(userId) {
  console.log('userId', userId);
};
jsFlow.run("31bc728296d8da7e14e132k",{sessionAuthURL: 'http://corslabs.com/jsflow', 
                  debugMsg: true});

// Add handlers for jsFlow
jsFlow.addHandler("SDPoffer",function (offer, from){
  console.log('Got SDP Offer', from, offer);

  navigator.getUserMedia({video: true, audio: true}, function(stream) {
    console.log('Got user media!');
    $('video#localVideo').attr('src', URL.createObjectURL(stream));
    
    // Create a stream
    pc.onaddstream = function(evt) {
      console.log('Stream was added!', evt.stream);
      $('video#remoteVideo').attr('src', URL.createObjectURL(evt.stream));
    }

    pc.onicecandidate = function(evt) {
      jsFlow.messageUser(from, evt.candidate, 'ICEcandidate');
    };

    // Adding a local stream won't trigger the onaddstream callback
    pc.addStream(stream);

    offer = new SessionDescription(offer)
    pc.setRemoteDescription(offer);

    pc.createAnswer(function (answer) {
        pc.setLocalDescription(answer, function() {
          readyForIce = true;
          processBufferedIceCandidates();

          console.log('Set local description success!');
        }, function(error) {
          console.log('Error 1', error);
        });
    
        jsFlow.messageUser(from, answer, 'SDPanswer');
    }, function(error){
      console.log(error);
    });

  }, function(error) {
    console.log('Error 3', error);
  });

});

// Add handlers for jsFlow
jsFlow.addHandler("SDPanswer",function (answer, from){
  console.log('Got SDP Answer', from, answer);
  answer = new SessionDescription(answer);
  pc.setRemoteDescription(answer);
});

var readyForIce = false;
var iceCandidateBuffer = [];
jsFlow.addHandler("ICEcandidate",function (candidate, from){
  console.log('Got ICE candidate', from, candidate);
  if(!readyForIce) {
    iceCandidateBuffer.push(candidate);
  }
  else if(candidate) {
    pc.addIceCandidate(new RTCIceCandidate(candidate));
  }
});

var processBufferedIceCandidates = function() {
  iceCandidateBuffer.forEach(function(candidate) {
    pc.addIceCandidate(new RTCIceCandidate(candidate));
  });
}

// ==========================================
// RTC Peer Connection Session (one per call)
// ==========================================
 var PeerConnection =
        window.RTCPeerConnection    ||
        window.mozRTCPeerConnection ||
        window.webkitRTCPeerConnection   

// =================================
// ICE (many route options per call)
// =================================
 var IceCandidate =
        window.mozRTCIceCandidate ||
        window.RTCIceCandidate;

// =====================================================
// Media Session Description (offer and answer per call)
// =====================================================
var SessionDescription =
        window.RTCSessionDescription    ||
        window.mozRTCSessionDescription ||
        window.webkitRTCSessionDescription;        


// Defining IceServers 
var isChrome = !!navigator.webkitGetUserMedia;
navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.getUserMedia;

var STUN = {
    url: isChrome 
       ? 'stun:stun.l.google.com:19302' 
       : 'stun:23.21.150.121'
};
var iceServers = {
   iceServers: [STUN]
};

// Create peer connection 
var pc = new PeerConnection(iceServers);


var makeCall = function(toUser) {
  console.log('Will make call', toUser);

  navigator.getUserMedia({video: true, audio: true}, function(stream) {
    console.log('Got user media!');
    $('video#localVideo').attr('src', URL.createObjectURL(stream));

    // Create a stream
    //pc.onaddstream({stream: stream});
    pc.onaddstream = function(evt) {
      console.log('Stream was added!', evt.stream);
      $('video#remoteVideo').attr('src', URL.createObjectURL(evt.stream));
    }

    pc.onicecandidate = function(evt) {
      jsFlow.messageUser(toUser, evt.candidate, 'ICEcandidate');
    };


    // Adding a local stream won't trigger the onaddstream callback
    pc.addStream(stream);

    // Create offer 
    pc.createOffer(function(offer) {
      // Create Session Description Protocol (SDP)
      var sdp = new SessionDescription(offer);

      //Send SDP
      jsFlow.messageUser(toUser, sdp, 'SDPoffer');

      pc.setLocalDescription(sdp, function() {
        readyForIce = true;
        processBufferedIceCandidates();
        console.log('Set local description success!');
      }, function(error) {
        console.log('Error 1', error);
      });
    }, function(error) {
      console.log('Error 2', error);
    });
  }, function(error) {
    console.log('Error 3', error);
  });
};






/*
// Such an event is sent by the browser to inform that negotiation will be required at some point in the future. 
pc.onnegotiationneeded = function(event) { alert("negotiationneeded event detected!"); }; 


// Initializing the call
// Navigates the call/ fetches the video call
navigator.getUserMedia({video: true, audio: true}, function(stream) {
// Create a stream
  pc.onaddstream({stream: stream});
// Adding a local stream won't trigger the onaddstream callback
  pc.addStream(stream);

// Create offer 
pc.createOffer(function(offer) {
// Create Session Description Protocol (SDP)
	var sdp = new SessionDescription(offer);
	pc.setLocalDescription(sdp, function() {
// Send the offer to a server to be forwarded to the friend you're calling.
// js.FLow

  }, error);
}, error);

// NEED: icecandidate automatically created with peerconnection, we have to send it to the other side

// Event handler called when the icecandidate event is received. Such an event is sent when a RTCICECandidate object is added to the script
pc.onicecandidate = function(event) {
            var candidate = event.candidate;
        };



// Answering a call
var offer= getOfferFromFriend();
//navigator.getUserMedia({video: true, audio: true}, function(stream) {
 // pc.onaddstream({stream: stream});
//  pc.addStream(stream);

// Set up remote SDP
var sdpRemote = new SessionDescription(offer);
pc.setRemoteDescription (sdpRemote, function() {
  // Create an answer
  pc.createAnswer(function(answer){
      pc.setLocalDescription(new RTCSessionDescription(answer), function() {
        // send the answer to a server to be forwarded back to the caller (you)
        // js.Flow
      }, error);
    }, error);
  }, error);
}




// Handling the answer
//var offer = getResponseFromFriend();
//pc.setRemoteDescription(new RTCSessionDescription(offer), function() { }, error);

*/
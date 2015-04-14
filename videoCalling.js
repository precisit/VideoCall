
// Create websocket
var Websocket = require('ws');
var ws = new WebSocket('ws://127.0.0.1:'+ port +'/websocket')


// RTC Peer Connection Session (one per call)
 var PeerConnection =
        window.RTCPeerConnection    ||
        window.mozRTCPeerConnection ||
        window.webkitRTCPeerConnection   

// ICE (many route options per call)
 var IceCandidate =
        window.mozRTCIceCandidate ||
        window.RTCIceCandidate;

// Media Session Description (offer and answer per call)
var SessionDescription =
        window.RTCSessionDescription    ||
        window.mozRTCSessionDescription ||
        window.webkitRTCSessionDescription;        

// Create peer connection 
var pc = new RTCPeerConnection();


// Defining IceServers 
var isChrome = !!navigator.webkitGetUserMedia;

var STUN = {
    url: isChrome 
       ? 'stun:stun.l.google.com:19302' 
       : 'stun:23.21.150.121'
};
var iceServers = {
   iceServers: [STUN]
};


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
pc.onicecandidate()

    }, error);
     }, error);
}

// NEED: icecandidate automatically created with peerconnection, we have to send it to the other side
peer.onicecandidate = function(event) {
            var candidate = event.candidate;
            if(candidate) {
             
                });
            }
        };



// Answering a call
var offer= getOfferFromFriend();
navigator.getUserMedia({video: true, audio: true}, function(stream) {
  pc.onaddstream({stream: stream});
  pc.addStream(stream);

// Set up remote SDP
var sdpRemote = new SessionDescription(offer);
pc.setRemoteDescription (sdpRemote, function()

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
var offer = getResponseFromFriend();
pc.setRemoteDescription(new RTCSessionDescription(offer), function() { }, error);
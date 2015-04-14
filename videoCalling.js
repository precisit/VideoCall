
// Create websocket
var Websocket = require('ws');
var ws = new WebSocket('ws://127.0.0.1:'+ port +'/websocket')

// Run jsFlow
jsFlow.run("DEV_PUBLIC_KEY");

var peer = 'Bob';

// Add handlers for jsFlow
jsFlow.addHandler("SDPoffer",function (payload, from){
  // Send message to peer containing SDP offer
  jsFlow.messageChannel(peer, payload, 'SDPoffer');
});

jsFlow.addHandler("icecandidate",function (payload, from){
  // Send message to peer containing ice candidate
  jsFlow.messageChannel(peer, payload, 'icecandidate');
});

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

var STUN = {
    url: isChrome 
       ? 'stun:stun.l.google.com:19302' 
       : 'stun:23.21.150.121'
};
var iceServers = {
   iceServers: [STUN]
};

// Create peer connection 
var pc = new RTCPeerConnection(iceServers);

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
            if(candidate) {
             
                });
            }
        };



// Answering a call
var offer= getOfferFromFriend();
//navigator.getUserMedia({video: true, audio: true}, function(stream) {
 // pc.onaddstream({stream: stream});
//  pc.addStream(stream);

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
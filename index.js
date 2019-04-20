// console.clear();
'use strict';

var videoPlayer = window.videoPlayer || {}; 

(function (o) {  
  var types = {mp4:'video/mp4',webm:'video/webm', m3u: 'application/x-mpegURL'};

  var vPlaylist = [
    // {sources: [{src: baseUrl+'1.mp4', type: types.mp4}]},
    // {sources: [{src: baseUrl+'2.mp4', type: types.mp4}]},
    // {sources: [{src: baseUrl+'3.mp4', type: types.mp4}]},
    // {sources: [{src: baseUrl+'4.mp4', type: types.mp4}]}
    // ,    
    {sources: [{src: 'https://vjs.zencdn.net/v/oceans.mp4', 
                type: types.mp4},
               {src: 'https://vjs.zencdn.net/v/oceans.webm', 
                type: types.webm }]},
    {sources: [{src: 'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8', 
                type: types.m3u}]},
    {sources: [{src: 'https://d2zihajmogu5jn.cloudfront.net/big-buck-bunny/master.m3u8',
                type: types.m3u}]}
  ];

  var rate = 1; // playback rate
  var options = {
    autoplay: true, 
    controls: true, 
    muted: true, 
    fluid: false, 
    playbackRates: [1,1.25,1.5,1.75,2,2.25,2.5],
    inactivityTimeout: 0 // 0 indicates that the user will never be considered inactive.
  };
  var player = videojs('playerOne', options);

  player.ready(function() {
    // videojs.log('Ready Player One');
    this.playlist(vPlaylist);
    this.playlist.autoadvance(0);
    this.playlist.repeat(true);  // Allow skipping back to first video in playlist.
  });

  // player.on(['duringplaylistchange','playlistchange','beforeplaylistitem', 'playlistitem','playlistsorted'], function(e) { videojs.log(e.type); });
  
  player.on('beforeplaylistitem', function() { rate = this.playbackRate(); });
  
  player.on('playlistitem', function() { this.playbackRate(rate); });

//   var buttonComponent = videojs.getComponent('Button');
//   var buttons = ['vprevious','vnext'];
//   var buttonObj;
  
//   for (var i=0; i < buttons.length; i++) {
//     var button = buttons[i];
//     buttonObj = videojs.extend(buttonComponent, {    
//       constructor: function() {
//         buttonComponent.apply(this, arguments);
//         this.addClass('icon-' +button);
//         this.controlText(button);
//       },
//       handleClick: function(e) {
//         switch(button) {
//           case 'vprevious': player.playlist.previous(); console.log(button); break;
//           case 'vnext': player.playlist.next(); console.log(button);  break;
//         }
//       }
//     });

//     videojs.registerComponent(button,buttonObj);
//   }
//   player.getChild('controlBar').addChild('vprevious', {},0); 
//   player.getChild('controlBar').addChild('vnext',{},2);


  var buttonComponent = videojs.getComponent('Button');
  
  var prevButton = videojs.extend(buttonComponent, {    
    constructor: function() {
      buttonComponent.apply(this, arguments);
      this.addClass('vjs-icon-previous-item');
      this.controlText('Previous');
    },
    handleClick: function(e) {
      player.playlist.previous();
    }
  });

  var nextButton = videojs.extend(buttonComponent, {    
    constructor: function() {
      buttonComponent.apply(this, arguments);
      this.addClass('vjs-icon-next-item');
      this.controlText('Next');
    },
    handleClick: function(e) {
      player.playlist.next();
      // this.controlText('Next (part 3)');
    }
  });

  videojs.registerComponent('prevButton', prevButton);
  videojs.registerComponent('nextButton', nextButton);

  player.getChild('controlBar').addChild('prevButton', {}, 0);
  player.getChild('controlBar').addChild('nextButton', {}, 2);
})(videoPlayer);
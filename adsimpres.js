/**
 * Copyright 2014 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var player = videojs('playerOne');

var options = {
  id: 'playerOne',
  adTagUrl: 'https://syndication.exdynsrv.com/splash.php?idzone=2916384'
};

player.ima(options);

// Remove controls from the player on iPad to stop native controls from stealing
// our click
var contentPlayer =  document.getElementById('playerOne_html5_api');
if ((navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/Android/i)) &&
    contentPlayer.hasAttribute('controls')) {
  contentPlayer.removeAttribute('controls');
}

// Initialize the ad container when the video player is clicked, but only the
// first time it's clicked.
var initAdDisplayContainer = function() {
  player.ima.initializeAdDisplayContainer();
  wrapperDiv.removeEventListener(startEvent, initAdDisplayContainer);
}

var startEvent = 'click';
if (navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/Android/i)) {
  startEvent = 'touchend';
}

var wrapperDiv = document.getElementById('playerOne');
wrapperDiv.addEventListener(startEvent, initAdDisplayContainer);

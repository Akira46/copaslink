var vid = document.querySelector('video-js');
    var player = videojs(vid, {responsive: true});
    var tbody = document.querySelector('table tbody');

    player.on('playerresize', function() {
      var values = {
        breakpoint: player.currentBreakpoint(),
        className: player.el().className.match(/vjs-layout-([a-z\-]+)/)[0],
        playerWidth: player.currentWidth()
      };

      videojs.log('playerresize', values);

      var tr = document.createElement('tr');

      tr.innerHTML = '<td>' +
        values.className +
        '</td><td>' +
        values.playerWidth +
        '</td>';

      tbody.insertBefore(tr, tbody.firstChild);
    });

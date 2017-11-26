// ==UserScript==
// @name        [RARBG] Direct download links
// @namespace   any
// @description Adds direct download torrent links to search pages on rarbg.to
// @include     https://rarbg.to/torrents.php*
// @include     https://rarbgmirror.xyz/torrents.php*
// @version     0.1 - 2017.11.26 16:40:00
// @grant       none
// ==/UserScript==

function convertTextToLinks() {
  var torrents = document.querySelectorAll('tr.lista2');

  torrents.forEach(function(item, i, torrents) {
    var columns = item.getElementsByTagName('td');
    var fileLink = columns[1].getElementsByTagName('a')[0];
    var torrentURL = fileLink.href.replace('://' + document.domain + '/torrent/', '://' + document.domain + '/download.php?id=') + '&f=' + fileLink.text + '-[rarbg.to].torrent';
    var size = columns[3].textContent;
    var downloadNode = document.createElement('td');
    downloadNode.setAttribute('style', 'text-align: center;');
    downloadNode.innerHTML = '<a href="' + torrentURL + '">' + size + '</a>';
    item.replaceChild(downloadNode, columns[3])
  });
}

convertTextToLinks();

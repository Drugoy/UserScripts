// ==UserScript==
// @name        [RARBG] Direct download links
// @namespace   any
// @description Adds direct download torrent links to search pages on rarbg.to
// @include     https://rarbg.to/torrents.php*
// @include     https://rarbg.to/tv/*
// @include     https://rarbgmirror.xyz/torrents.php*
// @include     https://rarbgmirror.xyz/tv/*
// @version     0.2 - 2017.12.02 17:20:00
// @grant       none
// ==/UserScript==

function linkifySizeColumn() {
  var torrents = document.querySelectorAll('tr.lista2');

  torrents.forEach(function(item, i, torrents) {
    var columns = item.getElementsByTagName('td');
    var fileLink = columns[1].getElementsByTagName('a')[0];
    var torrentURL = fileLink.pathname.replace('/torrent/', '/download.php?id=') + '&f=' + fileLink.text + '-[rarbg.to].torrent';
    var size = columns[3].textContent;
    var downloadNode = document.createElement('td');
    downloadNode.setAttribute('style', 'text-align: center;');
    downloadNode.innerHTML = '<a href="' + torrentURL + '">' + size + '</a>';
    item.replaceChild(downloadNode, columns[3])
  });
}

function addMutationObservers() {
  var watchTargets = document.querySelectorAll('[id^="tvcontent_"]');
  var watchOptions = { childList: true };
  
  watchTargets.forEach(function(watchTarget, i, watchTargets) {
      
    var observer = new MutationObserver(function(mutations) {
      observer.disconnect();
      mutations.forEach(function(mutation) {
        linkifySizeColumn();
      });
      observer.observe(watchTarget, watchOptions);
    });
    observer.observe(watchTarget, watchOptions);
    
  });
}

if (location.pathname == '/torrents.php') // search page
  linkifySizeColumn();

if (location.pathname.startsWith('/tv/'))
  addMutationObservers();




function appendToPopulateTV() {
  var torrents = document.querySelectorAll('a.tvshowClick[onclick^="populate_tv("]');
  
  torrents.forEach(function(item, i, torrents) {
    item.setAttribute('onclick', item.getAttribute('onclick') + ' ' + 'linkifySizeColumn();');
    // alert(item.onclick);
  });
}

function _addEventListener() {
  var torrents = document.querySelectorAll('a.tvshowClick[onclick^="populate_tv("]');
  
  torrents.forEach(function(item, i, torrents) {
    item.addEventListener('click', linkifySizeColumn, true);
    // alert(item.onclick);
  });
}

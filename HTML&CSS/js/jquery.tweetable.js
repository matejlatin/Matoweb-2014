// Copy-pasted boilerplate from dev.twitter.com because I am a bad programmer
(function() {
  if (window.__twitterIntentHandler) return;
  var intentRegex = /twitter\.com(\:\d{2,4})?\/intent\/(\w+)/,
      windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes',
      width = 550,
      height = 420,
      winHeight = screen.height,
      winWidth = screen.width;

  function handleIntent(e) {
    e = e || window.event;
    var target = e.target || e.srcElement,
        m, left, top;

    while (target && target.nodeName.toLowerCase() !== 'a') {
      target = target.parentNode;
    }

    if (target && target.nodeName.toLowerCase() === 'a' && target.href) {
      m = target.href.match(intentRegex);
      if (m) {
        left = Math.round((winWidth / 2) - (width / 2));
        top = 0;

        if (winHeight > height) {
          top = Math.round((winHeight / 2) - (height / 2));
        }

        window.open(target.href, 'intent', windowOptions + ',width=' + width +
                                           ',height=' + height + ',left=' + left + ',top=' + top);
        e.returnValue = false;
        e.preventDefault && e.preventDefault();
      }
    }
  }

  if (document.addEventListener) {
    document.addEventListener('click', handleIntent, false);
  } else if (document.attachEvent) {
    document.attachEvent('onclick', handleIntent);
  }
  window.__twitterIntentHandler = true;
}());

// Here's the real stuff.
(function($) {

    var options = {
        dataAttr: 'data-tweetable',
        linkClass: 'tweetable',
        via: null,
        related: null,
        url: window.location.pathname
    };

    // Tried to think of some sort of "options optional" pun.  Did not succeed.
     $.tweetable = (function () {
        return { options: options };
      })();

    $.fn.tweetable = function(options) {

        // Things I learned on a Thursday night: extend() is basically black magic
        $.extend($.tweetable.options, options);

        var $elements = $(this);

        return $elements.each(function () {

            var $e = $(this);

              // If the particular selector is 'blank', we default to the text within.
             // Otherwise, we grab the value of the selector.
         var tweetText = $e.attr($.tweetable.options.dataAttr);
              if (tweetText == "" || tweetText === undefined)
                var tweetText = $e.text();

            // Let's go ahead and be a stickler about enforcing that 140-char limit.
            if (tweetText.length > 140) {
                console.error("That's, like, more than 140 characters.  Do you even *get* Twitter?")
                return $e;
            }

            // %20 all the things
            tweetText = encodeURIComponent(tweetText);

            // Here we make the actual link.  Goodie.
            var twitterLink = 'https://twitter.com/intent/tweet?';
            twitterLink += "text=" + tweetText + "";
            twitterLink += "&url=" + encodeURIComponent($.tweetable.options.url)
            if($.tweetable.options.via)
                twitterLink += "&via=" + $.tweetable.options.via
            if($.tweetable.options.related)
                twitterLink += "&related=" + $.tweetable.options.related

            var icnTw = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"><path class="tweet" fill-rule="evenodd" clip-rule="evenodd" d="M49.826 9.584l-4.655 4.612c0 0 0-0.418 0 0.769c0 0.843-0.137 1.648-0.335 2.4 c-0.108 6.345-2.148 14.759-10.526 21.4C17.83 51.9 0.2 40.3 0.2 40.332c13.965 0 13.965-4.612 13.965-4.612 c-3.103 0-9.31-6.149-9.31-6.149c1.552 1.5 4.7 0 4.7 0c-7.758-4.612-7.758-9.225-7.758-9.225c1.552 1.5 4.7 0 4.7 0 c-7.758-6.15-3.103-13.837-3.103-13.837C4.829 14.2 25 17.3 25 17.271l0.257-0.127C25.098 16.4 25 14.9 25 14.2 c0-5.519 4.515-9.224 10.086-9.224c3.066 0 5.8 1.4 7.6 3.524l0.906-0.449l4.655-3.075l-3.103 6.15L49.826 9.584z"/></svg>'
            $e.append('<a class="' + $.tweetable.options.linkClass + '" href="' + twitterLink + '">'+ icnTw + '</a>');
            return $e;
        });
    };

}( jQuery ));

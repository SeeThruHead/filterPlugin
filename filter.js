(function ($) {
  // Polyfill String.prototype.contains from ES6
  if (!String.prototype.contains) {
      String.prototype.contains = function() {
          return String.prototype.indexOf.apply(this, arguments) !== -1;
      };
  }
  $.fn.createFilter = function(list, options) {
    // module functions
    var options = {
      caseSensitive: true
    }
    // options.extens
    function bindChange(elems) {
      elems.on('input', function() {
        $this = $(this);
        linkUp($this, $this.val());
      });
    };
    function findMatches(toMatch) {
      return list.filter(function(item) {
        return item.contains(toMatch);
      }, toMatch);
    }
    function createList(matches) {
      var dom = $('<ul class="search-results">').css({position: 'static'});
      for (i=0; i < matches.length; i++)dom.append($('<li>').text(matches[i]));
      return dom;
    };
    function paintList(elems, dom) {
      elems.next('.search-results').remove();
      elems.after(dom);
    };
    function clearList(elems) {
      elems.next('.search-results').remove();
    };
    function linkUp(elems, queryString) {
      if (queryString === '') {
        clearList(elems);
      } else {
        var matches = findMatches(queryString);
        var dom = createList(matches, queryString);
        paintList(elems, dom);
      }
    };
    //module business
    bindChange(this);
    return this;
  };
}(jQuery));
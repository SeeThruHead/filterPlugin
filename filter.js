(function ($) {
  // Polyfill String.prototype.contains from ES6
  if (!String.prototype.contains) {
      String.prototype.contains = function() {
          return String.prototype.indexOf.apply(this, arguments) !== -1;
      };
  }
  // options.defaults
  var defaultOptions = {
    caseSensitive: true,
    wholeWords: false
  },
  options,
  dataList;
  function setOptions(userOptions) {
    return $.extend(defaultOptions, userOptions);
  };

  // module functions
  function bindChange() {
    this.on('input', function() {
      $this = $(this);
      linkUp($this, $this.val());
    });
  };
  function findMatches(toMatch) {
    if (options.wholeWords) {
      return dataList.filter(function(item) {
        if (options.caseSensitive) {
          return new RegExp('\\b' + toMatch + '\\b').test(item);
        } else {
          return new RegExp('\\b' + toMatch.toLowerCase() + '\\b').test(item.toLowerCase());
        }
      });
    }
    return dataList.filter(function(item) {
      if (options.caseSensitive) {
        return item.contains(toMatch);
      }
      else {
        return item.toLowerCase().contains(toMatch.toLowerCase());
      }
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

  $.fn.createFilter = function(list, userOptions) {
    dataList = list;
    options = setOptions(userOptions);
    bindChange.call(this);

    return this;
  };
}(jQuery));
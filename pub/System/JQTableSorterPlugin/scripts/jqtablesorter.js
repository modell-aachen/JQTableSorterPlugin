(function($) {
  if ( !String.prototype.trim ) {
    String.prototype.trim = function() {
      var regex = /^\s*(.*)\s*$/;
      if ( regex.test( this ) ) {
        return this.match( regex )[1];
      }
    }
  }

  $.tablesorter.addParser({
    id: "qwikiDate",
    is: function (s) {
      var date = null;
      try {
        date = dateFormat( s.trim() );
      } catch( e ) {};

      return date;
    },
    format: function (s) {
      var date = new Date( dateFormat( s.trim() ) );
      return $.tablesorter.formatFloat( date.getTime() );
    },
    type: "numeric"
  });

  $.tablesorter.addParser({
    id: "qwikiSize",
    is: function (s) {
      var size = null;
      var match = /\d+(?:[ kmgtpKMGTP]|$)/.exec(s);
      return match;
    },
    format: function (s) {
      var size = null;
      var match = /(?:.* )?(\d+)\s*([kmgtpKMGTP]?)((?:i?[bB])?)/.exec(s);
      if(match) {
          size = match[1];
          var multi;
          if(match[3].toLowerCase() === 'ib'){
              // 1k == 2^10
              multi = {
                  k: 1024,
                  m: 1048576,
                  g: 1073741824,
                  t: 1099511627776,
                  p: 1125899906842624
              };
          } else {
              // 1k == 10^3
              multi = {
                  k: 1000,
                  m: 1000000,
                  g: 1000000000,
                  t: 1000000000000,
                  p: 1000000000000000
              };
          };
          var factor = multi[match[2].toLowerCase()];
          if(factor !== undefined) size *= factor;
      }
      return size;
    },
    type: "numeric"
  });

  $(document).ready( function() {
    var sortableTables = $('table.tablesorter, table.jqsortable');
    $(sortableTables).livequery( function() {
      var table = this;
      var opts = $(table).metadata();

      // Fix: jquery.tablesorter erzeugt Fehler bei leerem <tbody>
      var body = $(table).find('tbody');
      if ( !body.length ) {
          body = $('<tbody></tbody>').appendTo(table);
      }
      if ( $(body).children('tr').length == 0 ) {
        $(body).empty();
        $(body).append('<tr><td style="display: none;"></td></tr>');
      }
      if($(this).hasClass('autonumbered')){
        if(!opts)
          opts = {headers: { 0: { sorter: false }  } };
        else
          opts["headers"] = { 0: { sorter: false }  };
      }
      if ( opts ) {
        $(table).tablesorter( opts );
      }
      else {
        $(table).tablesorter();
      }
    } );
  } );
} )(jQuery);

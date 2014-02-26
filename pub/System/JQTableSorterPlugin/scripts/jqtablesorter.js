(function($) {
  var pattern1 = new RegExp(/^\d{1,2} [A-Za-z]{3,10} \d{4}/); // 13 Jan 2000, 1 Feb 2001
  var pattern2 = new RegExp(/^\d{1,2}\.\s?\d{1,2}\.\s?\d{4}/); // 23.10.1999, 1.12.2003

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
      s = s.trim();
      var m1 = s.match(pattern1);
      var m2 = s.match(pattern2);
      return m1 || m2;
    },
    format: function (s) {
      var s = s.trim();
      var m = null;
      var m1 = s.match(pattern1);
      if ( m1 ) {
        m = m1;
      } else {
        var m2 = s.match(pattern2);
        if ( !m2 ) return -1;
        m = m2;
      }

      return $.tablesorter.formatFloat(new Date(m[0]).getTime());
    },
    type: "numeric"
  });

  $(document).ready( function() {
    var sortableTables = $('table.tablesorter');
    $(sortableTables).livequery( function() {
      var table = this;
      var opts = $(table).metadata();

      // Fix: jquery.tablesorter erzeugt Fehler bei leerem <tbody>
      var body = $(table).find('tbody');
      if ( $(body).html() == '' ) {
        $(body).append('<tr><td style="display: none;"></td></tr>');
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

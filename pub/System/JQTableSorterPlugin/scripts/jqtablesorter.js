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

  $(document).ready( function() {
    var sortableTables = $('table.tablesorter, table.jqsortable');
    $(sortableTables).livequery( function() {
      var table = this;
      var opts = $(table).metadata();

      // Fix: jquery.tablesorter erzeugt Fehler bei leerem <tbody>
      var body = $(table).find('tbody');
      if ( $(body).children('tr').length == 0 ) {
        $(body).empty();
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

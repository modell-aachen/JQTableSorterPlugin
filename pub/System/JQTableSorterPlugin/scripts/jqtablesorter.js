(function($) {
  $.tablesorter.addParser({
    id: "qwikiDate",
    is: function (s) {
      var pattern = /^[0-9]{1,2} [A-Za-z]{3,10} [0-9]{4}$/;
      return s.match(new RegExp(pattern));
    }, format: function (s) {
      return $.tablesorter.formatFloat(new Date(s).getTime());
    }, type: "numeric"
  });

  $(document).ready( function() {
    var sortableTables = $('table.tablesorter');
    $.each( sortableTables, function( index, table ) {
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

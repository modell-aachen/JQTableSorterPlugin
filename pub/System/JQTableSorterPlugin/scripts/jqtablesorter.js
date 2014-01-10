(function($) {
  var regex = new RegExp(/^[0-9]{1,2} [A-Za-z]{3,10} [0-9]{4}/);
  $.tablesorter.addParser({
    id: "qwikiDate",
    is: function (s) {
      return s.trim().match(regex);
    },
    format: function (s) {
      var m = s.trim().match(regex);
      if(!m) return -1;
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

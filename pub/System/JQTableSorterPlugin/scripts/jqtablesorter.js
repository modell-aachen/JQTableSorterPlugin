var pattern = /^[0-9]{1,2} [A-Za-z]{3,10} [0-9]{4}$/;
$.tablesorter.addParser({
  id: "qwikiDate",
  is: function (s) {
    return s.match(new RegExp(pattern));
  }, format: function (s) {
    return $.tablesorter.formatFloat(new Date(s).getTime());
  }, type: "numeric"
});

(function($) {
  $(document).ready( function() {
    var sortableTables = $('table.tablesorter');
    $.each( sortableTables, function( index, table ) {
      var opts = $(table).metadata();
      if ( opts ) {
        $(table).tablesorter( opts );
      }
      else {
        $(table).tablesorter();
      }
    } );
  } );
} )(jQuery);

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
      // always return size -> if a user wants to sort by size he has to manually
      // specify the sorter
      return false;
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
  /*global foswiki swal*/
  $(document).ready( function() {
    // Helper variables for confirmation dialog, to register if dialog was confirmed or canceled
    var submitTriggeredBefore = false;
    var dialogConfirmed = true;
    var testIfTableStructureIsFaulty = function(tablesorter) {
      var table = tablesorter;
      var body = $(table).find('tbody');
      // Sorting does not work , if there are less table headers than table body columns. For each column in the body of the table, there has to be a header.
      var headercolumns = $(table).find('th').length;
          var isTableStructureFaulty = false;

          if(headercolumns > 0) {
            $(body).children('tr').each(function() {
              // If there is a row with more columns than the table header, table structure is faulty 
              if($(this).find('td').length > headercolumns) {
                isTableStructureFaulty = true;
              }
            });
          }
          return isTableStructureFaulty;
    };
    // If in Edit-Mode
    if (foswiki && foswiki.Edit) {
      // If save button is used
      $(document.forms[name = "main"]).submit(function(e) {
        if(submitTriggeredBefore) {
          submitTriggeredBefore = false;
          return dialogConfirmed;
        }
        // Helper variable to check, if initially saving should be interruped because of a faulty table
        var shouldSaveGoOn = true;
        var sortableTables = $('.cke_wysiwyg_frame').contents().find('.tablesorter');
        $(sortableTables).each(function(index) {
          if(testIfTableStructureIsFaulty(this)) {
            shouldSaveGoOn = false;
            $.unblockUI();
            let swalConfig = {
                title: foswiki.jsi18n.get("jqtablesorter", "Are you sure?"),
                text: foswiki.jsi18n.get("jqtablesorter", "It is not possible to activate sorting for tables, that have less headers than sortable columns. To be sortable, a table needs to have as many table headers as columns. If you continue saving, we will deactivate sorting in your table."),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#D83314",
                confirmButtonText: foswiki.jsi18n.get("jqtablesorter", "Confirm"),
                cancelButtonText: foswiki.jsi18n.get("jqtablesorter", "Cancel"),
                closeOnConfirm: true,
                closeOnCancel: true,
                allowEscapeKey: false
            };
            swal(swalConfig, function(isConfirm){
              submitTriggeredBefore = true;
              dialogConfirmed = isConfirm;
              $(document.forms[name = "main"]).submit();
            });
          }
        });
        
        return shouldSaveGoOn;
      });
    }
    // If in View-Mode
    var sortableTables = $('table.tablesorter, table.jqsortable');
    $(sortableTables).livequery( function() {
      var table = this;
      var opts = $(table).metadata();

      // Fix: jquery.tablesorter generates error for empty <tbody>
      var body = $(table).find('tbody');
      if ( !body.length ) {
          body = $('<tbody></tbody>').appendTo(table);
      }
      // If there is a faulty table in a topic, just don't initialize plugin 
      if(testIfTableStructureIsFaulty(this)) {
        return;
      }
      if ( $(body).children('tr').length == 0 ) {
        var cellCount = $(table).find('thead th').length;
        var tr = $('<tr></tr>');
        for (var i = 0; i < cellCount; i++) {
          tr.append('<td style="display: none;"></td>');
        }
        $(body).empty();
        $(body).append(tr);
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

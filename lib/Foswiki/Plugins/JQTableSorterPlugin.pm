package Foswiki::Plugins::JQTableSorterPlugin;

use strict;
use warnings;

use Foswiki::Func ();
use Foswiki::Plugins ();

our $VERSION = "1.0.1";
our $RELEASE = "1.0.1";
our $NO_PREFS_IN_TOPIC = 1;
our $SHORTDESCRIPTION = "Enables sorting functionality for Foswiki tables.";

sub initPlugin {

  my $scripts = <<SCRIPTS;
<script type='text/javascript' src='%PUBURLPATH%/%SYSTEMWEB%/JQTableSorterPlugin/tablesorter/jquery.metadata.js'></script>
<script type='text/javascript' src='%PUBURLPATH%/%SYSTEMWEB%/JQTableSorterPlugin/tablesorter/jquery.tablesorter.min.js'></script>
<script type='text/javascript' src='%PUBURLPATH%/%SYSTEMWEB%/JQTableSorterPlugin/scripts/jqtablesorter.js'></script>
SCRIPTS

  Foswiki::Func::addToZone(
    "script",
    "JQTABLESORTERPLUGIN::Scripts",
    $scripts,
    "JQUERYPLUGIN"
  );

  Foswiki::Func::addToZone(
    "head",
    "JQTABLESORTERPLUGIN",
    "<link rel='stylesheet' type='text/css' media='all' href='%PUBURLPATH%/%SYSTEMWEB%/JQTableSorterPlugin/styles/theme.css' />"
  );

  return 1;
}

1;


__END__
Foswiki - The Free and Open Source Wiki, http://foswiki.org/

Author: Sven Meyer <meyer@modell-aachen.de>

Copyright (C) 2008-2013 Foswiki Contributors. Foswiki Contributors
are listed in the AUTHORS file in the root of this distribution.
NOTE: Please extend that file, not this notice.

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version. For
more details read LICENSE in the root of this distribution.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

As per the GPL, removal of this notice is prohibited.

<?php

// Create own toolbar option for ACF Wysiwyg.
add_filter('acf/fields/wysiwyg/toolbars', 'core_acf_wysiwyg_toolbars');
function core_acf_wysiwyg_toolbars($toolbars)
{
    // Add a new toolbar.

    $toolbars['Bold + Italic + Underline']    = array();
    $toolbars['Bold + Italic + Underline'][1] = array('bold', 'italic', 'underline', 'removeformat');

    $toolbars['Bold + Italic + Underline + Link']    = array();
    $toolbars['Bold + Italic + Underline + Link'][1] = array('bold', 'italic', 'underline', 'link', 'removeformat');

    $toolbars['Align + Bold + Italic + Underline + Link']    = array();
    $toolbars['Align + Bold + Italic + Underline + Link'][1] = array('align', 'bold', 'italic', 'underline', 'link', 'removeformat');

    $toolbars['Align + Bold + Italic + Underline + Link + Lists']    = array();
    $toolbars['Align + Bold + Italic + Underline + Link + Lists'][1] = array('align', 'bold', 'italic', 'underline', 'link', 'bullist', 'numlist', 'removeformat');

    $toolbars['Colour + Bold + Italic + Underline + Link']    = array();
    $toolbars['Colour + Bold + Italic + Underline + Link'][1] = array('forecolor', 'bold', 'italic', 'underline', 'link', 'removeformat');

    $toolbars['Formatselect + Align + Bold + Italic + Underline + Link + Removeformat']    = array();
    $toolbars['Formatselect + Align + Bold + Italic + Underline + Link + Removeformat'][1] = array('forecolor', 'formatselect', 'styleselect', 'align', 'bold', 'italic', 'underline', 'link', 'removeformat');

    $toolbars['Formatselect + Align + Bold + Italic + Underline + Link + Lists + Table + Removeformat']    = array();
    $toolbars['Formatselect + Align + Bold + Italic + Underline + Link + Lists + Table + Removeformat'][1] = array('forecolor', 'formatselect', 'styleselect', 'align', 'bold', 'italic', 'underline', 'link', 'bullist', 'numlist', 'table', 'removeformat');


    $toolbars['All Options']    = array();
    $toolbars['All Options'][1] = array('forecolor', 'formatselect', 'styleselect', 'bold', 'italic', 'underline', 'link', 'bullist', 'numlist', 'removeformat', 'formats', 'table');

    // To remove the 'Basic' toolbar completely: unset( $toolbars['Basic' ] ); .


    return $toolbars;
}

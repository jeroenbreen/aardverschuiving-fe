<?php
require 'simple_html_dom/simple_html_dom.php';

$html = file_get_html('https://nl.wikipedia.org/wiki/Lijst_van_Nederlandse_gemeenten');
$table = $html->find('table.wikitable');
$rows = $table[0]->find('tr');

$index = 0;
$ms = [];

function latlonstring_to_number($string) {
    $chunks = explode('_', $string);
    $main = (int)$chunks[0];
    $sub = (int)$chunks[1];
    return $main + ($sub / 60);
}

function parseCoordinates($url) {
    $urlComponents = parse_url($url);
    $query = $urlComponents['query'];
    parse_str($query, $params);

    $string = $params['amp;params'];

    $lat_string = explode('_N_', $string)[0];
    $lon_string = explode('_N_', explode('_E_', $string)[0])[1];

    $c = new stdClass();
    $c->lat = latlonstring_to_number($lat_string);
    $c->lon = latlonstring_to_number($lon_string);
    return $c;
}

function get_td_content($row, $n, $el_type) {
    $el = $row->find($el_type, $n);
    if ($el) {
        return $el->plaintext;
    } else {
        return '';
    }
}

function perc_to_float($percentageString) {
    $numericString = str_replace([',', '%'], ['.', ''], $percentageString);
    return (float)$numericString;
}

function comma_to_float($comma) {
    $numericString = str_replace([','], ['.'], $comma);
    return (float)$numericString;
}

function get_lat_lon($url) {
    $html = file_get_html($url);
    $el = $html->find('#text_coordinates a', 0);
    if ($el) {
        return parseCoordinates($el->href);
    } else {
        return false;
    }
}

// var_dump($rows);

$start = 327;
$max = 346;
$todo = $max - $start;

foreach ($rows as $row) {
    if ($index > $start && count($ms) < $todo ) {
        $m = new stdClass();
        $title_el = $row->find('th', 0)->find('a', 1);
        if ($title_el) {
            $m->title = $title_el->title;
        } else {
            $m->title = '';
        }
        $m->cbsCode = get_td_content($row, 0, 'td');
        $m->province = $row->find('td', 1)->find('a', 0)->title;
        $m->population = (int)str_replace('.', '', get_td_content($row, 2, 'td'));
        $m->area = comma_to_float(get_td_content($row, 3, 'td'));
        $m->migrants = perc_to_float(get_td_content($row, 5, 'td'));
        $m->migrants_western = perc_to_float(get_td_content($row, 6, 'td'));
        $m->migrants_non_western = perc_to_float(get_td_content($row, 7, 'td'));
        $m->income = comma_to_float(get_td_content($row, 9, 'td')) * 1000;

        $url = 'https://nl.wikipedia.org' . $row->find('th', 0)->find('a', 1)->href;
        $lat_lon = get_lat_lon($url);
        if ($lat_lon) {
            $m->lat = $lat_lon->lat;
            $m->lon = $lat_lon->lon;
        } else {
            $m->lat = 0;
            $m->lon = 0;
        }

        $ms[] = $m;
    }
    $index++;
}

foreach ($ms as $m) {
    echo '"' . $m->title . '",';
    echo '"' . $m->province . '",';
    echo $m->cbsCode . ",";
    echo $m->population . ",";
    echo $m->area . ",";
    echo $m->migrants . ",";
    echo $m->migrants_western . ",";
    echo $m->migrants_non_western . ",";
    echo $m->income . ",";
    echo $m->lat . ",";
    echo $m->lon . "<br>";
}

// var_dump($ms);

?>

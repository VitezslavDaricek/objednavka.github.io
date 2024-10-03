<?php
// URL ke kurzovnímu lístku ČNB
$url = 'https://www.cnb.cz/en/financial_markets/foreign_exchange_market/exchange_rate_fixing/daily.txt';

// Načtení dat z URL
$data = file_get_contents($url);

// Vracení dat jako text
echo $data;
?>
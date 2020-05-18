<?php

require_once './api-allocine-helper.php';

$helper = new AlloHelper;

newMovie($helper);

function newMovie($helper){
    $code = rand(5000, 15000);
    $profile = 'large';

    try
    {
        $movie = $helper->movie( $code, $profile );

        echo 'Je vous propose le film : '.$movie->title.'. ';

        if (!empty($movie->productionYear)){
            echo 'Il a été produit en : '.$movie->productionYear.'. ';
        } else {
            echo "L'année de production n'est pas renseignée. ";
        }

        if (!empty($movie->synopsis)){
            echo 'Son synopsis est le suivant : '.$movie->synopsis.'. ';
        } else {
            echo "Le synopsis n'est pas renseigné. ";
        }

    }
    catch( ErrorException $error )
    {
        if ($error->getCode() == 5) {
            newMovie($helper);
        } else {
            echo "Problème de connexion a l'api AlloCiné";
        }
    }
}

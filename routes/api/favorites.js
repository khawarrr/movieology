
const express = require('express');
const router = express.Router();


const Favorite = require("../../models/Favorite");

const favoritesCtrl = require('../../controllers/api/favorite');

const ensureLoggedIn = require('../../config/ensureLoggedIn');

//=================================
//             Favorite routes
//=================================


router.get("/:movieId/favoriteNumber", favoritesCtrl.favoriteNumber);

router.get("/:movieId/favorited", favoritesCtrl.favorited);

router.post("/addToFavorite", favoritesCtrl.addToFavorite);

router.delete("/:movieId",  favoritesCtrl.removeFromFavorite);

router.get("/", favoritesCtrl.getFavoritedMovie);




module.exports = router;

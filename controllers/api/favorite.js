const express = require("express");
const router = express.Router();

const Favorite = require("../../models/Favorite");

const ensureLoggedIn = require("../../config/ensureLoggedIn");

//=================================
//             Favorite Controllers
//=================================

module.exports = {
  favoriteNumber,
  favorited,
  addToFavorite,
  removeFromFavorite,
  getFavoritedMovie,
};

function favoriteNumber(req, res) {
  Favorite.find({ movieId: req.params.movieId }).exec((err, favorite) => {
    if (err) return res.status(400).send(err);

    res.status(200).json(favorite.length);
  });
}

function favorited(req, res) {
  Favorite.find({ movieId: req.params.movieId, userFrom: req.user._id }).exec(
    (err, favorite) => {
      if (err) return res.status(400).send(err);

      // how can i know that i already favorited this movie or not

      let result = false;
      if (favorite.length !== 0) {
        result = true;
      }

      res.status(200).json(result);
    }
  );
}

function addToFavorite(req, res) {
  const favorite = new Favorite(req.body);

  favorite.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
}

function removeFromFavorite(req, res) {
  Favorite.findOneAndDelete({
    movieId: req.params.movieId,
    userFrom: req.user._id,
  }).exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, doc });
  });
}

function getFavoritedMovie(req, res) {
  //Need to find all of the Users that I am subscribing to From Subscriber Collection
  Favorite.find({ userFrom: req.user._id }).exec((err, favorites) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json(favorites);
  });
}

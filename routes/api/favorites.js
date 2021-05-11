const express = require('express');
const router = express.Router();


const Favorite = require("../../models/Favorite");

const ensureLoggedIn = require('../../config/ensureLoggedIn');

//=================================
//             Favorite
//=================================


router.post("/favoriteNumber", (req, res) => {

    // using movieId to find information inside favorite

    Favorite.find({ "movieId": req.body.movieId })
        .exec((err, favorite) => {
            if (err) return res.status(400).send(err)

            res.status(200).json({ success: true, FavoriteNumber: favorite.length })
        })

});



router.post("/favorited", (req, res) => {

    Favorite.find({ "movieId": req.body.movieId, "userFrom": req.body.userFrom })
        .exec((err, favorite) => {
            if (err) return res.status(400).send(err)

            // how can i know that i already favorited this movie or not

            let result = false;
            if (favorite.length !== 0) {
                result = true
            }

            res.status(200).json({ success: true, favorited: result })
        })

});



router.post("/addToFavorite", (req, res) => {

    console.log(req.body)

    // save the information about the movie or user Id inside favorite collection


    const favorite = new Favorite(req.body);

    favorite.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })

});


router.post("/removeFromFavorite",  (req, res) => {


    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
        .exec((err, doc) => {
            if (err) return res.status(400).json({ success: false, err });
            res.status(200).json({ success: true, doc })
        })
});


// router.post("/getFavoredMovie", (req, res) => {

//     //Need to find all of the Users that I am subscribing to From Subscriber Collection 
//     Favorite.find({ 'userFrom': req.body.userFrom })
//         .exec((err, favorites) => {
//             if (err) return res.status(400).send(err);
//             return res.status(200).json({ success: true, favorites })
//         })
// });



module.exports = router;

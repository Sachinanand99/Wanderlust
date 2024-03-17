const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js");
const router = express.Router();
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

const listingController = require("../controllers/listings.js");
const Listing = require("../models/listing.js");

//Index Route
router.route("/")
.get(wrapAsync(listingController.index))

//create route
.post(
isLoggedIn,
upload.single('listing[image]'),
validateListing,
wrapAsync(listingController.createListing)
);

// search route
router.get("/search", wrapAsync(listingController.searchListing));

// filter route
router.get("/filter/:category", wrapAsync(listingController.filterListing));

//New Route
router.get("/new", 
isLoggedIn, listingController.renderNewForm);

router.route("/:id")
// show route
.get(wrapAsync(listingController.showListing))
//Update Route
.put(
isLoggedIn,
isOwner,
upload.single('listing[image]'),
validateListing,
wrapAsync(listingController.updateListing))
//Delete Route
.delete( 
isLoggedIn,
isOwner,
wrapAsync(listingController.destroyListing));

//Edit Route
router.get("/:id/edit", 
isLoggedIn,
isOwner,
wrapAsync(listingController.editListing));
  


module.exports = router;
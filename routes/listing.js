const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {listingSchema}=require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing=require("../models/listing");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listings.js");
const multer  = require('multer')
const {storage}=require("../cloudConfig.js");
const upload = multer({storage});

//index route
//Create Route
router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,validateListing,upload.single('listing[image][url]'),wrapAsync(listingController.createListing));

//search route  
router.get("/search", wrapAsync(listingController.search));


//New Route
router.get("/new",isLoggedIn,listingController.renderNewForm);



//show route
//Update Route
//Delete Route
router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single('listing[image][url]'),wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));



//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));



module.exports=router;
 const Listing=require("./models/listing");
 const Review=require("./models/review");
 const {listingSchema,reviewSchema}=require("./schema.js");
 const ExpressError=require("./utils/ExpressError.js");
 
 module.exports.isLoggedIn=(req,res,next)=>{
     
    if(!req.isAuthenticated()){
        if(req.method=='GET'){
        req.session.redirectUrl=req.originalUrl;
        }
        else {
        const url = req.originalUrl; // e.g. /listings/123/reviews/456?_method=DELETE
        const listingIdMatch = url.match(/\/listings\/([a-f\d]{24})/); // mongoose ObjectId regex (24 hex chars)
        if (listingIdMatch) {
             req.session.redirectUrl = `/listings/${listingIdMatch[1]}`;
        } else {
             req.session.redirectUrl = "/listings";
        }
      }
        req.flash("error","you must be logged in!");
        return res.redirect("/login");
       
    }
    next();
 }

 module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
        delete req.session.redirectUrl;
    }
    next();
 }
module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
       req.flash("error","you are not owner of this listing");
       return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

module.exports.validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}


module.exports.isReviewAuthor=async(req,res,next)=>{
    let {id,reviewId}=req.params;
    let review=await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)){
       req.flash("error","you are not author of this review");
       return res.redirect(`/listings/${id}`);
    }
    next();
}
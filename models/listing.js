const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js");
const { ref } = require("joi");

const listingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        filename:String,
        url:{
         type:String,
         default:"https://plus.unsplash.com/premium_photo-1732736768058-42f76dc6e6e3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         set:(v)=>v=="" ? "https://plus.unsplash.com/premium_photo-1732736768058-42f76dc6e6e3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          :v,
        }
    },
    price:Number,
    location:String,
    country:String,
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review"
    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    geometry:{
        type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  
    },
    category:{
      type:String,
      enum:["Trending","Rooms","Iconic Cities","Mountains","Amazing pools","Camping","Farms","Arctic","Domes","Boats","Towers"]
    }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
     await Review.deleteMany({_id:{$in:listing.reviews}});
  }
  
});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;
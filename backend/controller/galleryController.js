const Gallery = require('../models/gallery');
const mongoose = require("mongoose");


const createGallery = async(req,res)=>{
const newGallery = new Gallery({
        description:req.body.description ,
        img:req.body.img,
        eventdate:req.body.eventdate,
        category:req.body.category
    });
    newGallery.save((error)=>{
        if(error)
        {
            res.json({status:0,debug_data:error});
        }
        else{
            { id: newGallery._id }
            res.json({
                                    newGallery: {
                                        id: newGallery._id,
                                        description: newGallery.description,
                                        eventdate:newGallery.eventdate
                                        
                                    }
                                });
            // res.json({status:1,data:"newGallery created"}
            //     );
            console.log(res.data);
        }
    })


}


const fetchGallery = async(req,res)=>{
    const category = req.params.category;
    
    console.log(category)
    try {
        if(category==="getall"){
     await   Gallery.find((error,gallery_list)=>{
        if(error){
            res.send("Something went wrong");
        } else{
            res.json({data:gallery_list})
        }
    })
    } else{
      const existGallery = await Gallery.find({ category: req.params.category });
        res.status(200).json(existGallery);
        
    }
    
    
  } catch (error) {
    console.log(error);
  }
    
    


}

const deleteGallery = async (req, res) => {
  const id = req.params.id;
  console.log("delete");
  try {
    await Gallery.findByIdAndRemove(id);
    res.send("User Deleted Successfully");
  } catch (error) {
    console.log(error);
  }
};

const updateGallery = async (req, res) => {
  const id = req.params.id;
  const updateGallery = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  try {
    await Gallery.findByIdAndUpdate(id, updateGallery, {
      new: true,
    });
    res.json(updateGallery);
  } catch (error) {
    console.log(error);
    res.status(400).send("Some thing went wrong in updating career");
  }
};

module.exports = {createGallery,fetchGallery,deleteGallery,updateGallery}
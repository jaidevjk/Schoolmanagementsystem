const TestimonialS = require('../models/testimonials');
const mongoose = require('mongoose');

const createTestimonial = async(req,res)=>{

const newTestimonial = new TestimonialS({
        name: req.body.name,
        designation:req.body.designation,
        description:req.body.description ,
        category:req.body.category,
        img:req.body.img,
        
        
    });
    newTestimonial.save((error)=>{
        if(error)
        {
            res.json({status:0,debug_data:error});
        }
        else{
            { id: newTestimonial._id }
            res.json({
                                    newTestimonial: {
                                        id: newTestimonial._id,
                                        name: newTestimonial.name,
                                        designation: newTestimonial.designation
                                    }
                                });
            // res.json({status:1,data:"newTestimonial created"}
            //     );
            console.log(res.data);
        }
    })


}


const fetchTestimonial = async(req,res)=>{
    const category = req.params.category;
    
    console.log(category)
    try {
        if(category==="getall"){
     await   TestimonialS.find((error,testimonials_list)=>{
        if(error){
            res.send("Something went wrong");
        } else{
            res.json({data:testimonials_list})
        }
    })
    } else{
      const existtestimonial = await TestimonialS.find({ category: req.params.category });
        res.status(200).json(existtestimonial);
        
    }
    
    
  } catch (error) {
    console.log(error);
  }
    
    


}

const deleteTestimonial = async (req, res) => {
  const id = req.params.id;
  console.log("delete");
  try {
    await TestimonialS.findByIdAndRemove(id);
    res.send("User Deleted Successfully");
  } catch (error) {
    console.log(error);
  }
};

const updateTestimonial = async (req, res) => {
  const id = req.params.id;
  const updateTestimonials = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  try {
    await TestimonialS.findByIdAndUpdate(id, updateTestimonials, {
      new: true,
    });
    res.json(updateTestimonials);
  } catch (error) {
    console.log(error);
    res.status(400).send("Some thing went wrong in updating testimonials");
  }
};

module.exports = {createTestimonial,fetchTestimonial,deleteTestimonial,updateTestimonial}
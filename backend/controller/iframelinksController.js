const Iframelinks = require('../models/iframelinks');
const mongoose = require("mongoose");

const createIframelinks = async(req,res)=>{

const newIframelinks = new Iframelinks({
        link:req.body.link,
        category:req.body.category,
    });
    newIframelinks.save((error)=>{
        if(error)
        {
            res.json({status:0,debug_data:error});
        }
        else{
            { id: newIframelinks._id }
            res.json({
                                    newIframelinks: {
                                        id: newIframelinks._id,
                                        
                                    }
                                });
            // res.json({status:1,data:"newIframelinks created"}
            //     );
            console.log(res.data);
        }
    })


}


const fetchIframelinks = async(req,res)=>{
     const category = req.params.category;
    
    console.log(category)
    try {
        if(category==="getall"){
     await   Iframelinks.find((error,Iframelinks_list)=>{
        if(error){
            res.send("Something went wrong");
        } else{
            res.json({data:Iframelinks_list})
        }
    })
    } else{
      const existIframelinks = await Iframelinks.find({ category: req.params.category });
      const arr = [];
      if(existIframelinks.length>5){
       
       
         for (var i = existIframelinks.length; i>5; i--) {
                const removed_ids = existIframelinks.reverse().pop();
                //console.log(removed_ids)
                //const removed_ids = existIframelinks.reverse()[i]._id;
                //console.log("removed_ids",removed_ids)
                arr.push(removed_ids);

             }

             console.log("arr1",arr)
             await Iframelinks.deleteMany({_id:{$in:arr}});
              res.status(200).json(existIframelinks);
             //console.log(existIframelinks.length) 
      }
        
    else{ 
        //console.log(existIframelinks.length)
         res.status(200).json(existIframelinks); 
        }  

    }
    
    
  } catch (error) {
    console.log(error);
  }
    
    

}

const deleteIframelinks = async (req, res) => {
  const id = req.params.id;
  console.log("delete");
  try {
    await Iframelinks.findByIdAndRemove(id);
    res.send("User Deleted Successfully");
  } catch (error) {
    console.log(error);
  }
};


const deleteExtraIframelinks = async (req, res) => {
  

  ids = req.body;
  console.log(ids)
  try {
    await Iframelinks.deleteMany({_id:{$in:ids}})
    console.log("User Deleted Successfully")
    res.send("User Deleted Successfully");
  } catch (error) {
    console.log(error);
  }
};

const updateIframelinks = async (req, res) => {
  const id = req.params.id;
  const updateIframelinks = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  try {
    await Iframelinks.findByIdAndUpdate(id, updateIframelinks, {
      new: true,
    });
    res.json(updateIframelinks);
  } catch (error) {
    console.log(error);
    res.status(400).send("Some thing went wrong in updating Links");
  }
};

module.exports = {createIframelinks,fetchIframelinks,deleteIframelinks,deleteExtraIframelinks,updateIframelinks}
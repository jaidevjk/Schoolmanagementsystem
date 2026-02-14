const NewsAndEvents = require('../models/newsandevents');

const createEvent = async(req,res)=>{
const newEvent = new NewsAndEvents({
        description:req.body.description ,
        img:req.body.img,
        eventdate:req.body.eventdate
        
    });
    newEvent.save((error)=>{
        if(error)
        {
            res.json({status:0,debug_data:error});
        }
        else{
            { id: newEvent._id }
            res.json({
                                    newEvent: {
                                        id: newEvent._id,
                                        description: newEvent.description,
                                        eventdate:newEvent.eventdate
                                        
                                    }
                                });
            // res.json({status:1,data:"newEvent created"}
            //     );
            console.log(res.data);
        }
    })


}


const fetchEvent = async(req,res)=>{
    NewsAndEvents.find((error,newsandevents_list)=>{
    	if(error){
    		res.send("Something went wrong")
    	} else{
    		res.json({data:newsandevents_list})
    	}
    })


}

const deleteEvent = async (req, res) => {
  const id = req.params.id;
  console.log("delete");
  try {
    await NewsAndEvents.findByIdAndRemove(id);
    res.send("User Deleted Successfully");
  } catch (error) {
    console.log(error);
  }
};



module.exports = {createEvent,fetchEvent,deleteEvent}
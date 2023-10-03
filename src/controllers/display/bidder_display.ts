
import { Request, Response } from 'express';
import { obj_models } from '../../models/objects_models';
import { timeline_models } from '../../models/timeline_models';
import { stat } from 'fs';

// owner route
async function bidder_display (req: Request, res: Response){

    console.log("bidder_display")
    try {
        const bidder = req.params.bidder;
    
        // Use the bidderId to find objects owned by that user
        const times: any = await timeline_models.find({ bidder: bidder });
        console.log(times);
        const times_list = await times.map(async(obj: any) =>{
            const objects: any = await obj_models.find({ obj_id: obj._id });
            console.log(objects);
            const [obj_name, obj_pic, end_time, owner, description, status, initial_bid] = [objects[0]["obj_name"], objects[0]["obj_pic"],objects[0]["end_time"],objects[0]["owner"],objects[0]["description"],objects[0]["status"],objects[0]["initial_bid"],objects[0]["initial_bid"],objects[0]];
            return {...obj._doc, obj_name: obj_name, obj_pic: obj_pic, end_time: end_time, owner: owner, description:description, status: status,initial_bid: initial_bid}; 
        });
        
        const obj_result = await Promise.all(times_list);

        // Check if any objects were found
        if (obj_result.length === 0) {
          return res.status(404).json({ message: 'No objects found for this bidder.' });
        }
    
        // Return the found objects in the response
        res.status(200).json(obj_result);
      }

      catch (error) {
        console.error('Error retrieving bidders list', error);
        res.status(500).json({ message: error });
      }
}

export {bidder_display};



import { Request, Response } from 'express';
import { obj_models } from '../../models/objects_models';
import { timeline_models } from '../../models/timeline_models';

// owner route
async function owner_display (req: Request, res: Response){

    console.log("owner_display")
    try {
        const owner = req.params.owner;
    
        // Use the ownerId to find objects owned by that user
        const objects: any = await obj_models.find({ owner: owner });

        const obj_list = await objects.map(async(obj: any) =>{
            const timeline: any = await timeline_models.find({ obj_id: obj._id });
            const [bid_amount, bidder] = [timeline[0]["bid_amount"], timeline[0]["bidder"]];
            return {...obj._doc, bidder: bidder, bid_amount: bid_amount};
        });
        
        const obj_result = await Promise.all(obj_list);

        // Check if any objects were found
        if (obj_result.length === 0) {
          return res.status(404).json({ message: 'No objects found for this owner.' });
        }
    
        // Return the found objects in the response
        res.status(200).json(obj_result);
      }

      catch (error) {
        console.error('Error retrieving owners list', error);
        res.status(500).json({ message: "owner not found" });
      }
}

export {owner_display};


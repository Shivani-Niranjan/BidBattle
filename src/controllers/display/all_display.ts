
import { Request, Response } from 'express';
import { obj_models } from '../../models/objects_models';

// all display route
async function all_display (req: Request, res: Response){

    console.log("all_display")
    try {
        const all = req.params.all;
        console.log(all);
    
        const all_objects = await obj_models.find();
        console.log(all_objects);

        
        
        // Check if any objects were found
        if (all_objects.length === 0) {
          return res.status(404).json({ message: 'No all_objects found for this all.' });
        }
    
        // Return the found all_objects in the response
        res.status(200).json(all_objects);
      }

      catch (error) {
        console.error('Error retrieving all objects', error);
        res.status(500).json({ message: error });
      }
}

export {all_display};


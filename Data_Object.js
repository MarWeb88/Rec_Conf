/**
 * Created by Martin on 28.02.2015.
 */

function Data_Object(min_height,max_height,min_width,max_width,min_depth,max_depth,num_vrt,num_hz,ID,description){

    this.min_height = min_height;
    this.max_height = max_height;

    this.min_width = min_width;
    this.max_width = max_width;

    this.min_depth = min_depth;
    this.max_depth = max_depth;

    this.visualization = new Data_Object_Structure(num_vrt,num_hz);
    this.ID = ID;

    this.description = description;

    this.check_object = function(height,width,depth){

        //checks if option is possible
       if(height >= this.min_height && height <= this.max_height
         && width >= this.min_width && width <= this.max_width
         && depth >=this.min_depth && depth <= this.max_depth){

            return true;
        }else{
            return false;
        }

    }

}

/**
 * Created by Martin on 14.03.2015.
 */

function Functional_Constraint(ID,height,height_max_tolerance,d_options,level){

    this.ID = ID;
    this.height = height;
    this.height_max_tolerance = height_max_tolerance;
    this.d_options = d_options;
    this.level = level;

    this.get_height = function(){
        return this.height;
    }

    this.get_height_max_tolerance = function(){
        return this.height_max_tolerance;
    }
}
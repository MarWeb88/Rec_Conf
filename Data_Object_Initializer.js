/**
 * Created by Martin on 01.03.2015.
 */

function Data_Object_Initializer(){

    this.initialize = function(number_of_objects){

        var data_list = new Array(number_of_objects);

        //initialize Dataobjects
        data_list[0]= new Data_Object(min_height,max_height,min_width,100,min_depth,max_depth,1,1,0,"1 part");
        data_list[1]= new Data_Object(min_height,max_height,60,200,min_depth,max_depth,1,2,1,"2 horizontal parts");
        data_list[2]= new Data_Object(min_height,max_height,75,max_width,min_depth,max_depth,1,3,2,"3 horizontal parts");
        data_list[3]= new Data_Object(min_height,max_height,90,max_width,min_depth,max_depth,1,4,3,"4 horizontal parts");
        data_list[4]= new Data_Object(min_height,max_height,110,max_width,min_depth,max_depth,1,5,4,"5 horizontal parts");
        data_list[5]= new Data_Object(min_height,max_height,min_width,100,min_depth,max_depth,2,1,5,"2 vertical parts");
        data_list[6]= new Data_Object(min_height,max_height,min_width,100,min_depth,max_depth,3,1,6,"3 vertical parts");
        data_list[7]= new Data_Object(min_height,max_height,min_width,100,min_depth,max_depth,4,1,7,"4 vertical parts");

        return data_list;
    }
}
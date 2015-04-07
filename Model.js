/**
 * Created by Martin on 28.02.2015.
 */

function Model(row_num,ID,weightings){

    this.row_num = row_num;
    this.row_height = expl_db.height;
    this.free_row_height = new Array(row_num);
    this.rows = new Array(row_num);
    this.row_state = new Array(row_num);
    this.weightings = weightings;
    this.ID = ID;

    for(var i=0; i<row_num; i++){
        //alert(i+" "+this.free_row_height);
        this.free_row_height[i] = this.row_height;
        //alert(i+" "+this.free_row_height);
    }

    for(var i=0; i<row_num; i++){
        this.rows[i] = new Array();
    }

    for(var i=0; i<row_num; i++){
        this.row_state[i]=false;
    }

    this.check_state = function(){
        for(var i=0; i<row_num; i++){
            if(this.row_state[i] == false){
                return false;
            }
        }
        return true;
    }

    this.get_all = function(model){
        this.free_row_height = model.free_row_height;
        this.rows = model.rows;
        this.row_state = model.row_state;
        this.weightings = model.weightings;
    }

    this.check_weighting = function(selected_function){
        for(var i=0; i<this.weightings.length; i++){
            if(this.weightings[i] != impl_db.weights[i] && i != selected_function){
                return false;
            }
        }
        return true;
    }

    this.check_row_num = function(){
        /*if(this.row_num == impl_db.rows){
            return true
        }else{
            return false
        }*/
        return this.row_num == impl_db.rows;
    }

    this.check_weighting_distance = function(max_distance){
        for(var i=0; i<this.weightings.length; i++){
            if(this.weightings[i] > impl_db.weights[i]+max_distance
                || this.weightings[i] < impl_db.weights[i]-max_distance){
                return false;
            }
        }
        return true;
    }

}
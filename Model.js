/**
 * Created by Martin on 28.02.2015.
 */

function Model(row_num){

    this.row_num = row_num;
    this.row_height = expl_db.height;
    this.free_row_height = new Array(row_num);
    this.rows = new Array(row_num);
    this.row_state = new Array(row_num);

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
    }

}
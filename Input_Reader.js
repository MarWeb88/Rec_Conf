/**
 * Created by Martin on 28.02.2015.
 */

function Input_Reader(){

    //check validity of height
    function check_height(val){

        if(val >= min_height && val <= max_height && isNaN(val)==false){
            return true;
        }else{
            return false;
        }
    }

    //check validity of width
    function check_width(val){
        if(val >= min_width && val <= max_width && isNaN(val)==false){
            return true;
        }else{
            return false;
        }
    }

    //check validity of depth
    function check_depth(val){
        if(val >= min_depth && val <= max_depth && isNaN(val)==false){
            return true;
        }else{
            return false;
        }
    }

    this.readInput = function(){

        //read dimensions
        var height = document.getElementById("height_input").value;
        var width = document.getElementById("width_input").value;
        var depth = document.getElementById("depth_input").value;

        //check validity of the dimensions
        if(check_height(height)==false){
            alert("Height is not a valid value. Must be a number between "+min_height+" and "+max_height);
            return false;
        }
        if(check_width(width)==false){
            alert("Width is not a valid value. Must be a number between "+min_width+" and "+max_width);
            return false;
        }
        if(check_depth(depth)==false){
            alert("Depth is not a valid value. Must be a number between "+min_depth+" and "+max_depth);
            return false;
        }

        //read input functions

        var functions = new Array(9);

        for(var i=0; i<functions.length; i++){
            var val = document.getElementById("function"+i);

            if(val.checked == true){
                functions[i]= true;
            }else{
                functions[i]=false;
            }
        }

        var obj = new Input_File(height,width,depth,functions);

        return obj;
    }

    this.translate_purp_func = function(){

        var purpose_el = document.getElementById("purpose_selection");

        get_func_from_purp(purpose_el.value);

    }

    function get_func_from_purp(name){

        switch(name){
            case "Wardrobe": fill_options([2,4,8]); return;

            case "Book shelf": fill_options([1]); return;

            case "Kitchen cupboard": fill_options([5,6]); return;

            case "File cabinet": fill_options([1]); return;

            case "Broom cabinet": fill_options([6]); return;

            case "China cabinet": fill_options([5]); return;

            case "Tool cabinet": fill_options([6]); return;

            case "Bedroom closet": fill_options([2,4,8]); return;

            case "Bathroom cabinet": fill_options([6]); return;

            case "Apotecary cabinet": fill_options([6]); return;

            case "Dresser": fill_options([6]); return;

            case "Shoe cabinet": fill_options([6]); return;

            case "Display cabinet": fill_options([6]); return;

            case "Office cabinet": fill_options([6]); return;

            case "Bedside cabinet": fill_options([6]); return
        }
        alert("Value could not be found!");
    }

    function fill_options(values){


        for(var i=0; i<expl_db.num_functions; i++){
            if(is_in_Array(i,values)){
                document.getElementById("function"+i).checked=true;
            }else{
                document.getElementById("function"+i).checked=false;
            }
        }
    }

    function is_in_Array(val,array){
        for(var i=0; i<array.length; i++){
            if(val == array[i]){
                return true
            }
        }
        return false
    }
}
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

    this.set_Input_Fields = function(){
        document.getElementById("height_input").value = expl_db.height;
        document.getElementById("width_input").value = expl_db.width;
        document.getElementById("depth_input").value = expl_db.depth;

        for(var i=0; i<expl_db.purp_functions.length; i++){
            if(expl_db.purp_functions[i]==true){
                document.getElementById("function"+i).checked = true;
            }else{
                document.getElementById("function"+i).checked = false;
            }
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
        /*
        var functions = new Array(expl_db.num_functions);

        for(var i=0; i<functions.length; i++){
            var val = document.getElementById("function"+i);

            if(val.checked == true){
                functions[i]= true;
            }else{
                functions[i]=false;
            }
        }
        var obj = new Input_File(height,width,depth,functions);
         */
        var obj = new Input_File(height,width,depth);
        return obj;
    }

    this.translate_purp_func = function(){
        /*var purpose_el = document.getElementById("purpose_selection");
         */
        get_func_from_purp();


        //impl_db.reset();
    }

    this.vis_input = function(val){

        document.getElementById("height_input").disabled=val;
        document.getElementById("width_input").disabled=val;
        document.getElementById("depth_input").disabled=val;

        if(val == true){
            document.getElementById("reset_button").className="reset_button_vis";
            mySlider_h.disable();
            mySlider_w.disable();
            mySlider_d.disable();
            document.getElementById("grasp_select").className = "grasp_select";
            document.getElementById("material_select").className = "material_select";
            document.getElementById("d_options_select").className = "d_options_select";
        }
        if(val == false){
            document.getElementById("reset_button").className="reset_button_invis";
            mySlider_h.enable();
            mySlider_w.enable();
            mySlider_d.enable();
            document.getElementById("grasp_select").className = "grasp_select invis";
            document.getElementById("material_select").className = "material_select invis";
            document.getElementById("d_options_select").className = "d_options_select invis";
        }
    }

    function add_func_value(func_values,values){
        for(var i=0; i<values.length; i++){

            if(!is_in_Array(values[i],func_values)){
                func_values[func_values.length]=values[i];
            }
        }
    }

    function get_values(val){
        switch (val){
            //Wardrobe
            case 0: return [0,2,3]
            //CD/DVD
            case 1: return [1]
            //Books
            case 2: return [2]
            //Shoes
            case 3: return [6]
            //Tool cabinet
            case 4: return [4,5]
            //China cabinet
            case 5: return [3]
            //Kitchen cupboard
            case 6: return [3,4]
        }
    }

    function get_func_from_purp(){

        var func_list = new Array(expl_db.num_functions);
        var func_values = new Array();

        for(var i=0; i<func_list.length; i++){
            var el = document.getElementById("function"+i);
            if(el.checked){
                func_list[i]= true;
                expl_db.purp_functions[i]=true;
                add_func_value(func_values,get_values(i))
            }else{
                func_list[i]= false;
                expl_db.purp_functions[i]=false;
            }
        }

        if(compatibility_check_model(func_list)){
            fill_options(func_values);
            impl_db.reset();
        }else{
            alert("Can not find valid combination");
        }

        /* switch(name){
           case "Wardrobe 1": fill_options([5,7,10]); display_functions("option_functions_invis");
                change_d_option_cons([true,true,true,true,true,true]); return

            case "Wardrobe 2": fill_options([5,8,10]); display_functions("option_functions_invis");
                change_d_option_cons([true,true,true,true,true,true]); return

            case "Wardrobe 3": fill_options([6,7,10]); display_functions("option_functions_invis");
                change_d_option_cons([true,true,true,true,true,true]); return

            case "Wardrobe 4": fill_options([6,8,10]); display_functions("option_functions_invis");
                change_d_option_cons([true,true,true,true,true,true]); return

            case "CD/Book shelf 1": fill_options([0,2]); display_functions("option_functions_invis");
                change_d_option_cons([true,false,false,false,false,false]); return

            case "CD/Book shelf 2": fill_options([0,3]); display_functions("option_functions_invis");
                change_d_option_cons([true,false,false,false,false,false]); return

            case "CD/Book shelf 3": fill_options([1,2]); display_functions("option_functions_invis");
                change_d_option_cons([true,false,false,false,false,false]); return

            case "CD/Book shelf 4": fill_options([1,3]); display_functions("option_functions_invis");
                change_d_option_cons([true,false,false,false,false,false]); return

            case "CD/Book shelf 5": fill_options([0,2,3]); display_functions("option_functions_invis");
                change_d_option_cons([true,false,false,false,false,false]); return

            case "CD/Book shelf 6": fill_options([1,2,3]); display_functions("option_functions_invis");
                change_d_option_cons([true,false,false,false,false,false]); return

            case "Kitchen cupboard 1": fill_options([7,10]); display_functions("option_functions_invis");
                change_d_option_cons([false,false,true,true,true,true]); return

            case "Kitchen cupboard 2": fill_options([8,9]); display_functions("option_functions_invis");
                change_d_option_cons([false,false,true,true,true,true]); return

            case "Kitchen cupboard 3": fill_options([7,9,10]); display_functions("option_functions_invis");
                change_d_option_cons([false,false,true,true,true,true]); return

            case "Kitchen cupboard 4": fill_options([9,11,16]); display_functions("option_functions_invis");
                change_d_option_cons([false,false,true,true,true,true]); return

            case "Kitchen cupboard 5": fill_options([10,13]); display_functions("option_functions_invis");
                change_d_option_cons([false,false,true,true,true,true]); return

            case "Kitchen cupboard 6": fill_options([10,12]); display_functions("option_functions_invis");
                change_d_option_cons([false,false,true,true,true,true]); return

            case "China cabinet 1": fill_options([10]); display_functions("option_functions_invis");
                change_d_option_cons([true,true,true,true,true,true]); return

            case "China cabinet 2": fill_options([7,10]); display_functions("option_functions_invis");
                change_d_option_cons([true,true,true,true,true,true]); return

            case "China cabinet 3": fill_options([8,10]); display_functions("option_functions_invis");
                change_d_option_cons([true,true,true,true,true,true]); return

            case "Shoe cabinet 1": fill_options([16]); display_functions("option_functions_invis");
                change_d_option_cons([true,true,true,true,true,true]); return

            case "Shoe cabinet 2": fill_options([10,16]); display_functions("option_functions_invis");
                change_d_option_cons([true,true,true,true,true,true]); return

            case "Dresser 1": fill_options([7,10]); display_functions("option_functions_invis");
                change_d_option_cons([false,false,true,false,false,false]); return

            case "Dresser 2": fill_options([8,10]); display_functions("option_functions_invis");
                change_d_option_cons([false,false,true,false,false,false]); return

            case "Broom cabinet 1": fill_options([10,13]); display_functions("option_functions_invis");
                change_d_option_cons([false,false,false,true,true,true]); return

            case "Broom cabinet 2": fill_options([11,13]); display_functions("option_functions_invis");
                change_d_option_cons([false,false,false,true,true,true]); return

            */

            /*case "File cabinet": fill_options([1]); display_functions("option_functions_invis");
                change_d_option_cons([true,true,true,true,true,true]); return

                change_d_option_cons([true,true,true,true,true,true]); return

            case "Tool cabinet": fill_options([6,9,10]); display_functions("option_functions_invis");
                change_d_option_cons([true,true,true,true,true,true]); return

            case "Bedroom closet": fill_options([2,4,8]); display_functions("option_functions_invis");
                change_d_option_cons([true,true,true,true,true,true]); return

            case "Bathroom cabinet": fill_options([6,9]); display_functions("option_functions_invis");
                change_d_option_cons([true,true,true,true,true,true]); return

            case "Office cabinet": fill_options([6]); display_functions("option_functions_invis");
                change_d_option_cons([true,true,true,true,true,true]); return

            case "Bedside cabinet": fill_options([6]); display_functions("option_functions_invis");
                change_d_option_cons([true,true,true,true,true,true]); return

            case "Apothecary cabinet": fill_options([6,9]); display_functions("option_functions_invis");
             change_d_option_cons([true,true,true,true,true,true]); return

            case "Flexible Selection": fill_options([]); display_functions("option_functions_vis");
                change_d_option_cons([true,true,true,true,true,true]); return
        }
        alert("Value could not be found!");*/
    }

    function compatibility_check_model(func_list){

        for(var i=0; i<expl_db.comp_list.length; i++){
           if(is_in_comp_list(func_list,expl_db.comp_list[i])){
               return true;
           }
        }
        return false;
    }

    function is_in_comp_list(func_list,comp_list_el){

        for(var i=0; i< func_list.length; i++){
            if(func_list[i]==true && comp_list_el[i]==false){
                return false;
            }
        }
        return true;
    }


    function fill_options(values){

        for(var i=0; i<expl_db.num_functions; i++){
            /*if(is_in_Array(i,values)){
                document.getElementById("function"+i).checked=true;
            }else{
                document.getElementById("function"+i).checked=false;
            }*/
            if(is_in_Array(i,values)){
                expl_db.functions[i]= true;
            }else{
                expl_db.functions[i]= false;
            }
        }
    }

    function change_d_option_cons(values){
        expl_db.d_option_cons = values;
    }

    function is_in_Array(val,array){
        for(var i=0; i<array.length; i++){
            if(val == array[i]){
                return true
            }
        }
        return false
    }

    function display_functions(name){
        /*var function_Element = document.getElementById("option_functions");
        function_Element.className =name;*/
    }
}
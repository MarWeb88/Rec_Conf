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

    this.reset_input_fields = function(){
        for(var i=0; i<expl_db.purp_functions.length; i++){
            document.getElementById("function"+i).disabled = false;
            document.getElementById("function"+i).checked = false;

            document.getElementById("height_input").value = "150";
            document.getElementById("width_input").value = "100";
            document.getElementById("depth_input").value = "50";
        }
    }

    this.change_2d_3d_vis = function(){
        var model_3d = document.getElementById("WebGLCanvas");
        var model_2d = document.getElementById("2d_canvas");
        var button = document.getElementById("change_button");

        if(model_2d.style.display == "none"){
            model_3d.style.display = "none";
            model_2d.style.display = "inline";
            button.value ="Show 3D Model";
        }else{
            model_3d.style.display = "inline";
            model_2d.style.display = "none";
            button.value ="Show 2D Model";
        }
    }

    this.set_progress_bar = function(val){

        var prog_bar = document.getElementById("progress_bar");
        prog_bar.style.width = val+"%";
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
            //document.getElementById("reset_button").className="reset_button_vis";
            mySlider_h.disable();
            mySlider_w.disable();
            mySlider_d.disable();
            document.getElementById("grasp_select").className = "grasp_select";
            document.getElementById("material_select").className = "material_select "+
            output_writer.get_Material_FullName(impl_db.material);
            document.getElementById("d_options_select").className = "d_options_select";
            document.getElementById("change_button").className = "change_button";
        }
        if(val == false){
            //document.getElementById("reset_button").className="reset_button_invis";
            mySlider_h.enable();
            mySlider_w.enable();
            mySlider_d.enable();
            document.getElementById("grasp_select").className = "grasp_select invis";
            document.getElementById("material_select").className = "material_select invis";
            document.getElementById("d_options_select").className = "d_options_select invis";
            document.getElementById("change_button").className = "change_button invis";
        }
    }

    this.vis_purpose = function(val){
        if(val == true){
            document.getElementById("start_button").className="start_button";
            document.getElementById("open_button_purpose").className="start_button invis";
            change_vis_purposes(false);
            //output_writer.clear_output();
            impl_db.reset();
        }
        if(val == false){
            document.getElementById("start_button").className="start_button invis";
            document.getElementById("open_button_purpose").className="start_button";
            change_vis_purposes(true);
        }
    }

    this.vis_save_button = function(val){
        if(val == true){
            document.getElementById("save_button").className ="save_button";
        }else{
            document.getElementById("save_button").className ="save_button invis";
        }
    }

    this.change_material_select = function(){
        document.getElementById("material_select").className = "material_select "+
        output_writer.get_Material_FullName(impl_db.material);
    }

    function change_vis_purposes(val){

        for(var i=0; i<expl_db.purp_functions.length; i++){
            document.getElementById("function"+i).disabled=val;
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
            case 1: return [1,2]
            //Books
            case 2: return [2,3]
            //Shoes
            case 3: return [2,6]
            //Tool cabinet
            case 4: return [4,5]
            //China cabinet
            case 5: return [2]
            //Kitchen cupboard
            case 6: return [2,4]
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

            expl_db.filled_purp_func_match = fill_function_option_list();

            start(0);
        }else{
            alert("Can not find valid combination");
        }
    }

    function fill_function_option_list(){

        var ret_ar = new Array(expl_db.num_purp_func_match_functions);

        for(var i=0; i<ret_ar.length; i++){
            ret_ar[i] = [];
        }

        for(var i= 0; i<expl_db.purp_functions.length; i++){

            if(expl_db.purp_functions[i]==true){
                ret_ar = sum_arrays(ret_ar,expl_db.purp_func_match[i]);
            }
        }
        /*var out = "";
        for(var i=0; i<ret_ar.length;i++){
            out += "[";
            for(var j=0; j<ret_ar[i].length; j++){
                out+=ret_ar[i][j]+",";
            }
            out += "]";
        }
        alert("Ausgabe: "+out);*/
        return ret_ar;
    }

    function sum_arrays(ar_core,ar_new){
        //alert("core: "+ ar_core+ "   new: "+ar_new);
        var ar_copy = clone(ar_core);

        for(var i=0; i<ar_copy.length; i++){

            for(var j=0; j<ar_new[i].length; j++){
                if(!is_in_Array(ar_new[i][j],ar_copy[i])){
                    ar_copy[i][ar_copy[i].length]= clone(ar_new[i][j]);
                }

            }
        }
        return ar_copy;
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
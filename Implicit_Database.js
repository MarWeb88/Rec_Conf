/**
 * Created by Martin on 15.03.2015.
 */

function Implicit_Database(){
    //stores information that are collected during the interaction
    //current weighting of the chosen model
    //probabilities of the element options for each function

    this.weights = null;
    this.rows = null;
    this.grasp = expl_db.start_handle;
    this.selected_function = undefined;
    this.grasp_selector = false;
    this.material_selector = false;
    this.d_options_selector = null;
    this.d_options = null;
    this.material = expl_db.start_material;
    this.start_row = null;
    this.h_version = null;

    //save d_options for each functions

    this.set_information = function(weights,probabilities,rows,grasp,d_options,material,start_row,h_version){
        this.weights = weights;
        this.rows = rows;
        this.grasp = grasp;
        this.d_options = d_options;
        this.material = material;
        this.start_row = start_row;
        this.h_version = h_version;
    }

    this.reset = function(){

        this.set_information(null,null,null,expl_db.start_handle,null,expl_db.start_material,null,null);

        this.selected_function = undefined;
        //this.material_selector=null;
        //this.grasp_selector = null;

        document.getElementById("implicid_data_out").innerHTML="";
        curr_model_ID = null;

        input_reader.vis_save_button(false);
        input_reader.vis_input(true);

        document.getElementById("grasp_select").options[0].selected = true;
        document.getElementById("material_select").options[0].selected = true;
        input_reader.change_material_select();

        output_writer.delete_info_icon();
        output_writer.delete_interaction_functions();
        output_writer.clear_output();

        obj_visualizer.clear_model_views();


        //start(0);
    }

    this.set_grasp = function(){

        this.grasp = document.getElementById("grasp_select").value;
        log_manager.add_action_Event("set grasp");
        adapt_handles();

        if(curr_model_ID != null){
            obj_visualizer.call_vis(curr_model_ID,0);
        }
    }

    function adapt_handles(){
        var el = document.getElementById("handle_picture");
        el.src = "images/handles/"+impl_db.grasp+".jpg";
    }

    this.set_material = function(){
        this.material = "images/"+document.getElementById("material_select").value+".jpg";
        log_manager.add_action_Event("set material");
        if(curr_model_ID != null){
            obj_visualizer.call_vis(curr_model_ID,0);
        }
    }

    this.delete_rows = function(){
        this.rows = null;
        this.delete_interaction();
        this.show_information();
        impl_db.d_options_selector = null;
        document.getElementById("information_box_icon_frame").style.display ="none";
        input_reader.set_progress_bar(20);
        log_manager.add_action_Event("delete_rows");
        start();
    }

    this.delete_start_row = function(){
        this.start_row = null;
        this.h_version = null;
        this.delete_interaction();
        this.show_information();
        impl_db.d_options_selector = null;
        document.getElementById("information_box_icon_frame").style.display ="none";
        input_reader.set_progress_bar(65);
        log_manager.add_action_Event("delete_build_variant");
        start();
    }

    /*this.delete_d_options_selector = function(){
        this.d_options_selector = null;
        this.delete_interaction();
        this.show_information();
        start();
    }*/

    this.set_slider_values = function() {

        var el = document.getElementById("example");

        for(var i=0; i<el.options.length; i++){
            el.options[i].selected = expl_db.d_option_cons[i];
        }

        $("#example").multiselect("refresh");

        el = document.getElementById("grasp_select");

        for(var i=0; i<el.options.length; i++){
            if(el.options[i].value == impl_db.grasp){
                el.options[i].selected = true;
            }else{
                el.options[i].selected = false;
            }
        }
        el = document.getElementById("material_select");

        for(var i=0; i<el.options.length; i++){

            if(el.options[i].value == output_writer.get_Material_FullName(impl_db.material)){
                el.options[i].selected = true;
            }else{
                el.options[i].selected = false;
            }
        }
    }

    function get_latest_fill(list){

        var last_point = 0;

        for(var i=1; i<list.length; i++){
            if(list[i]!=null){
                last_point = i;
            }
        }
        return last_point;
    }

    this.get_last_connected_fill = function(){
        return get_latest_connected_fill(impl_db.get_imp_op_list());
    }

    function get_latest_connected_fill(list){

        var last_point = 0;

        for(var i=1; i<list.length; i++){
            if(list[i]==null || i == list.length-1){
                last_point = i-1;
                break
            }
        }

        switch(last_point){
            case 0: return 20

            case 1: return 40

            case 2: return 65

            case 3: return 90

            case 4: return 90
        }
    }

    this.get_imp_op_list = function(){
        return ["empty",this.rows,this.weights,this.start_row,this.h_version];
    }

    this.set_impl_information = function(values){

        var stopper = false;
        var counter = 0;
        var list = impl_db.get_imp_op_list();

        while(stopper==false && counter <= get_latest_fill(list)){

            if(list[counter+1] == null){

                stopper = true;
                switch(counter){
                    case 0: impl_db.rows = values[counter];
                        //input_reader.set_progress_bar(40);
                        log_manager.add_action_Event("set_rows");
                        break

                    case 1: impl_db.weights = values[counter];
                        //input_reader.set_progress_bar(65);
                        log_manager.add_action_Event("set_weights");
                        break

                    case 2: impl_db.start_row = values[counter];
                        impl_db.h_version = values[counter+1];
                        //input_reader.set_progress_bar(90);
                        log_manager.add_action_Event("set_build_variant");
                        break
                }
            }
            counter++;
        }
        list = impl_db.get_imp_op_list();

        input_reader.set_progress_bar(get_latest_connected_fill(list));

        if(impl_db.rows!= null && impl_db.weights != null && impl_db.start_row!= null){
            impl_db.d_options_selector = true;
            document.getElementById("information_box_icon_frame").style.display ="inline";
        }
    }

    this.delete_weights = function(){
        this.weights = null;
        this.delete_interaction();
        this.show_information();
        impl_db.d_options_selector = null;
        document.getElementById("information_box_icon_frame").style.display ="none";
        input_reader.set_progress_bar(40);
        log_manager.add_action_Event("delete_weights");
        start();
    }

    this.set_interaction_function = function(val){
        this.selected_function = val;
        this.show_information();
    }

    this.detect_checked_interaction_button = function(){

        var element = document.getElementById("input_radio");
        var child = element.firstChild;

        while(child!=null){
            if(child.checked ==true){
                impl_db.set_interaction_function(output_writer.get_F_Number(child.value));
            }
            child = child.nextSibling;
        }
        start();
    }

    /*this.detect_checked_interaction_button2 = function(){
        var element = document.getElementById("input_radio2");
        var child = element.firstChild;
        this.grasp_selector = false;
        this.material_selector = false;

        while(child!=null){
            if (child.checked == true && child.value == "grasp") {
                this.grasp_selector = true;
            }
            if (child.checked == true && child.value == "Material") {
                this.material_selector = true;
            }
            child = child.nextSibling;
        }
        start();
    }*/

    this.interaction_check = function(){
        return this.selected_function!= undefined&& this.selected_function!=null;
    }

    /*this.interaction_check2 = function(){
        return this.grasp_selector == true || this.material_selector == true;
    }*/

    this.is_filled = function(){
        return this.weights!=null && this.rows!=null;
    }

    this.show_information = function(){
        var element = document.getElementById("implicid_data_out");

        var implicit_out = "<p class='implicid_headline'><b>Current characteristics: </b></p>";

        if(this.rows != null){
            implicit_out += "<input onclick='impl_db.delete_rows()'" +
            "class='exit_button' type='button' value='X'> "+ this.rows+" Rows <br>";
        }
        if(this.weights != null){
            implicit_out += "<input onclick='impl_db.delete_weights()'" +
            "class='exit_button' type='button' value='X'> "+
            output_writer.get_Weighting_Description(this.weights)+" <br>";
        }
        if(this.start_row != null && this.h_version!=null){
            implicit_out += "<input onclick='impl_db.delete_start_row()'" +
            "class='exit_button' type='button' value='X'> Build Variant: "+
            this.start_row+" with H-Level: "+this.h_version+"<br>";
        }
        /*if(this.d_options_selector != null){
            implicit_out += "<input onclick='impl_db.delete_d_options_selector()'" +
            "class='exit_button' type='button' value='X'> Show variations: "+
            this.start_row+" <br>";
        }*/
        /*if(this.grasp != null){
            implicit_out += "<input onclick='impl_db.delete_grasp()'" +
            "class='exit_button' type='button' value='X'> "+ this.grasp+" <br>";
        }
        if(this.material != null){
            implicit_out+= "<input onclick='impl_db.delete_material()'" +
            "class='exit_button' type='button' value='X'> "+ output_writer.get_Material_FullName(this.material);
        }
            //"<input class='exit_button' type='button' value='X'> "+output_writer.get_F_Name(this.selected_function)+" <br> "+
        */
        element.innerHTML= implicit_out;

        /*element.innerHTML=this.rows+" rows <br> weighting "+this.weights+" <br>  "+
        output_writer.get_F_Name(this.selected_function)+" <br> "+ this.grasp +" <br> "+ this.material;*/
    }

    this.delete_interaction = function(){
        //this.grasp_selector = null;
        //this.material_selector = null;
        this.selected_function = undefined;
        output_writer.delete_interaction_functions();
    }

}
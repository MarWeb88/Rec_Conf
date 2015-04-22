/**
 * Created by Martin on 15.03.2015.
 */

function Implicit_Database(){
    //stores information that are collected during the interaction
    //current weighting of the chosen model
    //probabilities of the element options for each function

    this.weights = null;
    //this.probabilities = null;
    this.rows = null;
    this.grasp = expl_db.grasps[0];
    this.selected_function = undefined;
    this.grasp_selector = false;
    this.material_selector = false;
    this.d_options = null;
    this.material = expl_db.materials[0];

    //save d_options for each functions

    this.set_information = function(weights,probabilities,rows,grasp,d_options,material){
        this.weights = weights;
        //this.probabilities = probabilities;
        this.rows = rows;
        this.grasp = grasp;
        this.d_options = d_options;
        this.material = material;
    }

    this.reset = function(){

        this.set_information(null,null,null,expl_db.grasps[0],null,expl_db.materials[0]);
        this.selected_function = undefined;
        //this.material_selector=null;
        //this.grasp_selector = null;

        document.getElementById("implicid_data_out").innerHTML="";
        curr_model_ID = null;

        document.getElementById("grasp_select").options[0].selected = true;
        document.getElementById("material_select").options[0].selected = true;

        output_writer.delete_info_icon();
        output_writer.delete_interaction_functions();
        start(0);
    }

    this.set_grasp = function(){
        this.grasp = document.getElementById("grasp_select").value;
        if(curr_model_ID != null){
            obj_visualizer.call_vis(curr_model_ID);
        }
    }

    this.set_material = function(){
        this.material = "images/"+document.getElementById("material_select").value+".jpg";
        if(curr_model_ID != null){
            obj_visualizer.call_vis(curr_model_ID);
        }
    }

    this.delete_rows = function(){
        this.rows = null;
        this.delete_interaction();
        this.show_information();
        start();
    }

    /*this.delete_grasp = function(){
        this.grasp = null;
        this.delete_interaction();
        this.show_information();
        start();
    }

    this.delete_material = function(){
        this.material = null;
        this.delete_interaction();
        this.show_information();
        start();
    }*/

    this.delete_weights = function(){
        this.weights = null;
        this.delete_interaction();
        this.show_information();
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
/**
 * Created by Martin on 15.03.2015.
 */

function Implicit_Database(){
    //stores information that are collected during the interaction
    //current weighting of the chosen model
    //probabilities of the element options for each function

    this.weights = null;
    this.probabilities = null;
    this.rows = null;
    this.grasp = null;
    this.selected_function = undefined;
    this.d_options = null;

    //save d_options for each functions

    this.set_information = function(weights,probabilities,rows,grasp,d_options){
        this.weights = weights;
        this.probabilities = probabilities;
        this.rows = rows;
        this.grasp = grasp;
        this.d_options = d_options;
    }

    this.reset = function(){

        this.set_information(null,null,null,null,null);
        this.selected_function = undefined;

        document.getElementById("implicid_data_out").innerHTML="";
        output_writer.delete_info_icon();
        output_writer.delete_interaction_functions();
        start();
    }

    this.set_interaction_function = function(val){
        this.selected_function = val;
        this.show_information();
        start();
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
        //this.set_interaction_function()
    }

    this.interaction_check = function(){
        return this.selected_function!= undefined&& this.selected_function!=null;
    }

    this.is_filled = function(){
        return this.weights!=null && this.rows!=null;
    }

    this.show_information = function(){
        var element = document.getElementById("implicid_data_out");
        element.innerHTML=this.rows+" rows <br> weighting "+this.weights+" <br>  "+ output_writer.get_F_Name(this.selected_function);
    }

}
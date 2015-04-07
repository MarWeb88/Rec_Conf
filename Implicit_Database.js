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
    this.selected_function = null;

    this.set_information = function(weights,probabilities,rows){
        this.weights = weights;
        this.probabilities = probabilities;
        this.rows = rows;
    }

    this.reset = function(){
        this.weights = null;
        this.probabilities = null;
        this.rows = null;

        document.getElementById("implicid_data_out").innerHTML="";
        output_writer.delete_info_icon();
    }

    this.set_interaction_function = function(val){
        this.selected_function = val;
    }

    this.interaction_check = function(){
        /*if(this.selected_function>= 0 && this.selected_function < expl_db.functions.length){
            return true;
        }else{
            return false;
        }*/
        return this.selected_function!= null;
    }

    this.is_filled = function(){
        return this.weights!=null && this.rows!=null;
    }

    this.show_information = function(){
        var element = document.getElementById("implicid_data_out");
        element.innerHTML=this.rows+" rows and weighting "+this.weights+" selected";
    }
}
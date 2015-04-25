/**
 * Created by Martin on 23.04.2015.
 */

function Log_Manager(){

    var start_time = new Date().getTime()/1000;
    this.elements = new Array();

    this.add_action_Event = function(useraction){

        var el = new Action_Event(get_elapsed_Time(),useraction);

        this.elements[this.elements.length]= el;
    }

    this.get_output = function(){

        var output_string = "";
        for(var i=0; i<this.elements.length; i++){
            output_string+= this.elements[i].useraction+"("+this.elements[i].time_stamp+"): ";

            [expl_db.height,expl_db.width,expl_db.depth,expl_db.functions,
                expl_db.d_option_cons,expl_db.purp_functions];
            var el_part = this.elements[i].model_Object.global_settings;

            //Dimensions
            output_string+= "Height: "+ el_part[0]+" cm, ";
            output_string+= "Width: "+ el_part[1]+" cm, ";
            output_string+= "Depth: "+ el_part[2]+" cm, ";


        }
        alert(output_string);
    }

    function get_elapsed_Time(){
        var d = new Date().getTime()/1000;
        return Math.round((d - start_time) * 10) / 10;
    }
}
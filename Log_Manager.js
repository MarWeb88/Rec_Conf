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
            for(var j=0; j<this.elements[i].model_Object.global_settings.length; j++){
                output_string+=this.elements[i].model_Object.global_settings[j]+", ";
            }
        }
        alert(output_string);
    }

    function get_elapsed_Time(){
        var d = new Date().getTime()/1000;
        return Math.round((d - start_time) * 10) / 10;
    }
}
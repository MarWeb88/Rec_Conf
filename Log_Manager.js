/**
 * Created by Martin on 23.04.2015.
 */

function Log_Manager(){

    var start_time = new Date().getTime()/1000;
    this.elements = new Array();

    this.add_action_Event = function(useraction){

        var d = new Date().getTime()/1000;
        var diff = Math.round((d - start_time) * 10) / 10;

        var el = new Action_Event(diff,useraction);
        this.elements[this.elements.length]= el;
    }

    this.get_output = function(){

        var output_string = "";
        for(var i=0; i<this.elements.length; i++){
            output_string+= this.elements[i].useraction+"("+this.elements[i].time_stamp+");  ";
        }
        alert(output_string);
    }
}
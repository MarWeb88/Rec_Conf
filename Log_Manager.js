/**
 * Created by Martin on 23.04.2015.
 */

function Log_Manager(){

    var start_time = new Date().getTime()/1000;
    JL().fatal("log message");
    var counter = 0;

    this.get_pool = function(){
        return get_Pool();
    }

    this.add_action_Event = function(useraction){

        /*this.elements[this.elements.length]=
            new Action_Event(this.elements.length,get_elapsed_Time(),useraction);*/
        //var obj = new Action_Event(user_ID,counter,get_elapsed_Time(),useraction);
        var ob_string = "{"+user_ID+","+counter+","+get_elapsed_Time()+","+useraction+","+get_Pool()+"}";
        counter++;
        JL().log(2545,ob_string);
    }

    /*this.get_output = function(){

        var output_string = "";
        for(var i=0; i<this.elements.length; i++){
            output_string+= this.elements[i].useraction+"("+this.elements[i].time_stamp+"): ";

            //var el_part = this.elements[i].model_Object.global_settings;

            //Dimensions
            /*output_string+= "Height: "+ el_part[0]+" cm, ";
            output_string+= "Width: "+ el_part[1]+" cm, ";
            output_string+= "Depth: "+ el_part[2]+" cm, ";
        }
        alert(output_string);
    }*/

    function get_elapsed_Time(){
        var d = new Date().getTime()/1000;
        return Math.round((d - start_time) * 10) / 10;
    }

    function get_Pool(){
        var ar = impl_db.get_imp_op_list();
        var pool_nr = 0;

        if(expl_db.purp_functions[0]==undefined){
            return pool_nr;
        }else{
            pool_nr++;
        }

        for(var i=1; i<ar.length; i++){
            if(ar[i]!= null){
                pool_nr++;
            }else{
                break;
            }
        }
        return pool_nr;
    }
}
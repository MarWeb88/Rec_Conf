/**
 * Created by Martin on 24.04.2015.
 */

function History(){
    this.savepoints = new Array();

    this.save_model = function(){

        this.savepoints[this.savepoints.length]= new Model_Object();
        log_manager.add_action_Event("create savepoint "+this.savepoints.length);
        write_savepoint(this.savepoints.length-1);
    }

    this.load_model = function(ID){

        var el = this.savepoints[ID];

        el.set_global_settings();
        el.set_imp_data();

        //set all fields
        input_reader.set_Input_Fields();

        impl_db.set_slider_values();

        impl_db.show_information();

        output_writer.generate_info_icon(l_options[curr_model_ID]);
        obj_visualizer.call_vis(curr_model_ID,0);
        log_manager.add_action_Event("load savepoint "+ID+1);
        start();

    }

    function write_savepoint(ID){
        var el = document.getElementById("history_s");
        el.innerHTML +="<div onclick='history_s.load_model("+ID+")'> Model "+ID+"</div>";
    }

}
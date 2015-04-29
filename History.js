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

        //output_writer.generate_info_icon(l_options[curr_model_ID]);
        obj_visualizer.call_vis(curr_model_ID,0);
        log_manager.add_action_Event("load savepoint "+ID+1);
        start();

    }

    function write_savepoint(ID){
        var el = document.getElementById("history_s");
        var box = document.createElement("div");

        input_reader.change_2d_3d_vis();

        html2canvas(document.getElementById("2d_canvas"),{onrendered: function(canvas) {
            el.appendChild(canvas);
            canvas.style.height = "60px";
            canvas.style.width = "60px";
            canvas.setAttribute("onclick","history_s.load_model("+ID+")");
        },
            width: 400,
            height: 340
        });

        input_reader.change_2d_3d_vis();

    }

}
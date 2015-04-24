/**
 * Created by Martin on 24.04.2015.
 */

function History(){
    this.savepoints = new Array();

    this.save_model = function(){

        this.savepoints[this.savepoints.length]= new Model_Object();
        write_savepoint(this.savepoints.length-1);
    }

    this.load_model = function(ID){

        var el = this.savepoints[ID];

        el.set_global_settings();
        el.set_imp_data();

        //set all fields
        input_reader.set_Input_Fields();
        alert("3");
        impl_db.set_slider_values();
        alert("4");
        impl_db.show_information();
        alert("5");
        output_writer.generate_info_icon(l_options[curr_model_ID]);
        alert("6");
        start();
        alert("7");
    }

    function write_savepoint(ID){
        var el = document.getElementById("history_s");
        el.innerHTML +="<div onclick='history_s.load_model("+ID+")'> Model "+ID+"</div>";
    }

}
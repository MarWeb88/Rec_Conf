/**
 * Created by Martin on 24.04.2015.
 */

function History(){
    this.savepoints = new Array();

    this.save_model = function(){
        this.savepoints[this.savepoints.length]= new Model_Object();
    }

    this.load_model = function(ID){

        var el = this.savepoints[ID];

        el.set_global_settings();
        el.set_imp_data();

        //set all fields

        //start
    }
}
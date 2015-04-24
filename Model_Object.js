/**
 * Created by Martin on 23.04.2015.
 */

function Model_Object(){

    this.global_settings = get_global_settings();
    this.imp_data  = get_imp_data();

    function get_imp_data(){

        var ar = [this.weights,this.rows = null,this.grasp,
            this.material,this.start_row,this.d_options,this.grasp_selector,
            this.material_selector,this.d_options_selector];

        return ar;
    }

    function get_global_settings(){

        var ar = [expl_db.height,expl_db.width,expl_db.depth,expl_db.functions,
            expl_db.d_option_cons,curr_model_ID,l_options_full,l_options];

        return ar;
    }

    this.set_imp_data = function(){

        impl_db.weights = this.imp_data[0];
        impl_db.rows = this.imp_data[1];
        impl_db.grasp = this.imp_data[2];
        impl_db.material = this.imp_data[3];
        impl_db.start_row = this.imp_data[4];
        impl_db.d_options = this.imp_data[5];
        impl_db.grasp_selector = this.imp_data[6];
        impl_db.material_selector = this.imp_data[7];
        impl_db.d_options_selector = this.imp_data[8];
    }

    this.set_global_settings = function(){

        expl_db.height = this.global_settings[0];
        expl_db.width = this.global_settings[1];
        expl_db.depth = this.global_settings[2];
        expl_db.functions = this.global_settings[3];
        expl_db.d_option_cons = this.global_settings[4];
        curr_model_ID = this.global_settings[5];
        l_options_full = this.global_settings[6];
        l_options = this.global_settings[7];

        input_reader.set_Input_Fields();
    }
}
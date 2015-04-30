/**
 * Created by Martin on 23.04.2015.
 */

function Model_Object(){

    this.global_settings = clone(get_global_settings());
    this.imp_data  = clone(get_imp_data());

    function get_imp_data(){

        return [impl_db.weights,impl_db.rows,impl_db.grasp,
            impl_db.material,impl_db.start_row,impl_db.d_options,impl_db.grasp_selector,
            impl_db.material_selector,impl_db.d_options_selector,impl_db.h_version];
    }

    function get_global_settings(){

        alert("mufasa");
        return [expl_db.height,expl_db.width,expl_db.depth,expl_db.functions,
            expl_db.d_option_cons,curr_model_ID,l_options_full,l_options,expl_db.purp_functions];
    }

    this.set_imp_data = function(){

        impl_db.weights = clone(this.imp_data[0]);
        impl_db.rows = clone(this.imp_data[1]);
        impl_db.grasp = clone(this.imp_data[2]);
        impl_db.material = clone(this.imp_data[3]);
        impl_db.start_row = clone(this.imp_data[4]);
        impl_db.d_options = clone(this.imp_data[5]);
        impl_db.grasp_selector = clone(this.imp_data[6]);
        impl_db.material_selector = clone(this.imp_data[7]);
        impl_db.d_options_selector = clone(this.imp_data[8]);
        impl_db.h_version = clone(this.imp_data[9]);
    }

    this.set_global_settings = function(){

        expl_db.height = clone(this.global_settings[0]);
        expl_db.width = clone(this.global_settings[1]);
        expl_db.depth = clone(this.global_settings[2]);
        expl_db.functions = clone(this.global_settings[3]);
        expl_db.d_option_cons = clone(this.global_settings[4]);
        curr_model_ID = clone(this.global_settings[5]);
        l_options_full = clone(this.global_settings[6]);
        l_options = clone(this.global_settings[7]);
        expl_db.purp_functions = clone(this.global_settings[8]);

    }
}
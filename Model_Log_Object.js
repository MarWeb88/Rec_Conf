/**
 * Created by Martin on 24.04.2015.
 */

function Model_Log_Object(){

    //this.model = get_Model();
    this.global_settings = get_global_settings();
    this.imp_data  = get_imp_data();

    function get_imp_data(){

        return [impl_db.weights,impl_db.rows,impl_db.grasp,
            impl_db.material,impl_db.start_row,impl_db.d_options];
    }

    function get_global_settings(){

        return [expl_db.height,expl_db.width,expl_db.depth,expl_db.functions,
            expl_db.d_option_cons,expl_db.purp_functions];
    }

    function get_Model(){
        if(curr_model_ID!=null){
            return l_options[curr_model_ID];
        }else{
            return null;
        }
    }
}
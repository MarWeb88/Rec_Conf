/**
 * Created by Martin on 23.04.2015.
 */

function Action_Event(User_ID,ID,time_stamp,useraction){

    this.User_ID = User_ID;
    this.ID = ID;
    this.time_stamp = time_stamp;
    this.useraction = useraction;
    this.pool = get_Pool();
    //this.model_Object = new Model_Log_Object();


    function get_Pool(){
        var ar = impl_db.get_imp_op_list();
        var pool_nr = 0;

        if(expl_db.purp_functions==null){
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
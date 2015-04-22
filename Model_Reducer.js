/**
 * Created by Martin on 02.04.2015.
 */

function Model_Reducer(){

    var max_options = 50;
    var variant_mode = 0;
    //seperates the model in different lists

    this.set_max_options = function(){
        if(variant_mode == 0){
            max_options = 10000000;
            document.getElementById("output_changer").value = "Small Mode";
            variant_mode = 1;
        }else{
            max_options = 50;
            document.getElementById("output_changer").value = "Full Mode";
            variant_mode = 0;
        }
        start();
    }

    this.reduce_options = function(optionlist){

        var optionlist_reduced;
        var optionlist_reduced_counter;
        var option_list_old = optionlist;
        var version;

        //Begin of Interaction Case
        //if(impl_db.interaction_check()||impl_db.interaction_check2()) {

        if(impl_db.interaction_check()) {
            //case with interaction

            if(impl_db.interaction_check()) {
                version = 1;
            }
            /*if(impl_db.interaction_check2()){
                version = 2;
            }*/

            optionlist_reduced = new Array();
            optionlist_reduced_counter = 0;

            //reduce the number of variations on the selected function
            for(var i=0; i<option_list_old.length; i++){

                if(version == 1){

                    if(option_list_old[i].check_weighting(impl_db.selected_function)){

                        optionlist_reduced[optionlist_reduced_counter] = clone(option_list_old[i]);
                        optionlist_reduced_counter++;
                    }
                }
                /*if(version == 2){
                    if(option_list_old[i].check_weighting(-1)){ //check with invalid number

                        optionlist_reduced[optionlist_reduced_counter] = clone(option_list_old[i]);
                        optionlist_reduced_counter++;
                    }
                }*/
            }

            option_list_old=clone(optionlist_reduced);

        }
        //End of Interaction part

        if (option_list_old.length > max_options || version != 0) {
            //reduce number of options on those with the same grasp
            optionlist_reduced = new Array();
            optionlist_reduced_counter = 0;

            for (var i = 0; i < option_list_old.length; i++) {

                if (//option_list_old[i].check_grasp() &&
                    //option_list_old[i].check_material() &&
                    option_list_old[i].check_row_num() &&
                    option_list_old[i].check_weighting_distance(1)
                ) {
                    optionlist_reduced[optionlist_reduced_counter] = clone(option_list_old[i]);
                    optionlist_reduced_counter++;
                }
            }
            option_list_old = clone(optionlist_reduced);
        }else{
            optionlist_reduced = clone(option_list_old);
        }

        /*if(impl_db.is_filled()){
            //case with implicit information

            var version;

            //Begin of Interaction Case
            if(impl_db.interaction_check()||impl_db.interaction_check2()) {
                //case with interaction

                if(impl_db.interaction_check()) {
                    version = 1;
                }
                if(impl_db.interaction_check2()){
                    version = 2;
                }

                optionlist_reduced = new Array();
                optionlist_reduced_counter = 0;

                //reduce the number of variations on the selected function
                for(var i=0; i<option_list_old.length; i++){

                    if(version == 1){

                        if(option_list_old[i].check_weighting(impl_db.selected_function)){

                            optionlist_reduced[optionlist_reduced_counter] = clone(option_list_old[i]);
                            optionlist_reduced_counter++;
                        }
                    }
                    if(version == 2){
                        if(option_list_old[i].check_weighting(-1)){ //check with invalid number

                            optionlist_reduced[optionlist_reduced_counter] = clone(option_list_old[i]);
                            optionlist_reduced_counter++;
                        }
                    }
                }
                option_list_old=clone(optionlist_reduced);

            }
            //End of Interaction part

            if (option_list_old.length > max_options || version != 0) {
                //reduce number of options on those with the same grasp
                optionlist_reduced = new Array();
                optionlist_reduced_counter = 0;

                for (var i = 0; i < option_list_old.length; i++) {

                    if (option_list_old[i].check_grasp() &&
                        option_list_old[i].check_material() &&
                        option_list_old[i].check_row_num() &&
                        option_list_old[i].check_weighting_distance(1)
                    ) {
                        optionlist_reduced[optionlist_reduced_counter] = clone(option_list_old[i]);
                        optionlist_reduced_counter++;
                    }
                }
                option_list_old = clone(optionlist_reduced);
            }else{
                optionlist_reduced = clone(option_list_old);
            }

        }else{
            //alert("3-implicit data empty");
            optionlist_reduced=clone(option_list_old);
        }*/

        //Beginn of Standard Procedure

        if(optionlist_reduced.length > max_options){
            //use sampling to reduce number of options under borderlimit

            var buckets;
            var row_ar;

            //ensure that every row variation is there
            if(!impl_db.is_filled()&&!impl_db.interaction_check()) {
                //if there is no interaction or implicit information

                row_ar = expl_db.get_possible_parts();
            }else{
                row_ar = new Array(1);
                row_ar[0]= impl_db.rows;
            }
            buckets = new Array(row_ar.length);

            //create buckets
            for(var i=0; i<row_ar.length; i++){
                buckets[i] = new Bucket(row_ar[i]);
            }
            //distribute elements in buckets
            for(var i=0; i<optionlist_reduced.length; i++){
                buckets[optionlist_reduced[i].row_num-row_ar[0]].add_Element(optionlist_reduced[i]);
            }

            //ensure that weightings are as different as possible
            var cur_bucket = 0;
            var optionlist_reduced_final_counter = 0;
            //var optionlist_reduced_final = optionlist_reduced;
            var optionlist_reduced_final = new Array();

            while(optionlist_reduced_final.length < max_options){

                var ret_el = buckets[cur_bucket].select_Element();

                if(ret_el != null){

                    optionlist_reduced_final[optionlist_reduced_final_counter] = ret_el;
                    //change ID
                    //optionlist_reduced_final[optionlist_reduced_final_counter].ID = optionlist_reduced_final_counter;
                    optionlist_reduced_final_counter++;
                }

                cur_bucket++;
                if(cur_bucket>buckets.length-1){
                    cur_bucket=0;
                }

            }
            optionlist_reduced = optionlist_reduced_final;
        }
        //sequence IDs
        for(var i=0; i<optionlist_reduced.length; i++){
            optionlist_reduced[i].ID = i;
        }

        return optionlist_reduced;
    }

 /*   this.reduce_options = function(optionlist){

        var optionlist_reduced;
        var optionlist_reduced_counter;
        var option_list_old = optionlist;

        if(impl_db.interaction_check() == true){
            //case if there is a function selected in the 3D interface
            //alert("2-interaction true");

            optionlist_reduced = new Array();
            optionlist_reduced_counter = 0;

            //reduce the number of variations on the selected function
            for(var i=0; i<option_list_old.length; i++){
                if(option_list_old[i].check_weighting(impl_db.selected_function)){

                    optionlist_reduced[optionlist_reduced_counter] = clone(option_list_old[i]);
                    optionlist_reduced_counter++;
                }
            }
            option_list_old=clone(optionlist_reduced);
            //alert("1 "+optionlist_reduced.length);

            //reduce number of options on those with the same row_num
            optionlist_reduced = new Array();
            optionlist_reduced_counter = 0;

            for(var i=0; i<option_list_old.length; i++){

                if(option_list_old[i].check_row_num()){
                    optionlist_reduced[optionlist_reduced_counter]=clone(option_list_old[i]);
                    optionlist_reduced_counter++;
                }
            }
            option_list_old=clone(optionlist_reduced);


            //reduce number of options on those with the same row_num
            optionlist_reduced = new Array();
            optionlist_reduced_counter = 0;

            for(var i=0; i<option_list_old.length; i++){

                if(option_list_old[i].check_grasp()){
                    optionlist_reduced[optionlist_reduced_counter]=clone(option_list_old[i]);
                    optionlist_reduced_counter++;
                }
            }
            option_list_old=clone(optionlist_reduced);

            //alert("2 "+optionlist_reduced.length);

            //reduce number of options on those with the same material
            optionlist_reduced = new Array();
            optionlist_reduced_counter = 0;

            for(var i=0; i<option_list_old.length; i++){

                if(option_list_old[i].check_material()){
                    optionlist_reduced[optionlist_reduced_counter]=clone(option_list_old[i]);
                    optionlist_reduced_counter++;
                }
            }
            option_list_old=clone(optionlist_reduced);

            //alert("3 "+optionlist_reduced.length);

        }else{

            //alert("2-interaction false");

            if(impl_db.is_filled()){
                //case when there is no interaction, but already implicit information
                //alert("3-implicit data filled  "+option_list_old.length + max_options);

                if(option_list_old.length > max_options){
                    //reduce number of options on those with the same grasp
                    optionlist_reduced = new Array();
                    optionlist_reduced_counter = 0;

                    for(var i=0; i<option_list_old.length; i++){

                        if(option_list_old[i].check_grasp()&&
                            option_list_old[i].check_material()){
                            optionlist_reduced[optionlist_reduced_counter]=clone(option_list_old[i]);
                            optionlist_reduced_counter++;
                        }
                    }
                    option_list_old=clone(optionlist_reduced);
                }else{
                    optionlist_reduced = clone(option_list_old);
                }

                //alert("3 " + optionlist_reduced.length);


                if(option_list_old.length > max_options){
                    //reduce number of options on those with the same row_num
                    optionlist_reduced = new Array();
                    optionlist_reduced_counter = 0;

                    for(var i=0; i<option_list_old.length; i++){

                        if(option_list_old[i].check_row_num()){
                            optionlist_reduced[optionlist_reduced_counter]=clone(option_list_old[i]);
                            optionlist_reduced_counter++;
                        }
                    }
                    option_list_old=clone(optionlist_reduced);
                }else{
                    optionlist_reduced = clone(option_list_old);
                }

                if(option_list_old.length > max_options){
                    //reduce number of variations on those within max_distance
                    optionlist_reduced = new Array();
                    optionlist_reduced_counter = 0;

                    for(var i=0; i<option_list_old.length; i++){

                        if(option_list_old[i].check_weighting_distance(1)){
                            optionlist_reduced[optionlist_reduced_counter] = clone(option_list_old[i]);
                            optionlist_reduced_counter++;
                        }
                    }
                    option_list_old=clone(optionlist_reduced);
                }else{
                    optionlist_reduced = clone(option_list_old);
                }
                //alert("4 " + optionlist_reduced.length);

            }else{
                //alert("3-implicit data empty");
                optionlist_reduced=clone(option_list_old);
            }
        }
        //ensure different option variants and different grasps
        if(optionlist_reduced.length > max_options){
            //use sampling to reduce number of options under borderlimit

            var buckets;
            var row_ar;

            //ensure that every row variation is there
            if(!impl_db.is_filled()&&!impl_db.interaction_check()) {
                //if there is no interaction or implicit information

                row_ar = expl_db.get_possible_parts();
            }else{
                row_ar = new Array(1);
                row_ar[0]= impl_db.rows;
            }

            buckets = new Array(row_ar.length);

            //create buckets
            for(var i=0; i<row_ar.length; i++){
                buckets[i] = new Bucket(row_ar[i]);
            }
            //distribute elements in buckets
            for(var i=0; i<optionlist_reduced.length; i++){
                buckets[optionlist_reduced[i].row_num-row_ar[0]].add_Element(optionlist_reduced[i]);
            }
            //ensure that weightings are as different as possible
            var cur_bucket = 0;
            var optionlist_reduced_final_counter = 0;
            //var optionlist_reduced_final = optionlist_reduced;
            var optionlist_reduced_final = new Array();

            while(optionlist_reduced_final.length < max_options){

                var ret_el = buckets[cur_bucket].select_Element();

                if(ret_el != null){
                    optionlist_reduced_final[optionlist_reduced_final_counter] = ret_el;
                    //change ID
                    optionlist_reduced_final[optionlist_reduced_final_counter].ID = optionlist_reduced_final_counter;
                    optionlist_reduced_final_counter++;
                }

                cur_bucket++;
                if(cur_bucket>buckets.length-1){
                    cur_bucket=0;
                }

            }
            optionlist_reduced = optionlist_reduced_final;
        }

        return optionlist_reduced;
    }*/
}
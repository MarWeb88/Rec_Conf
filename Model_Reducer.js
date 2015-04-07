/**
 * Created by Martin on 02.04.2015.
 */

function Model_Reducer(){

    var max_options = 6;
    //seperates the model in different lists

    this.reduce_options = function(optionlist){

        //check if there is an Interaction action
            //if, yes then fix other function weights, set Interaction = true

        //if there are more than 'border' Elements left, check Implicit Knowledge

            //if (interaction=true){
                    //1.just show variations of the weighting of the selected function
                    //2.just show options with current number of rows
                    //3.rank according probability of element options
            //}else{
                //if(saved model == true){
                    //1.just show variations within max distance of current selection
                    //2.just show options with current number of rows
                    //3.use probability options on the selected part
                //}else{
                    // 1.2.3. do nothing
                // }
            // }
        //4.use sampling to make the final reduction
        //check within each step if elements are reduced enough

        //Real Program
        var optionlist_reduced = new Array();
        var optionlist_reduced_counter = 0;

        if(impl_db.interaction_check == true){
            //case if there is a function selected in the 3D interface
            alert("2-interaction true");
            if(optionlist.length > max_options){
                //reduce the number of variations on the selected function
                for(var i=0; i<optionlist.length; i++){
                    if(optionlist[i].check_weighting(impl_db.selected_function)){
                        optionlist_reduced[optionlist_reduced_counter] = optionlist[i];
                        optionlist_reduced_counter++;
                    }
                }
            }

            if(optionlist_reduced.length > max_options){
                //reduce the number of options on the current number of rows
                for(var i=0; i<optionlist_reduced.length; i++){
                    if(optionlist_reduced[i].check_row_num()){
                        var optionlist_temp = optionlist_reduced;
                        optionlist_reduced = new Array();
                        optionlist_reduced_counter = 0;

                        optionlist_reduced[optionlist_reduced_counter]=optionlist_temp[i];
                        optionlist_reduced_counter++;
                    }
                }
            }

            if(optionlist_reduced.length > max_options){
                //use probability information to reduce number of options

            }
        }else{

            alert("2-interaction false");

            if(impl_db.is_filled()){
                //case when there is no interaction, but already implicit information
                alert("3-implicit data filled");

                if(optionlist.length > max_options){
                    //reduce number of variations on those within max_distance
                    for(var i=0; i<optionlist.length; i++){
                        if(optionlist.check_weighting_distance(1)){
                            optionlist_reduced[optionlist_reduced_counter] = optionlist[i];
                            optionlist_reduced_counter++;
                        }
                    }
                }

                if(optionlist_reduced.length > max_options){
                    //reduce number of options on those with the same row_num
                    for(var i=0; i<optionlist_reduced.length; i++){
                        if(optionlist_reduced[i].check_row_num()){
                            var optionlist_temp = optionlist_reduced;
                            optionlist_reduced = new Array();
                            optionlist_reduced_counter = 0;

                            optionlist_reduced[optionlist_reduced_counter]=optionlist_temp[i];
                            optionlist_reduced_counter++;
                        }
                    }
                }

                if(optionlist_reduced.length > max_options){
                    //use probability information to reduce number of options

                }

            }else{
                alert("3-implicit data empty");
                optionlist_reduced = optionlist;
            }

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
                    row_ar[0]= impl_db.row_num;
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

                //alert("4");
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
                //alert("5");
                optionlist_reduced = optionlist_reduced_final;
            }
        }

        return optionlist_reduced;
    }
}
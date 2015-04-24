/** * Created by Martin on 15.03.2015. */function Model_Calculator(){    this.matrix;    this.build_lists;    this.models;    this.start_calc = function(input){        //calc standard weighting matrix        this.matrix = calc_weighting_matrix(expl_db.functions);        /*  Test Matrix Creation        for(var i=0; i<this.matrix.length; i++){            for(var j=0; j<this.matrix[i].weightings.length; j++){                output = output + this.matrix[i].weightings[j]+" , ";            }            output = output+"\n";        }        alert(output);        */        //reduce weighting matrix     TO DO!!!!        //create build lists        this.build_lists = create_build_lists(this.matrix);        // Test Build Lists        var out_string="";        for(var i=0; i<this.build_lists.length; i++){            out_string = out_string + "List "+i+": ";            for(var j=0; j<this.build_lists[i].length; j++){                out_string=out_string+" F"+this.build_lists[i][j].type+" "+this.build_lists[i][j].height+"cm ,";            }            out_string=out_string+"; ";        }        //alert(out_string);        //generate variants        this.models = generate_variants();        /*//Model Test        var out_sstring = "";        for(var ii=0; ii<this.models.length; ii++){            out_sstring=out_sstring+"Model "+ii+ " hat "+ this.models[ii].rows.length+" Reihen, ";        }        alert(out_sstring);         */        //create models using Build Lists and existing model        this.models = create_options(this.build_lists,this.models,this.matrix);        //calculate element options        this.models = calculate_model_variations(this.models);        return this.models;    }    function calc_weighting_matrix(functions){        //calc number of valid function options        var counter =0;        var variation = 3;        for(var i=0; i<functions.length; i++){            if(functions[i]==true){                counter++;            }        }        //create matrix        var num = Math.pow(variation,counter);        var help_matrix_counter = 0;        var help_matrix = new Array();        for(var h=0; h<num; h++){            var letter;            var letter_matrix = new Array(functions.length);            var empty_bucket = 0;            var filled_bucket = 0;            letter = ten_sys_to_three_sys(h,counter,variation);            for(var j=0; j<functions.length; j++){                if(functions[empty_bucket]==true){                    //letter_matrix[empty_bucket]=letter[filled_bucket]+1;                    letter_matrix[empty_bucket]=letter[filled_bucket]+1;                    filled_bucket++;                }else{                    letter_matrix[empty_bucket]= 0;                }                empty_bucket++;            }            /*while(empty_bucket<functions.length){                //letter[j]= i%((j+1)*variation);                //fill full weighting matrix                while(functions[empty_bucket]!=true && empty_bucket<functions.length){                    letter_matrix[empty_bucket]= 0;                    //alert("empty bucket "+empty_bucket+": "+letter_matrix[empty_bucket]);                    empty_bucket++;                }                if(empty_bucket<functions.length){                    letter_matrix[empty_bucket]=letter[j];                    j++;                    //alert("empty bucket "+empty_bucket+": "+letter_matrix[empty_bucket]);                    empty_bucket++;                }            }*/            var help_matrix_el = new Weighting(letter_matrix);            //check if variation is unique            /*var l_out ="";            for(var p=0; p<h ;p++){                for(var g=0; g<help_matrix[p].weightings.length; g++){                    l_out = l_out+help_matrix[p].weightings[g]+" , ";                }                l_out= l_out+ "\n";            }            alert(l_out);*/            if(help_matrix_el.reduce_weighting(variation)==true){                help_matrix[help_matrix_counter] = help_matrix_el;                help_matrix_counter++;            }        }        return help_matrix;    }    function ten_sys_to_three_sys(num,counter,variation){        var divisor = new Array(counter);        var output = new Array(counter);        for(var i=0; i<counter; i++){            divisor[i] = Math.pow(variation,counter-i-1);        }        var rest = num;        for(var i=0; i<divisor.length; i++){            output[i]=parseInt(rest/divisor[i]);            rest = rest%divisor[i];        }        return output;    }    function reduce_weighting_matrix(help_matrix,functions){        //adopt weighting matrix to specific implicit needs, extract needs from the implicit database and change        //calculations according to it    }    function create_build_lists(weightings){        //Loop over the Weightings and add for each Weighting, the specific number of elements        //create List of Weightings        var build_lists = new Array(weightings.length);        for(var i=0; i<weightings.length; i++){            //save individual weightings of each function in each weighting element            build_lists[i] = new Array();            var ID_counter = 0;            for(var j=0; j<weightings[i].weightings.length; j++){                for(var k=0; k<weightings[i].weightings[j]; k++){                    //create for each weighting a new element and save it in the build list                    build_lists[i][ID_counter] = new Element(ID_counter,j,expl_db.f_cons[j].get_height());                    ID_counter++;                }            }        }        return build_lists;    }    function generate_variants(){        //generates model variants according to the physical constraints        var ar = expl_db.get_possible_parts();        var models = new Array(ar.length);        for(var i=0; i<ar.length; i++){            models[i]= new Model(ar[i],i,null);        }        return models;    }    function create_options(build_lists,models,matrix){        var option_list = new Array();        var option_counter = 0;        for(var i=0; i<models.length; i++){            //try for every model variant the different build_lists            for(var j=0; j<build_lists.length; j++){                //set_algorithm                for(var k=0; k<models[i].row_num; k++) {                    var end_row = k - 1;                    if(end_row < 0){                        end_row = models[i].row_num - 1;                    }                    var option = simple_box_set(models[i], build_lists[j], matrix[j].weightings,                        k, end_row);                    if(option != false){                        option_list[option_counter]= option;                        option_counter++;                    }                    //other algorithms                }            }        }        var out_put="";        for(var s=0; s<option_list.length; s++){            //alert(option_list[s].rows.length);            out_put=out_put+" Model "+s+" ";            for(var ss=0; ss<option_list[s].rows.length; ss++){                for(var sss=0; sss<option_list[s].rows[ss].length; sss++){                    out_put = out_put + " F"+option_list[s].rows[ss][sss].type+" "+option_list[s].rows[ss][sss].height+"cm, ";                }                out_put = out_put +"; ";            }            out_put = out_put +"; ";        }        //alert(out_put);        return option_list;    }    function simple_box_set(model,build_list,weighting,start_row,end_row){        var build_list_pos = 0;        var stopper = false;        var build_check = false;        var ret_model = new Model(model.row_num,model.ID,weighting);        ret_model.start_row = start_row;        //alert(start_row+" und "+end_row);        //take element out of build_list at position build_list_pos        //put element into model        //try row by row, beginning with the first one        while(stopper == false){ //run until all rows are equalized or element cannot be inserted            //take element from build list            //var element = build_list[build_list_pos];            var element = new Element(build_list[build_list_pos].ID,build_list[build_list_pos].type,build_list[build_list_pos].height);            var new_i = start_row;            for(var i=0; i<ret_model.rows.length; i++){ //vorher i=0                //try to put element in selected row, break loop if successful                if(ret_model.row_state[new_i]== false){                    //try to put Element in the row                    if(put_El_in_Row(ret_model,new_i,element)){                        //if successful start with next element and break loop                        build_list_pos++;                        if(build_list_pos>build_list.length-1){                            build_list_pos = 0;                        }                        break;                    }else{                        //check if there is space for other elements, otherwise equalize/finalize the row                        var e_check = equalize_row(ret_model,new_i);                        if(new_i== end_row){ //vorher ret_model.rows.length-1                            //if it is not possible to add the next element from the build list, the algorithms                            //is terminated                            stopper = true;                            if(ret_model.check_state()!=true){                                //if there are rows which are yet not finalized, the option is not valid                                build_check = false;                            }else{                                build_check = true;                            }                        }                    }                }                if(new_i == ret_model.rows.length-1 && ret_model.rows.length-1 != end_row){                    new_i=0;                }else{                    new_i++;                }            }        }        if(build_check == false || ensure_functions(ret_model)==false){            return false;        }else{            sort_hierarchical(ret_model);            return ret_model;        }    }    /*function simple_box_set(model,build_list,weighting,start_row,end_row){        var build_list_pos = 0;        var stopper = false;        var build_check = false;        var ret_model = new Model(model.row_num,model.ID,weighting);        //take element out of build_list at position build_list_pos        //put element into model            //try row by row, beginning with the first one        while(stopper == false){ //run until all rows are equalized or element cannot be inserted            //take element from build list            //var element = build_list[build_list_pos];            var element = new Element(build_list[build_list_pos].ID,build_list[build_list_pos].type,build_list[build_list_pos].height);            for(var i=0; i<ret_model.rows.length; i++){ //vorher i=0                //try to put element in selected row, break loop if successful                if(ret_model.row_state[i]== false){                    //try to put Element in the row                    if(put_El_in_Row(ret_model,i,element)){                        //if successful start with next element and break loop                        build_list_pos++;                        if(build_list_pos>build_list.length-1){                            build_list_pos = 0;                        }                        break;                    }else{                        //check if there is space for other elements, otherwise equalize/finalize the row                        var e_check = equalize_row(ret_model,i);                        if(i== ret_model.rows.length-1){ //vorher ret_model.rows.length-1                            //if it is not possible to add the next element from the build list, the algorithms                            //is terminated                            stopper = true;                            if(ret_model.check_state()!=true){                                //if there are rows which are yet not finalized, the option is not valid                                build_check = false;                            }else{                                build_check = true;                            }                        }                    }                }            }        }        if(build_check == false || ensure_functions(ret_model)==false){            return false;        }else{            sort_hierarchical(ret_model);            return ret_model;        }    }*/    function put_El_in_Row(model,row,element){        //check row for available space and add element        if(model.free_row_height[row] >= element.height){            //add element to the build_list of this row            model.rows[row][model.rows[row].length]= element;            //decrease free space            var free_dump_h = model.free_row_height[row];            model.free_row_height[row]=model.free_row_height[row]-element.height;            //if there is more than one element, add space for borders            if(model.rows[row].length != 1){                model.free_row_height[row]= model.free_row_height[row]-border_width_real;            }            return true;        }else{            return false;        }    }    function ensure_functions(model){        var functions = expl_db.functions;        var ret_value = false;        var all_element_types = new Array();        for(var i=0; i<model.rows.length; i++){            for(var j=0; j<model.rows[i].length; j++){                all_element_types[all_element_types.length]=model.rows[i][j].type;            }        }        for(var i=0; i<functions.length; i++){            if(functions[i]==true){                ret_value = false;                for(var j=0; j<all_element_types.length; j++){                    //alert(i+"  =  "+all_element_types[j]);                    if(i==all_element_types[j]){                        ret_value=true;                        break;                    }                }                if(ret_value==false){                    return false;                }            }        }        return true;    }    function equalize_row(model,row){        //when no element does fit in the row anymore, distribute the rest space between the other element        //check if equalizing is possible        var tolerance_sum = 0;        var model_row = model.rows[row];        for(var i=0; i<model_row.length; i++){            tolerance_sum = tolerance_sum + expl_db.f_cons[model_row[i].type].get_height_max_tolerance()            -model_row[i].height;        }        if(tolerance_sum < model.free_row_height[row]){            model.row_state[row]=false;            return false;        }else{            var indiv_rest = model.free_row_height[row]/model_row.length;            for(var i=0; i<model_row.length; i++){                model_row[i].height= model_row[i].height+indiv_rest;            }            model.free_row_height[row]=0;            model.row_state[row]=true;            return true;        }    }    function sort_hierarchical(model){        for(var i=0; i<model.rows.length; i++){            var sum = 0;            for(var ii=0; ii<model.rows[i].length; ii++){                sum = sum +model.rows[i][ii].height;            }            model.rows[i].sort(function(a,b){                var out = expl_db.f_cons[a.type].level-expl_db.f_cons[b.type].level;                return out;            });        }    }    function calculate_model_variations(models){        //create empty list for options with option counter for the number of objects        var option_list = new Array();        var option_counter = 0;        //create empty array for the variations of each element        var el_options = new Array(expl_db.f_cons.length);        //check every function in the functional constraints        for(var i=0; i<expl_db.f_cons.length; i++){            if(expl_db.functions[i]==true){                //if function is true then check if f_cons value is true                //create new model for each configuration, option are exclusive                //create empty array for every true option                el_options[i]= new Array();                for(var j=0; j<expl_db.f_cons[i].d_options.length; j++){                    if(expl_db.f_cons[i].d_options[j]==true/* &&expl_db.d_option_cons[j]==true*/){                        //create new element that contains a number of the kind of options                        //and add it to the array of the function                        el_options[i][el_options[i].length]= j;                    }                }            }else{                //if option is false then add a zero                el_options[i]=-1;            }        }        //Test 1        var out_put_s = "";        for(var i=0; i<el_options.length;i++){            out_put_s=out_put_s+"Element "+i+": "+el_options[i];            for(var j=0; j<el_options[i].length; j++){                //out_put_s = out_put_s+el_options[i][j]+", ";            }            out_put_s = out_put_s +"; ";        }        //alert(out_put_s);        //start model creator with el_options        var el_models = model_creator_start(el_options);        //map el_models on the option_list        //use variations and create variations for each existing model        option_list = map_el_models(el_models,models);        var out_put_string ="";        for(var i=0; i<option_list.length; i++){            out_put_string = out_put_string +"Model "+i+": ";            for(var j=0; j<option_list[i].rows.length; j++){                for(var k=0; k<option_list[i].rows[j].length; k++){                    out_put_string = out_put_string + "F "+option_list[i].rows[j][k].type + " d_opt "                    + option_list[i].rows[j][k].d_options+", ";                }            }            out_put_string=out_put_string+"; ";        }        //alert(out_put_string);        return option_list;    }    function map_el_models(el_models,models){        var values = new Array();        var o_list = new Array();        var o_counter = 0;        for(var i=0; i<el_models.length; i++){            //save element values in element array            values[i] = el_models[i].split("+");            //map element values on the models and create new option            for(var j=0; j<models.length; j++){                o_list[o_counter]=clone(models[j]);                o_list[o_counter].d_options = values[i];                for(var k=0; k<models[j].rows.length; k++){                    for(var l=0; l<models[j].rows[k].length; l++){                        //map new values on the elements                        o_list[o_counter].grasp = impl_db.grasp;                        o_list[o_counter].material = impl_db.material;                        o_list[o_counter].rows[k][l].d_options = values[i][o_list[o_counter].rows[k][l].type];                    }                }                o_counter++;                //create a loop for each material                /*for(var h=0; h<expl_db.materials.length; h++){ //new code                    //check if element contains grasps then do grasp loop otherwise set grasp null                    if(!check_values_array(values[i])){                        //make one iteration with grasp = null                        o_list[o_counter]=clone(models[j]);                        o_list[o_counter].grasp = "no Grasp";                        o_list[o_counter].d_options = values[i];                        o_list[o_counter].material = expl_db.materials[h];//new code                        //save d_options for each function                        for(var k=0; k<models[j].rows.length; k++){                            for(var l=0; l<models[j].rows[k].length; l++){                                //map new values on the elements                                o_list[o_counter].rows[k][l].d_options = values[i][o_list[o_counter].rows[k][l].type];                            }                        }                        o_counter++;                    }else{                        //make grasp.length iterations with grasp = grasp[i]                        for(var g=0; g<expl_db.grasps.length; g++){                            o_list[o_counter]=clone(models[j]);                            o_list[o_counter].grasp = expl_db.grasps[g];                            o_list[o_counter].d_options = values[i];                            o_list[o_counter].material = expl_db.materials[h];//new code                            for(var k=0; k<models[j].rows.length; k++){                                for(var l=0; l<models[j].rows[k].length; l++){                                    //map new values on the elements                                    o_list[o_counter].rows[k][l].d_options = values[i][o_list[o_counter].rows[k][l].type];                                }                            }                            o_counter++;                        }                    }                }//new code*/            }        }        return o_list;    }    function model_creator_start(el_option){        //create new empty array for options        var array = new Array();        //create empty string        var string = "";        model_creator(array,string,el_option,0);        return array;    }    function model_creator(array,string,el_option,step){        //alert("model_creator start "+el_option);        if(step < el_option.length-1){            //if step is not last one, create new string with old one and value of a new one            if(el_option[step]==-1){                var string_s = string+"-1+";                model_creator(array,string_s,el_option,step+1);            }else{                for(var i=0; i<el_option[step].length; i++){                    var string_s = string+el_option[step][i]+"+";                    model_creator(array,string_s,el_option,step+1);                }            }        }else{            //if step is last step then finish string with last element and write it in the return array            if(el_option[step]==-1){                array[array.length]=string+el_option[step];            }else{                for(var i=0; i<el_option[step].length; i++){                    array[array.length]=string+el_option[step][i];                }            }        }    }    function check_values_array(values){        //return values[2]!="-1" || values[3]!="-1" || values[4]!="-1" || values[5]!="-1" ;        /*for(var i=5; i<values.length; i++){            if(values[i]!="-1"){                return true;            }        }        if(values[0] == "2"||values[1]=="2"){            return true;        }*/        if(values[0]!="-1"){            return true;        }        for(var i=3; i<values.length; i++){            if(values[i]!="-1"){                return true;            }        }        if(values[1] == "2"||values[2]=="2"){            return true;        }        return false;    }}
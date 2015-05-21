/**
 * Created by Martin on 14.03.2015.
 */

function Explicit_Database(){

    this.height;
    this.width;
    this.depth;
    this.num_functions = 7;
    this.num_true_functions = 2;
    this.num_phys_cons = 5;
    this.num_purp_func_match_functions = 7;

    this.functions = new Array(this.num_functions);
    this.purp_functions = new Array(this.num_purp_func_match_functions);

    this.start_handle = "Handle 1";
    this.start_material = "images/Alder.jpg";
    this.materials = new Array("images/Alder.jpg");

    this.p_cons = initialize_p_cons(this.num_phys_cons);
    this.f_cons = initialize_f_cons(this.num_functions);
    this.d_option_cons = initialize_d_option_cons();
    this.comp_list = initialize_comp_list(7);
    this.purp_func_match = initialize_purp_func_match(this.num_purp_func_match_functions);

    this.filled_purp_func_match;

    this.set_d_option_cons = function(values){

        impl_db.d_options = null;

        var v_counter = 0;

        for(var i=0; i<this.d_option_cons.length; i++){

            if(v_counter<values.length && i == values[v_counter].value-1){
                this.d_option_cons[i]= true;
                v_counter++;
            }else{
                this.d_option_cons[i]= false;
            }
        }

    }

    this.calculate_hierarchical_options = function(){
    }


    function initialize_purp_func_match(num){
        var ret_ar = new Array(num);

        //Wardrobe
        ret_ar[0]= [["Jackets"],[],["Underwear"],["Cloths"],[],[],[]];
        //CD,DVD shelf
        ret_ar[1]= [[],["CD"],["DVD"],[],[],[],[]];
        //Book shelf
        ret_ar[2]= [[],[],["Books"],["Books"],[],[],[]];
        //Shoe cabinet
        ret_ar[3]= [[],[],["Shoes"],[],[],[],["Shoes"]];
        //Tool cupboard
        ret_ar[4]= [[],[],[],[],["Tools"],["Tools"],[]];
        //China cabinet
        ret_ar[5]= [[],[],["Dishes"],[],[],[],[]];
        //Kitchen cupboard
        ret_ar[6]= [[],[],["Dishes"],[],["Food"],[],[]];

        return ret_ar;
    }

    function initialize_comp_list(num){

        var comp_funcs = [[true,true,true,false,false,false,false],
                         [true,false,true,true,false,false,false],
                         [false,true,false,true,false,false,false],
                         [false,false,false,false,false,true,true],
                         [false,false,false,false,true,true,false]];

        return comp_funcs;
    }

    function initialize_p_cons(num){

        var p_cons = new Array(num);
        //1 part
        p_cons[0]= new Physical_Constraint(1,30,80);
        //2 parts
        p_cons[1]= new Physical_Constraint(2,60,180);
        //3 parts
        p_cons[2]= new Physical_Constraint(3,90,270);
        //4 parts
        p_cons[3]= new Physical_Constraint(4,140,320);
        //5 parts
        p_cons[4]= new Physical_Constraint(5,180,320);

        return p_cons;
    }

    function initialize_f_cons(num){

        var f_cons = new Array(num);

        //Jackets
        f_cons[0]= new Functional_Constraint(2,110,max_height,new Array(false,false,false,true,true,true),0);
        //Small CD
        f_cons[1]= new Functional_Constraint(0,20,30,new Array(true,false,true,false,false,false),1);
        //Small-Medium
        f_cons[2]= new Functional_Constraint(1,30,45,new Array(true,true,false,false,false,false),2);
        //Medium
        f_cons[3]= new Functional_Constraint(3,45,60,new Array(false,true,true,true,true,true),3);
        //Medium-Large
        f_cons[4]= new Functional_Constraint(4,60,80,new Array(false,true,true,true,true,true),4);
        //Large
        f_cons[5]= new Functional_Constraint(5,80,max_height,new Array(false,true,true,true,true,true),5);
        //Shoes
        f_cons[6]= new Functional_Constraint(6,60,80,new Array(false,true,true,true,true,true),6);

        return f_cons;
    }

    function initialize_d_option_cons(){

        //nothing,drawer behind door, drawer,
        var array = new Array(true,true,true,true,true,true);

        return array;
    }

    this.fill_functions = function(input_File){

        //this.functions = input_File.functions;
        this.height = input_File.height;
        this.width = input_File.width;
        this.depth = input_File.depth;
    }


    this.get_possible_parts = function(){
        var ret_ar = new Array();

        for(var i=0; i<this.p_cons.length; i++){
            if(this.width >= this.p_cons[i].minWidth && this.width <= this.p_cons[i].maxWidth){
                ret_ar[ret_ar.length]= this.p_cons[i].ID;
            }
        }
        //alert("erstes El "+ret_ar[0]+" letztes Element "+ret_ar[ret_ar.length-1]);
        return ret_ar;
    }

    this.function_check = function(){


    }
}
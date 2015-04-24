/**
 * Created by Martin on 14.03.2015.
 */

function Explicit_Database(){

    this.height;
    this.width;
    this.depth;
    this.num_functions = 7;
    this.num_phys_cons = 5;
    //this.comp_func_num = 4;

    this.functions = new Array(this.num_functions);
    this.purp_functions = new Array(7);
    this.d_option_cons = [true,true,true,true,true,true];
    //this.grasps = new Array("Grasp 1","Grasp 2","Grasp 3");
    this.start_handle = "Handle 1";
    this.start_material = "images/Alder.jpg";
    this.materials = new Array("images/Alder.jpg");

    this.p_cons = initialize_p_cons(this.num_phys_cons);
    this.f_cons = initialize_f_cons(this.num_functions);
    this.d_option_cons = initialize_d_option_cons();
    this.comp_list = initialize_comp_list();

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

    function initialize_comp_list(num){

        var comp_funcs = [[true,true,true,true,false,false,false],
                         [false,false,false,false,false,true,true],
                         [false,false,false,true,true,false,false],
                         [false,false,false,false,true,false,true]];

        return comp_funcs;
    }

    function initialize_p_cons(num){

        var p_cons = new Array(num);
        //1 part
        p_cons[0]= new Physical_Constraint(1,30,90);
        //2 parts
        p_cons[1]= new Physical_Constraint(2,60,180);
        //3 parts
        p_cons[2]= new Physical_Constraint(3,90,270);
        //4 parts
        p_cons[3]= new Physical_Constraint(4,120,320);
        //5 parts
        p_cons[4]= new Physical_Constraint(5,150,320);
        //6 parts
        /*p_cons[5]= new Physical_Constraint(6,180,320);
        //7 parts
        p_cons[6]= new Physical_Constraint(7,210,320);
        //8 parts
        p_cons[7]= new Physical_Constraint(8,240,320);
        //9 parts
        p_cons[8]= new Physical_Constraint(9,270,320);*/

        return p_cons;
    }

    function initialize_f_cons(num){

        var f_cons = new Array(num);
        /*
        //CD,DVD
        f_cons[0]= new Functional_Constraint(0,20,30,new Array(true,true,true,false,false,false),1);
        //books,documents
        f_cons[1]= new Functional_Constraint(1,30,40,new Array(true,false,false,false,false,false),2);
        //Jackets,Shirts
        f_cons[2]= new Functional_Constraint(2,130,max_height,new Array(false,false,false,true,true,true),3);
        //Food
        f_cons[3]= new Functional_Constraint(3,40,60,new Array(false,false,true,true,true,true),5);
        //T-Shirts,pants
        f_cons[4]= new Functional_Constraint(4,25,45,new Array(false,true,true,true,true,true),4);
        //dishes
        f_cons[5]= new Functional_Constraint(5,30,50,new Array(false,false,false,true,true,true),6);
        //small stuff
        f_cons[6]= new Functional_Constraint(6,25,50,new Array(false,true,true,true,true,true),8);
        //shoes
        f_cons[7]= new Functional_Constraint(7,20,30,new Array(false,false,false,true,true,true),11);
        //underwear,socks
        f_cons[8]= new Functional_Constraint(8,25,30,new Array(false,true,true,true,true,true),7);
        //medium stuff
        f_cons[9]= new Functional_Constraint(9,50,80,new Array(false,true,true,true,true,true),9);
        //large stuff
        f_cons[10]= new Functional_Constraint(10,90,140,new Array(false,true,true,true,true,true),10);
        */

        //G1,G2,G3,G4,G5                    (nothing,drawer behind door,drawer,door single,door double,door slide)
        //CD,DVD 1: high level
        /*f_cons[0]= new Functional_Constraint(0,20,30,new Array(true,false,true,false,false,false),1);
        //CD,DVD 2: low level
        f_cons[1]= new Functional_Constraint(1,20,30,new Array(true,false,true,false,false,false),2);

        //Books 1: high level
        f_cons[2]= new Functional_Constraint(2,30,40,new Array(true,false,false,false,false,false),3);
        //Books 2: medium level
        f_cons[3]= new Functional_Constraint(3,30,40,new Array(true,false,false,false,false,false),4);
        //Books 3: low level
        f_cons[4]= new Functional_Constraint(4,30,40,new Array(true,false,false,false,false,false),5);

        //Jackets 1: high level
        f_cons[5]= new Functional_Constraint(5,110,max_height,new Array(false,false,false,true,true,true),6);
        //Jackets 2: medium level
        f_cons[6]= new Functional_Constraint(6,150,max_height,new Array(false,false,false,true,true,true),7);

        //Small Stuff 1: high level
        f_cons[7]= new Functional_Constraint(7,25,40,new Array(false,true,true,true,true,true),8);
        //Small Stuff 2: medium level
        f_cons[8]= new Functional_Constraint(8,25,40,new Array(false,true,true,true,true,true),11);
        //Small Stuff 3: low level
        f_cons[9]= new Functional_Constraint(9,25,40,new Array(false,true,true,true,true,true),14);

        //Medium Stuff 1: high level
        f_cons[10]= new Functional_Constraint(10,40,60,new Array(false,true,true,true,true,true),9);
        //Medium Stuff 2: medium level
        f_cons[11]= new Functional_Constraint(11,40,60,new Array(false,true,true,true,true,true),12);
        //Medium Stuff 3: low level
        f_cons[12]= new Functional_Constraint(12,40,60,new Array(false,true,true,true,true,true),15);

        //Large Stuff 1: high level
        f_cons[13]= new Functional_Constraint(13,80,120,new Array(false,true,true,true,true,true),10);
        //Large Stuff 2: medium level
        f_cons[14]= new Functional_Constraint(14,80,120,new Array(false,true,true,true,true,true),13);
        //Large Stuff 3: low level
        f_cons[15]= new Functional_Constraint(15,80,120,new Array(false,true,true,true,true,true),16);

        //Shoes
        f_cons[16]= new Functional_Constraint(16,35,50,new Array(false,false,false,true,true,true),17);
        */

        //Jackets
        f_cons[0]= new Functional_Constraint(2,110,max_height,new Array(false,false,false,true,true,true),0);
        //Small CD
        f_cons[1]= new Functional_Constraint(0,20,30,new Array(true,false,true,false,false,false),1);
        //Small-Medium
        f_cons[2]= new Functional_Constraint(1,30,45,new Array(true,false,false,false,false,false),2);
        //Medium
        f_cons[3]= new Functional_Constraint(3,45,60,new Array(false,true,true,true,true,true),3);
        //Medium-Large
        f_cons[4]= new Functional_Constraint(3,60,80,new Array(false,true,true,true,true,true),4);
        //Large
        f_cons[5]= new Functional_Constraint(3,80,max_height,new Array(false,true,true,true,true,true),5);
        //Shoes
        f_cons[6]= new Functional_Constraint(3,60,80,new Array(false,true,true,true,true,true),6);

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
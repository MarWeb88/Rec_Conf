/**
 * Created by Martin on 14.03.2015.
 */

function Explicit_Database(){

    this.height;
    this.width;
    this.depth;
    this.functions;
    this.num_functions = 9;
    this.d_option_cons;

    this.p_cons = initialize_p_cons(this.num_functions);
    this.f_cons = initialize_f_cons(this.num_functions);
    this.d_option_cons = initialize_d_option_cons();

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
        p_cons[5]= new Physical_Constraint(6,180,320);
        //7 parts
        p_cons[6]= new Physical_Constraint(7,210,320);
        //8 parts
        p_cons[7]= new Physical_Constraint(8,240,320);
        //9 parts
        p_cons[8]= new Physical_Constraint(9,270,320);

        return p_cons;
    }

    function initialize_f_cons(num){

        var f_cons = new Array(num);

        //CD,DVD
        f_cons[0]= new Functional_Constraint(0,20,30,new Array(true,false,true),1);
        //books,documents
        f_cons[1]= new Functional_Constraint(1,30,40,new Array(true,false,false),2);
        //Jackets,Shirts
        f_cons[2]= new Functional_Constraint(2,130,max_height,new Array(false,true,false),3);
        //Food
        f_cons[3]= new Functional_Constraint(3,130,50,new Array(false,false,false),5);
        //T-Shirts,pants
        f_cons[4]= new Functional_Constraint(4,25,45,new Array(false,true,false),4);
        //dishes
        f_cons[5]= new Functional_Constraint(5,30,50,new Array(false,true,false),6);
        //stuff
        f_cons[6]= new Functional_Constraint(6,30,50,new Array(false,true,true),8);
        //shoes
        f_cons[7]= new Functional_Constraint(7,20,30,new Array(false,true,false),9);
        //underwear,socks
        f_cons[8]= new Functional_Constraint(8,25,30,new Array(false,true,true),7);

        return f_cons;
    }

    function initialize_d_option_cons(){

        var array = new Array(true,true,true);

        return array;
    }

    this.fill_functions = function(input_File){

        this.functions = input_File.functions;
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
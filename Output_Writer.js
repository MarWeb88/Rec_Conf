/**
 * Created by Martin on 28.02.2015.
 */

function Output_Writer(){

    var number_elementrows = 3;

    this.generate_info_icon = function(option){

        var element = document.getElementById("information_box_icon");
        element.className = "option_list_element";
        element.style.height = "132.5px";
        element.style.width = "132.5px";
        document.getElementById("information_box_icon_frame").style.display="inline";

        generate_icon(element,option,2);

        var element2 = document.getElementById("information_box_out");

        generate_interaction_functions(element2,option);
    }

    this.delete_info_icon = function(){
        document.getElementById("information_box_icon_frame").style.display="none";
    }

    this.writeOptionlist = function(option_list){

        clear_options();

        if(option_list.length == 0){
            alert("No suitable solution was found!");
        }

        for(var i=0;i<option_list.length;i++){

            //define the number of visualized options for each row
            var element_row = i%number_elementrows;
            var output_container = document.getElementById("option_row"+element_row);

            //create a new option and define attributes
            var list_element = document.createElement("div");
            list_element.className = "option_list_element";
            list_element.style.height = "155px";
            list_element.style.width = "176.6667px";

            generate_icon(list_element,option_list[i],1);

            //list_element.innerHTML = option_list[i].description;
            //list_element.setAttribute('onclick','obj_visualizer.call_vis('+option_list[i].ID+')');
            list_element.setAttribute('onclick','obj_visualizer.call_vis('+option_list[i].ID+')');
            output_container.appendChild(list_element);
        }

        document.getElementById("option_output").className="option_output option_output_full";
    }

    function generate_interaction_functions(element,option){

        var ret_val="Select the function for which you want more recommendations: <form id='input_radio' onchange='impl_db.detect_checked_interaction_button()'>";
        for(var i=0; i<option.weightings.length; i++){
            if(option.weightings[i]!=0){
               ret_val=ret_val+"<input type='radio' name='group1' value='"+get_Function_Name(i)+"'>"+get_Function_Name(i);
            }
        }
        ret_val=ret_val+"<input type='radio' name='group1' value='Nothing'> Nothing</form>";

        ret_val=ret_val+"<br>Select the option for which you want more recommendations: <form id='input_radio2' " +
        "onchange='impl_db.detect_checked_interaction_button2()'>"

        ret_val=ret_val +
        "<input type='radio' name='group2' value='grasp'> Grasp " +
        "<input type='radio' name='group2' value='Material'> Material" +
        "<input type='radio' name='group2' value='Nothing'> Nothing " +
        "</form>";

        element.innerHTML=ret_val;


    }

    this.delete_interaction_functions =function(){
        document.getElementById("information_box_out").innerHTML="";
    }

    this.delete_interaction_funtions_values = function(){

        var elements = document.getElementsByName("group1");

        for(var i=0; i<elements.length; i++){
            elements[i].checked = false;
        }

        elements = document.getElementsByName("group2");

        for(var i=0; i<elements.length; i++){
            elements[i].checked = false;
        }
    }

    function clear_options(){
        //deletes all existing options

        for(var i= 0; i<number_elementrows;i++){
            var output_container_row = document.getElementById("option_row"+i);
            output_container_row.innerHTML="";
        }
        document.getElementById("option_output").className="option_output";
    }

    function generate_icon(parent,option,variant){

        //create inner div as carcass
        var front = document.createElement("div");
        front.className="icon";

        //create height and width using information from the parent Element

        var m_height = parseFloat(parseFloat(parent.style.height)-10);
        var m_width = parseFloat(parseFloat(parent.style.width)-10);

        //set_border_width
        var el_border_width = get_icon_value(border_width_real,1,m_width);
        var el_border_height = get_icon_value(border_width_real,2,m_height);

        //width and height position in the front matrix
        var width_start = 5;
        var height_start = 5;

        //calculate row width
        var el_width_real = (expl_db.width-(option.row_num-1)*border_width_real)/option.row_num;
        var el_width = get_icon_value(el_width_real,1,m_width);

        //iterate over the different rows
        for(var i=0; i<option.row_num; i++){
            //iterate over the different elements in a row
            for(var j=0; j<option.rows[i].length; j++){

                //create new element
                var element = document.createElement("div");

                //calculate el_height
                var el_height = get_icon_value(option.rows[i][j].height,2,m_height);

                //set Element attributes
                element.style.position = "absolute";
                element.style.left = width_start+"px";
                element.style.top = height_start+"px";
                element.style.width = el_width+"px";
                element.style.height = el_height+"px";
                element.style.backgroundColor = "white";
                element.style.fontSize="9px";
                element.innerHTML = get_Function_Name(option.rows[i][j].type)+
                get_Option_Name(option.rows[i][j].d_options)+get_grasp_Name(option.grasp,option.rows[i][j].type)+
                get_Material_Name(option.material);

                element.style.textAlign="center";

                /*if(variant == 2){
                    element.setAttribute('onclick','impl_db.set_interaction_function('+option.rows[i][j].type +')');
                }*/

                //append new Element
                front.appendChild(element);

                height_start = height_start + el_height + el_border_height;

            }
            width_start = width_start+ el_width + el_border_width;
            height_start = 5;
        }
        parent.appendChild(front);
    }

    function get_icon_value(val,variant,scale){
        //transforms a real value in a icon value
        if(variant == 1){ //width
            return parseFloat(parseFloat(val)/parseFloat(expl_db.width)*parseFloat(scale));
        }else{//height
            return parseFloat(parseFloat(val)/parseFloat(expl_db.height)*parseFloat(scale));
        }
    }

    this.get_F_Name = function(type){
        return get_Function_Name(type)+" Function";
    };

    this.get_F_Number = function(name){
        return get_Function_Number(name);
    }

    function get_Function_Name(type){
        switch (type){

            /*case 0:return "CD/DVD 1"

            case 1:return "CD/DVD 2"

            case 2:return "Books 1"

            case 3:return "Books 2"

            case 4:return "Books 3"

            case 5:return "Jackets 1"

            case 6:return "Jackets 2"

            case 7:return "Small Stuff 1"

            case 8:return "Small Stuff 2"

            case 9:return "Small Stuff 3"

            case 10:return "Medium Stuff 1"

            case 11:return "Medium Stuff 2"

            case 12:return "Medium Stuff 3"

            case 13:return "Large Stuff 1"

            case 14:return "Large Stuff 2"

            case 15:return "Large Stuff 3"

            case 16:return "Shoes"*/

            case 0:return "Jackets"

            case 1:return "Small(CD)"

            case 2:return "Small/Med"

            case 3:return "Medium"

            case 4:return "Med/Large"

            case 5:return "Large"

            case 6:return "Shoes"
        }
    }

    function get_Option_Name(val){

        switch(val){
            case "0": return "(n)"

            case "1": return "(dr.b)"

            case "2": return "(dr)"

            case "3": return "(d.s)"

            case "4": return "(d.d)"

            case "5": return "(d.sl)"
        }
    }

    function get_grasp_Name(val,type){

        if(type == 1|| type == 2){
            return "(0)"
        }else{

            switch(val){
                case "no Grasp": return "(0)"

                case "Grasp 1": return "(1)"

                case "Grasp 2": return "(2)"

                case "Grasp 3": return "(3)"

                case "Grasp 4": return "(4)"

                case "Grasp 5": return "(5)"

                case "Grasp 6": return "(6)"
            }
        }
    }

    function get_Function_Number(name){
        switch(name){
            case "CD/DVD 1": return 0

            case "CD/DVD 2": return 1

            case "Books 1": return 2

            case "Books 2": return 3

            case "Books 3": return 4

            case "Jackets 1": return 5

            case "Jackets 2": return 6

            case "Small Stuff 1": return 7

            case "Small Stuff 2": return 8

            case "Small Stuff 3": return 9

            case "Medium Stuff 1": return 10

            case "Medium Stuff 2": return 11

            case "Medium Stuff 3": return 12

            case "Large Stuff 1": return 13

            case "Large Stuff 2": return 14

            case "Large Stuff 3": return 15

            case "Shoes": return 16
        }
    }

    function get_Material_Name(name){

        switch(name){
            case "images/erle.jpg": return "(E)"

            case "images/wood5.jpg": return "(W)"

            case "images/mahagoni.jpg": return "(M)"

            case "images/apfel.jpg": return "(A)"

            case "images/Buche.jpg": return "(B)"

            case "images/fichte.jpg": return "(F)"

            case "images/kirsche.jpg": return "(K)"
        }
    }

    this.get_Material_FullName = function(src){

        var ar1 = src.split("/");
        ar1 = ar1[1].split(".");

        return ar1[0];
    }

    this.get_Weighting_Description = function(values){

        var weighting_out = "Weighting: ";

        for(var i=0; i<values.length; i++){

            if(values[i]!= 0){
                weighting_out += values[i]+" x "+get_Function_Name(i)+"; ";
            }
        }
        return weighting_out;
    }
}
/**
 * Created by Martin on 28.02.2015.
 */

function Output_Writer(){

    var number_elementrows = 4;

    this.generate_info_icon = function(option){

        var element = document.getElementById("information_box_icon");
        element.className = "option_list_element";
        element.style.height = "132.5px";
        element.style.width = "132.5px";
        document.getElementById("information_box_icon_frame").style.display="inline";

        generate_icon(element,option);
    }

    this.delete_info_icon = function(){
        document.getElementById("information_box_icon_frame").style.display="none";
    }

    this.writeOptionlist = function(option_list){

        //alert("optionlist start");
        clear_options();

        for(var i=0;i<option_list.length;i++){

            //define the number of visualized options for each row
            var element_row = i%number_elementrows;
            var output_container = document.getElementById("option_row"+element_row);

            //create a new option and define attributes
            var list_element = document.createElement("div");
            list_element.className = "option_list_element";
            list_element.style.height = "132.5px";
            list_element.style.width = "132.5px";

            generate_icon(list_element,option_list[i]);

            //list_element.innerHTML = option_list[i].description;
            //list_element.setAttribute('onclick','obj_visualizer.call_vis('+option_list[i].ID+')');
            list_element.setAttribute('onclick','obj_visualizer.call_vis('+option_list[i].ID+')');
            output_container.appendChild(list_element);
        }

        document.getElementById("option_output").className="option_output option_output_full";
    }

    function clear_options(){
        //deletes all existing options

        for(var i= 0; i<number_elementrows;i++){
            var output_container_row = document.getElementById("option_row"+i);
            output_container_row.innerHTML="";
        }
        document.getElementById("option_output").className="option_output";
    }

    function generate_icon(parent,option){

        //alert("generate icon start");
        //create inner div as carcass
        var front = document.createElement("div");
        front.className="icon";

        //create height and width using information from the parent Element

        var m_height = parseFloat(132.5-10);
        var m_width = parseFloat(parseFloat(parent.style.width)-10);

        //set_border_width
        var el_border_width = get_icon_value(border_width_real,1,m_width);
        var el_border_height = get_icon_value(border_width_real,2,m_height);

        //alert(el_border_width+"  "+el_border_height);

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
                element.innerHTML = get_Function_Name(option.rows[i][j].type)+get_Option_Name(option.rows[i][j].d_options);
                element.style.textAlign="center";


                //alert(width_start+"  "+height_start+"  "+el_width+"  "+el_height);

                //append new Element
                front.appendChild(element);

                height_start = height_start + el_height + el_border_height;

            }
            width_start = width_start+ el_width + el_border_width;
            height_start = 5;
        }

        parent.appendChild(front);
        //alert("generate icon end");
    }

    function get_icon_value(val,variant,scale){
        //transforms a real value in a icon value
        if(variant == 1){ //width
            return parseFloat(parseFloat(val)/parseFloat(expl_db.width)*parseFloat(scale));
        }else{//height
            return parseFloat(parseFloat(val)/parseFloat(expl_db.height)*parseFloat(scale));
        }
    }

    function get_Function_Name(type){
        switch (type){
            case 0:return "CD/DVD"

            case 1:return "Books"

            case 2:return "Jackets/Shirts"

            case 3:return "Flexible"

            case 4:return "T-Shirts,pants"

            case 5:return "Dishes"

            case 6:return "Food,Stuff"

            case 7:return "Shoes"

            case 8:return "Underwear"
        }
    }

    function get_Option_Name(val){

        switch(val){
            case "0": return "(nd)"

            case "1": return "(d)"

            case "2": return "(dr)"
        }
    }
}
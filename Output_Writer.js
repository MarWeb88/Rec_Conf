/**
 * Created by Martin on 28.02.2015.
 */

function Output_Writer(){

    var number_elementrows = 3;

    this.clear_output = function(){
        clear_options();
    }

    this.generate_info_icon = function(option){

        var element = document.getElementById("information_box_icon");
        element.className = "option_list_element";
        element.style.height = "132.5px";
        element.style.width = "132.5px";
        document.getElementById("information_box_icon_frame").style.display="inline";

        generate_icon(element,option,2);

        var element2 = document.getElementById("information_box_out");

        //generate_interaction_functions(element2,option);
    }

    this.delete_info_icon = function(){
        document.getElementById("information_box_icon_frame").style.display="none";
    }

    this.delete_options = function(){
        clear_options();
    }

    this.writeOptionlist = function(option_list){

        clear_options();
        var el = document.getElementById("option_row0");

        if(option_list.length == 0){
            el.style.width = "100%";
            el.innerHTML = "No suitable solution was found! Check if global Door Options are activated!";
        }else{
            el.style.width = "230px";
            el.innerHTML = "";
        }

        for(var i=0;i<option_list.length;i++){

            //define the number of visualized options for each row
            var element_row = i%number_elementrows;
            var output_container = document.getElementById("option_row"+element_row);

            //create a new option and define attributes
            var list_element = document.createElement("div");
            list_element.className = "option_list_element";
            list_element.style.height = "230px";
            list_element.style.width = "230px";

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

        /*ret_val=ret_val+"<br>Select the option for which you want more recommendations: <form id='input_radio2' " +
        "onchange='impl_db.detect_checked_interaction_button2()'>"

        ret_val=ret_val +
        "<input type='radio' name='group2' value='grasp'> Grasp " +
        "<input type='radio' name='group2' value='Material'> Material" +
        "<input type='radio' name='group2' value='Nothing'> Nothing " +
        "</form>";*/

        element.innerHTML=ret_val;


    }

    this.delete_interaction_functions =function(){
        //document.getElementById("information_box_out").innerHTML="";
    }

    this.generate_savepoint_icon = function(height,width){

        var element = document.createElement("div");
        element.className = "option_list_element";
        element.style.height = height+"px";
        element.style.width = width+"px";

        generate_icon(element,l_options[curr_model_ID],2);

        document.getElementById("history_s").appendChild(element);

        return element;
    }

    this.generate_2D_icon = function(height,width,option){

        var element = document.createElement("div");
        element.className = "option_list_element";
        element.style.left = "80px";
        element.style.top = "70px";
        element.style.height = height+"px";
        element.style.width = width+"px";
        element.id="2D_icon";

        generate_icon(element,option,2);

        var container = document.getElementById("2d_canvas");
        container.innerHTML="";
        container.appendChild(element);

        document.getElementById("information_box_out").style.display ="inline";

        return element;
    }

    /*this.resize_div = function(ID,height,width){
        var el = document.createElement("div");
        var old_el = document.getElementById(ID);

        var h_factor = parseFloat(height/parseFloat(old_el.style.height));
        var w_factor = parseFloat(width/parseFloat(old_el.style.width));

        alert(h_factor);

        resize_element(el.id,old_el.id,h_factor,w_factor);

        return el;
    }

    function resize_element(element_id,element_old_id,h_factor,w_factor){

        var element_old = document.getElementById(element_old_id);

        element.className = element_old.className;
        element.style.height = parseFloat(element_old.style.height)*parseFloat(h_factor)+"px";
        element.style.width = parseFloat(element_old.style.width)*parseFloat(w_factor)+"px";

        //alert(parseFloat(element_old.style.height)*h_factor+"  + "+parseFloat(element_old.style.width)*w_factor);
        alert(element.style.height+"  + "+element.style.width);
        alert()

        if(element_old.firstChild!=null && element_old.firstChild.tagName == "div"){
            alert("2");
            var child = element_old.firstChild;
            alert("3");
            while(child!=null){
                alert(h_factor+"  "+w_factor);
                var el = document.createElement("div");
                resize_element(el,child,h_factor,w_factor);
                child = child.nextSibling;
            }
            //alert("4");
        }
    }*/

    this.delete_interaction_funtions_values = function(){

        var elements = document.getElementsByName("group1");

        for(var i=0; i<elements.length; i++){
            elements[i].checked = false;
        }
        /*
        elements = document.getElementsByName("group2");

        for(var i=0; i<elements.length; i++){
            elements[i].checked = false;
        }*/
    }

    function clear_options(){
        //deletes all existing options

        for(var i= 0; i<number_elementrows;i++){
            var output_container_row = document.getElementById("option_row"+i);
            output_container_row.innerHTML="";
        }
        document.getElementById("option_output").className="option_output";
    }

    function manage_icon_number(position,array){

        //alert(array[position]+"   "+expl_db.filled_purp_func_match[position]);
        if(array[position]<expl_db.filled_purp_func_match[position].length-1){
            return array[position]+1;
        }else{
            return 0;
        }
    }

    function generate_icon(parent,option,variant){

        var pos_array = new Array(expl_db.num_purp_func_match_functions);
        for(var i=0; i<pos_array.length; i++){
            pos_array[i]=0;
        }
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

                if(impl_db.d_options_selector==null){
                    element.style.backgroundColor = "white";
                }else{
                    element.style.backgroundColor = get_Door_Color(option.rows[i][j].d_options);
                }
                element.style.backgroundImage = "url("+get_function_icon(expl_db.filled_purp_func_match
                    [option.rows[i][j].type][pos_array[option.rows[i][j].type]])+")";

                pos_array[option.rows[i][j].type]=manage_icon_number(option.rows[i][j].type,pos_array);

                element.style.backgroundSize = "contain";
                element.style.backgroundRepeat= "no-repeat";
                element.style.backgroundPosition = "center";

                element.style.fontSize="9px";
                /*element.innerHTML= expl_db.filled_purp_func_match[option.rows[i][j].type][pos_array[option.rows[i][j].type]];
                pos_array[option.rows[i][j].type]=manage_icon_number(option.rows[i][j].type,pos_array);*/

                /*element.innerHTML = get_Function_Name(option.rows[i][j].type)+
                get_Option_Name(option.rows[i][j].d_options);*/

                /*if(variant == 2){
                    element.innerHTML += get_grasp_Name(impl_db.grasp)+
                    get_Material_Name(impl_db.material);
                }*/

                element.style.textAlign="center";

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

    function get_function_icon(type){
        switch (type) {
            case "Jackets":return "images/icons/Jackets.png"

            case "CD/DVD":return "images/icons/CDs.png"

            case "Books":return "images/icons/Books.png"

            case "Underwear":return "images/icons/Underwear.png"

            case "Cloths":return "images/icons/Shirts.png"

            case "Shoes":return "images/icons/Shoes.png"

            case "Dishes":return "images/icons/Dishes.png"

            case "Tools":return "images/icons/Tools.png"
        }
    }

    function get_Function_Name(type){
        switch (type){

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

    function get_Door_Color(val){
        switch(val){
            case "0": return "white"

            case "1": return "#666633"

            case "2": return "#C0C0C0"

            case "3": return "#3399CC"

            case "4": return "#999966"

            case "5": return "#FF6600"
        }
    }

    function get_grasp_Name(val,type){

        switch(val){
            case "no Handle": return "(0)"

            case "Handle 1": return "(1)"

            case "Handle 2": return "(2)"

            case "Handle 3": return "(3)"

            case "Handle 4": return "(4)"

            case "Handle 5": return "(5)"

            case "Handle 6": return "(6)"
        }
    }

    function get_Function_Number(name){
        switch(name){
            case "Jackets": return 0

            case "Small(CD)": return 1

            case "Small/Med": return 2

            case "Medium": return 3

            case "Med/Large": return 4

            case "Large": return 5

            case "Shoes": return 6
        }
    }

    function get_Material_Name(name){

        switch(name){

            case "images/Alder.jpg": return "(Al)"

            case "images/Apple.jpg": return "(Ap)"

            case "images/Beech.jpg": return "(Be)"

            case "images/Birch.jpg": return "(Bi)"

            case "images/Cherry.jpg": return "(Ch)"

            case "images/Elm.jpg": return "(El)"

            case "images/Graphite Gray.jpg": return "(GG)"

            case "images/Mahogany.jpg": return "(Mh)"

            case "images/Maple.jpg": return "(Ma)"

            case "images/Oak.jpg": return "(Oa)"

            case "images/Plum.jpg": return "(Pl)"

            case "images/Spruce.jpg": return "(Sp)"

            case "images/Wenge.jpg": return "(We)"

            case "images/Wild Pear.jpg": return "(WP)"

            case "images/Zebrano.jpg": return "(Ze)"
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
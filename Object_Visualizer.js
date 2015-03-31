/**
 * Created by Martin on 01.03.2015.
 */

function Object_Visualizer(){

    this.call_vis = function(num){

        obj_visualizer.vis(data_obj_list[num].visualization);
    }
    this.vis = function(model_desc){

        //clear old model
        var vis_model = document.getElementById("container_left_in");
        vis_model.innerHTML ="";

        //divide front level in the correct number of parts
        var front = document.createElement("div");
        front.className="level1";

        var m_height = 300;
        var m_width = 600;

        var el_border_width = 5;
        var el_border_height = 5;
        
        var num_el_hz = parseInt(model_desc.num_hz);
        var num_el_vrt = parseInt(model_desc.num_vrt);

        var el_hz_width = (m_height-el_border_width*(num_el_hz-1))/num_el_hz;
        var el_vrt_width = (m_width-el_border_height*(num_el_vrt-1))/num_el_vrt;

        var width_start = 0;
        var height_start = 0;

        for(var i=0; i<num_el_vrt; i++){

            for(var j=0; j<num_el_hz; j++){
                //create new element
                var element = document.createElement("div");
                //alert(height_start+" i:  "+i+"  j: "+j);

                //set Element attributes
                element.style.position = "absolute";
                element.style.left = width_start+"px";
                element.style.top = height_start+"px";
                element.style.width = el_vrt_width+"px";
                element.style.height = el_hz_width+"px";
                element.style.backgroundColor = "white";

                //append new Element
                front.appendChild(element);

                height_start = height_start + el_hz_width + el_border_height;
            }
            width_start = width_start+ el_vrt_width + el_border_width;
            height_start = 0;
        }
        vis_model.appendChild(front);

        //build surrounding structure
        build_carcass();

        update_infobox(model.height,model.width,model.depth);
    }

    function build_carcass(){

        var vis_model = document.getElementById("container_left_in");

        var back = document.createElement("div");
        back.className = "backside";

        var left_side = document.createElement("div");
        left_side.className = "left_side";

        var right_side = document.createElement("div");
        right_side.className= "right_side";

        var top = document.createElement("div");
        top.className = "top";

        vis_model.appendChild(back);
        vis_model.appendChild(left_side);
        vis_model.appendChild(right_side);
        vis_model.appendChild(top);
    }

    function update_infobox(height,width,depth){

        var info_box = document.getElementById("information_box_out");

        info_box.innerHTML = "Height: "+ height +" cm  &nbsp;&nbsp;&nbsp;  Width: "+width+" cm  &nbsp;&nbsp;&nbsp;  Depth: "+ depth +" cm";
    }


}
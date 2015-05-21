<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html">
<head lang="en">

    <meta charset="UTF-8">
    <title></title>

    <link rel="stylesheet" href="Main.css" type="text/css">
    <link rel="stylesheet" type="text/css" href="js/dhtmlx.css">
    <link rel="stylesheet" type="text/css" href="js/jquery.multiselect.css">
    <!--<link rel="stylesheet" type="text/css" href="js/jquery-ui.theme.min.css">-->

    <script type="text/javascript" src="Main.js"></script>
    <script type="text/javascript" src="Model.js"></script>
    <script type="text/javascript" src="Input_Reader.js"></script>
    <script type="text/javascript" src="Output_Writer.js"></script>
    <script type="text/javascript" src="Input_File.js"></script>
    <script type="text/javascript" src="Explicit_Database.js"></script>
    <script type="text/javascript" src="Physical_Constraint.js"></script>
    <script type="text/javascript" src="Functional_Constraint.js"></script>
    <script type="text/javascript" src="Model_Calculator.js"></script>
    <script type="text/javascript" src="Probability_Calculator.js"></script>
    <script type="text/javascript" src="Implicit_Database.js"></script>
    <script type="text/javascript" src="Object_Visualizer.js"></script>
    <script type="text/javascript" src="Object_Visualizer2.js"></script>
    <script type="text/javascript" src="Element.js"></script>
    <script type="text/javascript" src="Weighting.js"></script>
    <script type="text/javascript" src="Build_List.js"></script>
    <script type="text/javascript" src="clickout.js"></script>
    <script type="text/javascript" src="js/dhtmlx.js"></script>
    <script type="text/javascript" src="Log_Manager.js"></script>
    <script type="text/javascript" src="Action_Event.js"></script>
    <script type="text/javascript" src="Model_Object.js"></script>
    <script type="text/javascript" src="History.js"></script>
    <script type="text/javascript" src="Model_Log_Object.js"></script>

    <script src="js/jquery-2.0.0.min.js"></script>
    <script src="js/html2canvas.js"></script>
    <script src="js/jquery-ui.min.js"></script>
    <script src="js/jquery.multiselect.js"></script>
    <script>JSCLASS_PATH ='js/JSClass/min'</script>
    <script src="/js/JSClass/min/loader-browser.js"></script>
    <script src="jsnlog.min.js"></script>
    <script src="js/json2.js"></script>
    <!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>-->
    <script src="js/three.js"></script>
    <script src="examples/js/Detector.js"></script>
    <script src="examples/js/renderers/CanvasRenderer.js"></script>
    <script src="examples/js/renderers/Projector.js"></script>
    <script src="js/OrbitControls.js"></script>
    <script src="js/threex.domevent.js"></script>

    <script src="Model_Reducer.js"></script>
    <script src="Bucket.js"></script>
    <script src="Pointer_Element.js"></script>

</head>
<body onload="main()">



<?php include "jsnlog.config.php";?>
<?php

    $id = uniqid();

    echo "
      <script type=\"text/javascript\"><!--
        var user_ID = \"".$id."\";
      </script>
    ";
?>
<div id="progress_bar_frame" class="progress_bar_frame">
<div id="progress_bar" class="progress_bar"> </div>
</div>
<div id="history_s" class="history_s"></div>
<div id="container_left" class="container_left">

    <div id="container_left_in" class="container_left_in">

        <div id="2d_canvas" style="display:none"></div>

        <div id="WebGLCanvas" class="webGl_canvas">

        </div>
        <select onchange="impl_db.set_grasp()" id="grasp_select" class="grasp_select">
            <option>Handle 1</option>
            <option>Handle 2</option>
            <option>Handle 3</option>
            <option>Handle 4</option>
            <option>Handle 5</option>
        </select>
        <select onchange="impl_db.set_material();input_reader.change_material_select()"
        id="material_select" class="material_select apple">
            <option class="Alder">Alder</option>
            <option class="Apple">Apple</option>
            <option class="Beech">Beech</option>
            <option class="Birch">Birch</option>
            <option class="Cherry">Cherry</option>
            <option class="Elm">Elm</option>
            <option class="Mahogany">Mahogany</option>
            <option class="Maple">Maple</option>
            <option class="Oak">Oak</option>
            <option class="Plum">Plum</option>
            <option class="Spruce">Spruce</option>
            <option class="Wenge">Wenge</option>
            <option class="Zebrano">Zebrano</option>
        </select>
        <div id="d_options_select" class="d_options_select">
            <select id="example" name="example" multiple="multiple">
            <option value="1">No Door</option>
            <option value="2">Drawer behind Door</option>
            <option value="3">Drawer</option>
            <option value="4">Single Door</option>
            <option value="5">Double Door</option>
            <option value="6">Slide Door</option>
        </select></div>
        <input type="button" name="change_button" value="Show 2D Model" id="change_button"
            class="change_button" onclick="input_reader.change_2d_3d_vis()">

        <input type="button" class="save_button invis" name="save_button" id="save_button"
                            value="Save Model" onclick="history_s.save_model()">

    </div>
    <div class="information_box">
        <!--<p><b>Dimensions:</b></p>-->
        <div class="information_box_out" id="information_box_out">
             <img id="handle_picture" src="images/handles/Handle 3.jpg" height="100" width="100">
             <br>

        </div>
    <form method="get" class="finish_button" name="form1" id="submitter"
         action="https://docs.google.com/forms/d/1Zr2YHkaJoJsLD_HgsU6mQgLbXcFEK2BAHN2e04SoYj0/viewform?entry.1314299856=121"
         onsubmit="" >

         <input name="entry.1314299856" id="hiddenfeld" type="hidden" value="<?php echo $id?>" />

         <input name="Finish_Button" type="submit" value="Finish Configuration" />
     </form>
        <div class="information_box_icon_frame" id="information_box_icon_frame">
            <!--<div class="information_box_icon" id="information_box_icon">

            </div>-->
            <div class="material_door_picture_frame frame_1">
                <div class="material_door_picture door_pic_1"> </div>
                <div class="material_door_name"> No door </div>
             </div>

             <div class="material_door_picture_frame frame_2">
                 <div class="material_door_picture door_pic_2"> </div>
                 <div class="material_door_name"> Drawer behind Door </div>
              </div>

             <div class="material_door_picture_frame frame_3">
                  <div class="material_door_picture door_pic_3"> </div>
                  <div class="material_door_name"> Drawer </div>
             </div>
             <div class="material_door_picture_frame frame_4">
                 <div class="material_door_picture door_pic_4"> </div>
                 <div class="material_door_name"> Single Door </div>
              </div>
              <div class="material_door_picture_frame frame_5">
                   <div class="material_door_picture door_pic_5"> </div>
                   <div class="material_door_name"> Double Door </div>
            </div>
              <div class="material_door_picture_frame frame_6">
                   <div class="material_door_picture door_pic_6"> </div>
                   <div class="material_door_name"> Slide Door </div>
            </div>
        </div>
    </div>

</div>

<div class="container_right">

    <div class="option_input">
        <b>Dimensions:</b>

        <p><div class="height_container" id="height_container">Height:
            <input id="height_input" name="height_input" type="text" size="3" maxlength="3">
        <div id="sliderObj_h"></div></div>

        <div class="width_container" id="width_container">Width:
            <input id="width_input" name="width_input" type="text" size="3" maxlength="3">
        <div id="sliderObj_w"></div></div>

        <div class="depth_container" id="depth_container">Depth:
            <input id="depth_input" name="depth_input" type="text" size="3" maxlength="3">
            <div id="sliderObj_d"></div></div>
        <div class="reset_button_invis" id="reset_button">
            <input type="button"
                   value="Reset" onclick="reset_all()">
        </div>

        <br><br>
        <b>Purpose:</b>

        <div class="option_purpose">

            <input type="checkbox" size="25" name="colors" id="function0"> Wardrobe <br>
            <input type="checkbox" size="25" name="colors" id="function1"> CD/DVD Shelf<br>
            <input type="checkbox" size="25" name="colors" id="function2"> Book Shelf <br>
            <input type="checkbox" size="25" name="colors" id="function3"> Shoe cabinet <br>
            <input type="checkbox" size="25" name="colors" id="function4"> Tool cabinet <br>
            <input type="checkbox" size="25" name="colors" id="function5"> China cabinet <br>
            <input type="checkbox" size="25" name="colors" id="function6"> Kitchen cabinet <br>

        </div>
        <!--<div class="start_button">-->
        <input type="button" name="start_button" value="Start" id="start_button" class="start_button"
        onclick="input_reader.translate_purp_func()">

        <input type="button" name="start_button" value="Start New" id="open_button_purpose"
        class="start_button invis" onclick="reset_all()">



        <!--<div>
            <input type="button" class="log_button" name="log_button" value="Log Out" onclick="log_manager.get_output()">
        </div>
        <div>
            <input type="button" class="save_button invis" name="save_button" id="save_button"
                   value="Save" onclick="history_s.save_model()">
        </div>-->
        <!--
        <div id="option_functions" class="option_functions_invis">

        <b>Functions:</b>
        <p>
        <input type="checkbox" size="25" name="colors" id="function0"> CD/DVD          <input type="checkbox" size="25" name="colors" id="function1"> Books      <input type="checkbox" name="colors" size="25" id="function2" checked> Jackets,Shirts <input type="checkbox" name="colors" size="25" id="function3"> Food

        <input type="checkbox" size="25" name="colors" id="function4" checked> T-shirts,pants  <input type="checkbox" size="25" name="colors" id="function5"> Dishes     <input type="checkbox" size="25" name="colors" id="function6"> Small Stuff     <input type="checkbox" size="25" name="colors" id="function7"> Shoes

        <input size="25" type="checkbox" name="colors" id="function8" checked> Underwear  <input type="checkbox" size="25" name="colors" id="function9"> Medium Stuff  <input type="checkbox" size="25" name="colors" id="function10"> Large Stuff
        </p>
        </div>
        -->
        <div id="implicid_data_out" class="implicid_data_out">

            <p><br><br><br><b>Select one or more purposes on <br>
            the left side and click "Start"</b></p>
            </div>

        <!--<div class="start_button">
        <input type="button" name="start_button" value="Start"
        onclick="start()">
        <input type="button" name="reset_button" value="Reset"
        onclick="impl_db.reset()">
        </div>-->

    </div>


    <div id="option_output" class="option_output">

        <div id="option_row0" class="option_row0" >

        </div>
        <div id="option_row1" class="option_row1" >

        </div>
        <div id="option_row2" class="option_row2" >

        </div>
        <div id="option_row3" class="option_row3" >

        </div>
    </div>

    <!--<input id="output_changer" class="output_changer" type="button" name="more" value="Full Mode"
           onclick="model_reducer.set_max_options()">-->
</div>

</body>
</html>
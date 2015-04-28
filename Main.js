/**
 * Created by Martin on 27.02.2015.
 */

/*var input_reader;
var output_writer;
var model;
var data_obj_list;
var number_data_obj;
var obj_visualizer;
 */

var min_height;
var max_height;
var min_width;
var max_width;
var min_depth;
var max_depth;

var border_width_real;

var l_options_full;
var l_options;
var input_reader;
var output_writer;
var model;
var obj_visualizer;
var model_calc;
var model_reducer;
var prop_calc;
var expl_db;
var impl_db;
var log_manager;
var history_s;

var mySlider_h;
var mySlider_w;
var mySlider_d;

var curr_model_ID;


function main(variant) {

     //initialize global dimension values
     min_height = 80;
     max_height = 220;

     min_width = 50;
     max_width = 200;

     min_depth = 30;
     max_depth = 60;

     border_width_real = 2;
     curr_model_ID = null;

    //initialize sliders
    initialize_sliders();

    //initialize Explicit_Database
    expl_db = new Explicit_Database();

    //initialize Implicit_Database
    impl_db = new Implicit_Database();

    //initialize Model_Calculator
    model_calc = new Model_Calculator();

    //initialize Model_Reducer
    model_reducer = new Model_Reducer();

    //initialize Probability_Calculator
    //prop_calc = new Probability_Calculator();

    //initialize Input_Reader
    input_reader = new Input_Reader();

    input_reader.vis_input(false);

    //initialize Output_Writer
    output_writer = new Output_Writer();

    //initialize Object_Visualizer
    obj_visualizer = new Object_Visualizer();

    if(variant !=0){
        //initialize Log_Manager
        log_manager = new Log_Manager();

        //initialize History
        history_s = new History();
    }
}

function start(variant){
    //read Input

    if(variant == 0) {
        //input_reader.translate_purp_func();
        var input = input_reader.readInput();


        if (input == false) {
            return false;
        } else {
            input_reader.vis_input(true);
            log_manager.add_action_Event("start new");
        }

        //Model Calculator
        expl_db.fill_functions(input);

        //start model calculator and create options
        l_options_full = model_calc.start_calc(input);
    }


    //reduce options
    l_options = model_reducer.reduce_options(l_options_full);

    /*var ausgabe = "Ausgabe ";
    for(var i=0; i<l_options.length; i++){
        ausgabe = ausgabe +l_options[i].ID+"; ";
    }*/

    //alert(ausgabe);
    //log_manager.add_action_Event("event");


    //present options to the user
    output_writer.writeOptionlist(l_options);

}

function reset_all(){
    impl_db.reset();

    output_writer.delete_options();

    input_reader.reset_input_fields();

    main(0);
}

function clone(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

function initialize_sliders(){

    mySlider_h = new dhtmlXSlider({
        parent: "sliderObj_h",
        size: 100,
        value: 150,
        step: 1,
        min: 100,
        max: 200,
        linkTo: "height_input"
    });

    mySlider_w = new dhtmlXSlider({
        parent: "sliderObj_w",
        size: 100,
        value: 100,
        step: 1,
        min: 50,
        max: 150,
        linkTo: "width_input"
    });

    mySlider_d = new dhtmlXSlider({
        parent: "sliderObj_d",
        size: 100,
        value: 50,
        step: 1,
        min: 30,
        max: 70,
        linkTo: "depth_input"
    });

    $(document).ready(function(){
        $("#example").multiselect({
            header: false,
            minWidth: 150,
            height: "auto",
            noneSelectedText: "Door Options",
            SelectedText: "Door Options",
            SelectedList: true,
            click: function(event, ui){
                // match with global constraints
                var out = $("#example").multiselect("getChecked");
                expl_db.set_d_option_cons(out);

                log_manager.add_action_Event("change global door options");

                start();
            }
        });
    });
    $("#example").multiselect("checkAll");
}

    //initialize Data Object List
    /*number_data_obj = 8;

    var data_obj_initializer = new Data_Object_Initializer();

    data_obj_list = data_obj_initializer.initialize(number_data_obj);
    obj_visualizer = new Object_Visualizer();

}

/*function add_Cube(){

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, 600/800, 0.1, 1000 );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( 600, 800 );
    renderer.setClearColor( "white" );
    document.getElementById("container_left").appendChild( renderer.domElement );

    var geometry = new THREE.BoxGeometry( 0.1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: "blue" } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    cube.rotation.y += 6;

    camera.position.z = 5;
    var render = function () {

        requestAnimationFrame( render );
        //cube.rotation.x += 0.1;
        //cube.rotation.y += 0.1;
        renderer.render(scene, camera);
    };
    render();
}

function start(){

    //read Input and make Input Object
    input_reader = new Input_Reader();
    var input = input_reader.readInput();

    if(input == false){
        return false;
    }
    //create model
    model = new Model(input.height,input.width,input.depth,0,data_obj_list[2]);

    //visualization Test
    obj_visualizer.vis(model.structure);

}

function update_options(){

    //compare model information with Data Object List
    var result_list = new Array();

    for(var i=0;i<number_data_obj;i++){
        if(data_obj_list[i].check_object(model.height,model.width,model.depth) == true){

            result_list[result_list.length] = data_obj_list[i];
        }
    }
    //show options
    output_writer = new Output_Writer();

    output_writer.writeOptionlist(result_list);

    //load models from SQl DB
    var number_models = 10;
    var reference_models = new Array(number_models);
    alert("u-4");
    */


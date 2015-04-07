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

function main() {

     //initialize global dimension values
     min_height = 100;
     max_height = 250;

     min_width = 50;
     max_width = 300;

     min_depth = 30;
     max_depth = 60;

     border_width_real = 2;

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

    //initialize Output_Writer
    output_writer = new Output_Writer();

    //initialize Object_Visualizer
    obj_visualizer = new Object_Visualizer();


}

function start(){
    //read Input

    //input_reader.translate_purp_func();
    var input = input_reader.readInput();

    if(input == false){
        return false;
    }
    //Model Calculator
    expl_db.fill_functions(input);

    //start model calculator and create options
    l_options= model_calc.start_calc(input);

    //reduce options
    //l_options = model_reducer.reduce_options(l_options);

    var ausgabe = "Ausgabe ";
    for(var i=0; i<l_options.length; i++){
        ausgabe = ausgabe +l_options[i].ID+"; ";
    }

    alert(ausgabe);

    //present options to the user
    output_writer.writeOptionlist(l_options);

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


/**
 * Created by Martin on 01.03.2015.
 */

function Object_Visualizer(){

    var scene;

    // Global camera object
    var camera;

    // Global mesh object of the pyramid
    var pyramidMesh;

    // Global mesh object of the cube
    var cubeMesh;

    // cupboard shelf length, breadth, height
    var width, height, depth, num_shelves, slab_height, z_pos, total_height;
    width = 1;
    depth = 0.5;
    height = 0.2;
    //num_shelves = 5;
    slab_height = 0.02;
    z_pos = 3;
    total_height = 2;


    var slabMaterial, meshSelected, curSelMeshId, curSelectedMeshMat;
    meshSelected = false;

    this.call_vis = function(ID,variant) {

        //alert("start with "+ID );

        curr_model_ID = ID;

        input_reader.vis_save_button(true);

        // Initialize the scene
        var option = l_options[ID];

        //alert("has "+option.row_num+" rows "+option.grasp);

        var vis_model = get_model_coordinates(option);

        initializeScene(vis_model[0],vis_model[1],impl_db.material);

        // Animate the scene
        animate();

        //set_implicid information

        if(variant!=0){
            impl_db.set_impl_information([option.row_num,option.weightings,option.start_row]);
            impl_db.d_options = option.d_options;

            impl_db.show_information();
        }

        //set info icon
        output_writer.generate_info_icon(option);

        //start calculation with updated information
        start();

        impl_db.set_interaction_function(null);

    }

    //Object Selection Component
    projector = new THREE.Projector();
    mouseVector = new THREE.Vector3();
    raycaster = new THREE.Raycaster();

    function get_model_coordinates(option){

        var ret_ar = new Array(2);

        ret_ar[0] = new Array(option.row_num);
        ret_ar[1] = new Array(option.row_num);

        //iterate over the different rows
        for(var i=0; i<option.row_num; i++) {
            //iterate over the different elements in a row
            ret_ar[0][i]= new Array(option.rows[i].length);
            ret_ar[1][i]= new Array(option.rows[i].length);

            for (var j = 0; j < option.rows[i].length; j++) {
                ret_ar[0][i][j]= get_Model_Value(option.rows[i][option.rows[i].length-(j+1)].height);
                ret_ar[1][i][j]= option.rows[i][option.rows[i].length-(j+1)].type;
            }
        }
        return ret_ar;
    }

    function get_Model_Value(val){
        return parseFloat(parseFloat(val)/parseFloat(expl_db.height)*total_height);
    }



    //Initialize scene
    function initializeScene(vis_model,functions,text_src) {
        // Check whether the browser supports WebGL. If so, instantiate the hardware accelerated
        // WebGL renderer. For antialiasing, we have to enable it. The canvas renderer uses
        // antialiasing by default.
        // The approach of multiplse renderers is quite nice, because your scene can also be
        // viewed in browsers, which don't support WebGL. The limitations of the canvas renderer
        // in contrast to the WebGL renderer will be explained in the tutorials, when there is a
        // difference.

        if (Detector.webgl) {
            renderer = new THREE.WebGLRenderer({antialias: true});

            // If its not supported, instantiate the canvas renderer to support all non WebGL browsers
        } else {
            renderer = new THREE.CanvasRenderer();
        }

        // Set the background color of the renderer to white, with full opacity
        renderer.setClearColor(0xffffff, 1);

        // Get the size of the inner window (content area) to create a full size renderer
        // Canvas size is fixed currently, needs to fetch it from div
        canvasWidth = 580;
        canvasHeight = 450;

        // Set the renderers size to the content areas size
        renderer.setSize(canvasWidth, canvasHeight);

        // Get the DIV element from the HTML document by its ID and append the renderers DOM
        // object to it
        var webGL_element = document.getElementById("WebGLCanvas");
        webGL_element.innerHTML = "";
        webGL_element.appendChild(renderer.domElement);

        // Create the scene, in which all objects are stored (e. g. camera, lights,
        // geometries, ...)
        scene = new THREE.Scene();

        // Now that we have a scene, we want to look into it. Therefore we need a camera.
        // Three.js offers three camera types:
        //  - PerspectiveCamera (perspective projection)
        //  - OrthographicCamera (parallel projection)
        //  - CombinedCamera (allows to switch between perspective / parallel projection
        //    during runtime)
        // In this example we create a perspective camera. Parameters for the perspective
        // camera are ...
        // ... field of view (FOV),
        // ... aspect ratio (usually set to the quotient of canvas width to canvas height)
        // ... near and
        // ... far.
        // Near and far define the cliping planes of the view frustum. Three.js provides an
        // example (http://mrdoob.github.com/three.js/examples/
        // -> canvas_camera_orthographic2.html), which allows to play around with these
        // parameters.
        // The camera is moved 10 units towards the z axis to allow looking to the center of
        // the scene.
        // After definition, the camera has to be added to the scene.
        camera = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 1, 100);
        camera.position.set(0, 0, 7);
        camera.lookAt(scene.position);
        scene.add(camera);

        //cube objects
        //cubes = new THREE.Object3D();
        //scene.add(cubes);

        // Load an image as texture

        var neheTexture = new THREE.ImageUtils.loadTexture(text_src);

        // Create a basic material with a texture. Activate the 'doubleSided'
        // attribute to force the rendering of both sides of each face (front and back).
        // This prevents the so called 'backface culling'. Usually, only the side is
        // rendered, whose normal vector points towards the camera. The other side is not
        // rendered (backface culling). But this performance optimization sometimes leads
        // to wholes in the surface. When this happens in your surface, simply set
        // 'doubleSided' to 'true'.

        var boxMaterial = new THREE.MeshBasicMaterial({
            map: neheTexture,
            side: THREE.DoubleSide
        });

        slabMaterial = new THREE.MeshBasicMaterial({
            map: neheTexture,
            side: THREE.DoubleSide,
            vertexColors: THREE.VertexColors,
            color: 0xA9A9A9
        });

        // Applying different materials to the faces is a more difficult than applying one
        // material to the whole geometry. We start with creating an array of
        // THREE.MeshBasicMaterial.

        // right, left, top, bottom, front, back
        // Define six colored materials
        var boxMaterials = [
            boxMaterial,
            boxMaterial,
            slabMaterial,
            slabMaterial,
            new THREE.MeshBasicMaterial({transparent:true, opacity:0, side: THREE.DoubleSide}),
            boxMaterial
        ];


        var slabMaterials = [
            slabMaterial,
            slabMaterial,
            slabMaterial,
            slabMaterial,
            slabMaterial,
            slabMaterial
        ];

        /*        slabMaterials = [
         new THREE.MeshBasicMaterial({color:0x733D1A, side: THREE.DoubleSide}),
         new THREE.MeshBasicMaterial({color:0x733D1A, side: THREE.DoubleSide}),
         new THREE.MeshBasicMaterial({color:0x733D1A, side: THREE.DoubleSide}),
         new THREE.MeshBasicMaterial({color:0x733D1A, side: THREE.DoubleSide}),
         new THREE.MeshBasicMaterial({color:0x733D1A, side: THREE.DoubleSide}),
         new THREE.MeshBasicMaterial({color:0x733D1A, side: THREE.DoubleSide})
         ];*/


        // Create a MeshFaceMaterial, which allows the cube to have different materials on
        // each face
        var boxFaceMaterial = new THREE.MeshFaceMaterial(boxMaterials);

        var slabGeometry = new THREE.BoxGeometry(width, slab_height, depth);

        var slabFaceMaterial = new THREE.MeshFaceMaterial(slabMaterials);

        addCupboard(vis_model, boxFaceMaterial, slabGeometry, slabFaceMaterial,functions);



        //alert("dabei");

        //webGL_element.setAttribute('onclick','obj_visualizer.onMouseMove()');
        //webGL_element.addEventListener('click',onMouseMove,false);
        webGL_element.addEventListener('click', onMouseMove, false);

        //alert("durch");
        // Add OrbitControls so that we can pan around with the mouse.
        controls = new THREE.OrbitControls(camera, renderer.domElement);

    }

    /**
     * Logic to clic on 3D model and perform operations.
     */

    function onMouseMove(e){

        mouseVector.x = 2 * ((e.clientX -50)/ canvasWidth) - 1;
        mouseVector.y = 1 - 2 * ((e.clientY -50)/ canvasHeight);

        raycaster.setFromCamera( mouseVector.clone(), camera );

        var intersects = raycaster.intersectObjects(scene.children[1].children);

        /*if(intersects.length!=0){
            impl_db.set_interaction_function(intersects[0].object.ID);
        }else{
            impl_db.set_interaction_function(null);
        }*/
    //    alert(impl_db.interaction_check());
        var clickedMeshId = intersects[0].object.id;

        if (meshSelected){
            unSelectMeshObject();
            if(clickedMeshId != curSelMeshId)
                selectMeshObject(clickedMeshId);
        }else{
            selectMeshObject(clickedMeshId);
        }

        renderScene();
    }
    /**
     * Store selected mesh material. Change it to a darker version
     */
    function selectMeshObject(clickedMeshId){
        var boxSelect = new THREE.MeshBasicMaterial({
            color: 0xBEBEBE,
            side: THREE.DoubleSide
        });
        meshObject = fetchMeshbyId(clickedMeshId);

        if(meshObject.material.type == 'MeshFaceMaterial'){
            // Set curSel.. variables
            curSelMeshId = clickedMeshId;
            curSelectedMeshMat = meshObject.material;
            meshObject.material = slabMaterial;
        }
        meshSelected = true;
    }

    function unSelectMeshObject(){
        // fetch info from curSel.. variables and unset them
        var selectedMesh = fetchMeshbyId(curSelMeshId);
        selectedMesh.material = curSelectedMeshMat;

        meshSelected = false;
    }
    /**
     * Delete selected Mesh
     */
    function deleteMeshbyId(selectedMeshId){
        for(var i = 0; i < scene.children[1].children.length; i++){
            if (scene.children[1].children[i].id == selectedMeshId){
                temp = scene.children[1].children[i];
                scene.children[1].remove(scene.children[1].children[i]);
            }
        }
    }
    /**
     * Select Mesh object by ID
     */
    function fetchMeshbyId(selectedMeshId){
        for(var i = 0; i < scene.children[1].children.length; i++){
            if (scene.children[1].children[i].id == selectedMeshId){
                return scene.children[1].children[i];
            }
        }
    }



    /**
     * Create cupboard.
     */
    function addCupboard(model, boxMaterial, slabGeometry, slabMaterial,functions) {
        var cupboard = new THREE.Object3D();
        cupboard.name = 'Cupboard';
        var x_pos = -model.length * width / 2;
        for (var i = 0; i < model.length; i++) {
            addColumn(model[i], x_pos, boxMaterial, slabGeometry, slabMaterial,functions[i], cupboard);
            x_pos = x_pos + width;
        }
        scene.add(cupboard);
    }

    /**
     * Create columns of cupboard.
     */
    function addColumn(rowHeights, x_pos, boxMaterial, slabGeometry, slabMaterial,functions, cupboard){
        //total_height is constant for the 3D visualization as a global.
        //while(i--) total_height += rowHeights[i];

        var boxBasePosition = -total_height/2;
        for(i = 0; i < rowHeights.length; i++){
            // Create the cube
            // Parameter 1: Width
            // Parameter 2: Height
            // Parameter 3: Depth
            var boxGeometry = new THREE.BoxGeometry(width, rowHeights[i], depth, 10, 10, 10);

            boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

            boxMesh.ID = functions[i];
            boxMesh.position.set(x_pos, boxBasePosition + rowHeights[i]/2, z_pos);
            //scene.add(boxMesh);
            cupboard.add(boxMesh);
            // Create a mesh and insert the geometry and the material. Translate the whole mesh
            // by 1.5 on the x axis and by 4 on the z axis and add the mesh to the scene.

            slabPosition = boxBasePosition + (rowHeights[i]) + slab_height/2;
            slabmesh = new THREE.Mesh(slabGeometry, slabMaterial);
            slabmesh.position.set(x_pos, slabPosition, z_pos);
            if (rowHeights.length != i)
               // scene.add(slabmesh);
                cupboard.add(slabmesh);
            boxBasePosition = boxBasePosition + rowHeights[i] + slab_height;
        }
    }

    /**
     * Animate the scene and call rendering.
     */
    function animate(){
        // Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
        requestAnimationFrame(animate);

        // Render the scene.
        renderer.render(scene, camera);
        controls.update();
    }

    /**
     * Render the scene. Map the 3D world to the 2D screen.
     */
    function renderScene(){
        renderer.render(scene, camera);
    }

    function update_infobox(height,width,depth){

        var info_box = document.getElementById("information_box_out");

        info_box.innerHTML = "Height: "+ height +" cm  &nbsp;&nbsp;&nbsp;  Width: "+width+" cm  &nbsp;&nbsp;&nbsp;  Depth: "+ depth +" cm";
    }
}
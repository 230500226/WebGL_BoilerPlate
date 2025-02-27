// Step 1: Setup canvas
// Get the canvas element by its ID
const canvas = document.getElementById('mainCanvas');
// Get the WebGL 2 rendering context for the canvas
const gl = canvas.getContext('webgl2');
// webgl = gl or = webgl

// Step 2: Create vertices
// Define the vertices of the point
const pointVertices = new Float32Array([
    0.0, 0.0
]);

// Step 3: Create a buffer for the vertices
// Create a buffer on the CPU and copy the vertices into it
const pointVerticesCpuBuffer = new Float32Array; //might be a mistake - pointVertices not cpu buffer
// Create a buffer on the GPU
const pointVerticesGpuBuffer = gl.createBuffer();
// Bind the buffer as the current array buffer
gl.bindBuffer(gl.ARRAY_BUFFER, pointVerticesGpuBuffer);
// Copy the vertices from the CPU buffer to the GPU buffer
gl.bufferData(gl.ARRAY_BUFFER, pointVertices, gl.STATIC_DRAW);

// Step 4: Create a vertex shader
// Define the source code for the vertex shader //Is this c code? 
const vertexShaderSourceCode = ` 
    precision mediump float;

    attribute vec3 vertexPosition;

    void main() {

        gl_Position = vec4(vertexPosition, 1.0);
        gl_PointSize = 10.0; // Set the point size to 10 pixels

    }`;
// Create a vertex shader object
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
// Attach the source code to the vertex shader object
gl.shaderSource(vertexShader, vertexShaderSourceCode);
// Compile the vertex shader
gl.compileShader(vertexShader);

// Step 5: Create a fragment shader
// Define the source code for the fragment shader
const fragmentShaderSourceCode = `
    precision mediump float;
    
    void main() {
        gl_FragColor = vec4(0,0,1,1);
    }`;
// Create a fragment shader object
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
// Attach the source code to the fragment shader object
gl.shaderSource(fragmentShader, fragmentShaderSourceCode);
// Compile the fragment shader
gl.compileShader(fragmentShader);

// Step 6: Create a shader program
// Create a shader program object
const pointShaderProgram = gl.createProgram();
// Attach the vertex shader to the shader program
gl.attachShader(pointShaderProgram, vertexShader);
// Attach the fragment shader to the shader program
gl.attachShader(pointShaderProgram, fragmentShader);
// Link the shader program
gl.linkProgram(pointShaderProgram);

// Step 7: Get the attributes from the shader program
// Get the location of the vertexPosition attribute in the shader program
const vertexPositionAttribute = gl.getAttribLocation(pointShaderProgram, 'vertexPosition');

// Step 8: Drawing stages
// Step 8.1: Set the background color
// Set the background to grey
gl.clearColor(0.5, 0.5, 0.5, 1.0);
// Clear the color buffer and depth buffer
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
// Step 8.2: Select the GPU program and buffer to be used
// Use the shader program
gl.useProgram(pointShaderProgram);
// Enable the vertexPosition attribute
gl.enableVertexAttribArray(vertexPositionAttribute);
// Bind the GPU buffer as the current array buffer
gl.bindBuffer(gl.ARRAY_BUFFER, pointVerticesGpuBuffer);
// Tell WebGL how to get data out of the buffer and into the vertexPosition attribute
gl.vertexAttribPointer(vertexPositionAttribute, 2, gl.FLOAT, false, 0, 0);
// Step 8.3: Draw the point
// Draw the point using the GPU program selected above
gl.drawArrays(gl.POINTS, 0, 1);
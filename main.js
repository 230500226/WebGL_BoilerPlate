// Step 1: Setup canvas
    // Get the canvas element by its ID
    const canvas  = document.getElementById("IDcanvas");
    
    // Get the WebGL 2 rendering context for the canvas
    const gl = canvas.getContext('webgl2');

// Step 2: Create vertices
    // Define the vertices of the triangle
    const triangleVertices = [
        0.0, 0.5,   // Vertex 1
        -0.5, -0.5, // Vertex 2
        0.5, -0.5   // Vertex 3
    ];

// Step 3: Create a buffer for the vertices
    // Create a buffer on the CPU and copy the vertices into it
    const triangleVerticesCpuBuffer = new Float32Array(triangleVertices);
    
    // Create a buffer on the GPU
    const triangleGeoBuffer = gl.createBuffer();
    
    // Bind the buffer as the current array buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleGeoBuffer);
    
    // Copy the vertices from the CPU buffer to the GPU buffer
    gl.bufferData(gl.ARRAY_BUFFER, triangleVerticesCpuBuffer, gl.STATIC_DRAW);

// Step 4: Create a vertex shader
    // Define the source code for the vertex shader
    const vertexShaderSourceCode = `
    precision mediump float;
    
    attribute vec3 vertexPosition;
    
    void main() {
    
        gl_Position = vec4(vertexPosition, 1.0);
    
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
    const triangleShaderProgram = gl.createProgram();
    
    // Attach the vertex shader to the shader program
    gl.attachShader(triangleShaderProgram, vertexShader);
    
    // Attach the fragment shader to the shader program
    gl.attachShader(triangleShaderProgram, fragmentShader);
    
    // Link the shader program
    gl.linkProgram(triangleShaderProgram);

// Step 7: Get the attributes from the shader program
    // Get the location of the vertexPosition attribute in the shader program
    const vertexPositionAttributLocation = gl.getAttribLocation(triangleShaderProgram, 'vertexPosition');
  
// Step 8: Drawing stages
    // Step 8.1: Set the backgroud color
        // Set the background to black
        gl.clearColor(0,0,0,1);
        
        // Clear the color buffer and depth buffer
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        
    // Step 8.2: Select the gpu program and buffer to be used 
        // Use the shader program
        gl.useProgram(triangleShaderProgram);
        
        // Enable the vertexPosition attribute
        gl.enableVertexAttribArray(vertexPositionAttributLocation);
        
        // Bind the GPU buffer as the current array buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleGeoBuffer);
        
        // Tell WebGL how to get data out of the buffer and into the vertexPosition attribute
        gl.vertexAttribPointer(vertexPositionAttributLocation,2,gl.FLOAT,false,0,0);
        // Index: vertexPositionAttributLocation: Specifies the location of the vertex attribute.
        // Size: 2: Specifies the number of components per vertex attribute. In this case, it’s 2 because each vertex is defined by a pair of (x, y) coordinates.
        // Type: gl.FLOAT: Specifies the data type of each component in the array. Here, each component is a float.
        // Normalize: false: Specifies whether to normalize the data. This is set to false because you don’t want to normalize the data.
        // Stride: 0: Specifies the offset in bytes between consecutive vertex attributes. Setting it to 0 means that the attributes are tightly packed.
        // Offset: 0: Specifies a pointer to the first component of the first vertex attribute in the array. This is set to 0 because you want to start from the beginning of the buffer.

    // Step 8.3: Draw the triangle 
        // Draw the triangle using the gpu program selected above finally
        gl.drawArrays(gl.TRIANGLES, 0,3);
        // Draw mode (primitive assembly mode): gl.TRIANGLES
        // First index: 0: Specifies the starting index of the first vertex to draw.
        // Number of vertices to compute (Count): 3: Specifies the number of vertices to draw.

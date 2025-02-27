// Step 1: Setup canvas
// Get the canvas element by its ID
// Get the WebGL 2 rendering context for the canvas

// Step 2: Create vertices
// Define the vertices of the point

// Step 3: Create a buffer for the vertices
// Create a buffer on the CPU and copy the vertices into it
// Create a buffer on the GPU
// Bind the buffer as the current array buffer
// Copy the vertices from the CPU buffer to the GPU buffer

// Step 4: Create a vertex shader
// Define the source code for the vertex shader
// Create a vertex shader object
// Attach the source code to the vertex shader object
// Compile the vertex shader

// Step 5: Create a fragment shader
// Define the source code for the fragment shader
// Create a fragment shader object
// Attach the source code to the fragment shader object
// Compile the fragment shader

// Step 6: Create a shader program
// Create a shader program object
// Attach the vertex shader to the shader program
// Attach the fragment shader to the shader program
// Link the shader program

// Step 7: Get the attributes from the shader program
// Get the location of the vertexPosition attribute in the shader program

// Step 8: Drawing stages
// Step 8.1: Set the background color
// Set the background to grey
// Clear the color buffer and depth buffer
// Step 8.2: Select the GPU program and buffer to be used
// Use the shader program
// Enable the vertexPosition attribute
// Bind the GPU buffer as the current array buffer
// Tell WebGL how to get data out of the buffer and into the vertexPosition attribute
// Step 8.3: Draw the point
// Draw the point using the GPU program selected above

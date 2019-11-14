let VSHADER_SOURCE=
    'attribute vec4 a_Position;'+
    'uniform vec4 u_Translation;'+
    '   void main(){'+
    '   gl_Position=a_Position+u_Translation;'+
    '}';
let FSHADER_SOURCE=
    'precision mediump float;'+
    'uniform vec4 u_FragColor;'+
    '   void main(){'+
    '   gl_FragColor=u_FragColor;'+
    '}';

let Tx=0.5,Ty=0.5,Tz=0.0;

function main(){
    let canvas=document.getElementById('webgl');
    gl=getWebGLContext(canvas);

    if (!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
        console.log('Can not compile the shader files.');
        return;
    } 

    let n=initVertexBuffers(gl);

    let u_FragColor=gl.getUniformLocation((gl.program), 'u_FragColor');
    let u_Translation=gl.getUniformLocation((gl.program), 'u_Translation');
    gl.uniform4f(u_FragColor, 0.5, 0.5, 0.0, 1.0);
    gl.uniform4f(u_Translation, 0.5, 0.5, 0.0, 0.0);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    //gl.drawArrays(gl.TRIANGLES,0,n);
    gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
}

function initVertexBuffers(gl){
    let vertices=new Float32Array([
        0.0,0.5,-0.5,-0.5,0.5,-0.5]);
        
        var indices = new Uint8Array([
            0,1,2,3,4,5
        ]);
        var indexBuffer = gl.createBuffer();

        let vertex=gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertex);
        gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);

        let a_Position=gl.getAttribLocation(gl.program, 'a_Position');
        gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_Position);
        
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    
    
        return indices.length;
    }

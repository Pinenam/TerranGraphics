let VSHADER_SOURCE=
    'attribute vec4 a_Position;'+
    'void main(){'+
    '   gl_Position=a_Position;'+
    '}';

let FSAHDER_SOURCE=
    'precision mediump float;'+
    'uniform vec4 u_FragColor;'+
    'void main(){'+
    '   gl_FragColor=u_FragColor;'+
    '}';
    
function main(){
    let canvas=document.getElementById("webgl");
    if (!canvas){
        console.log('Failed to get canvas');
        return;
    }

    let gl=getWebGLContext(canvas);
    if (!gl){
        console.log('Failed to get WebGL context.')
        return;
    }

    if (!initShaders(gl,VSHADER_SOURCE,FSAHDER_SOURCE)){
        console.log('Failed to compile shader files');
        return;
    }

    let u_FragColor=gl.getUniformLocation(gl.program, 'u_FragColor');
    gl.uniform4f(u_FragColor, 1.0,0.0,0.0,1.0);

    let n=initVertexBuffers(gl);

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, n);


}

    function initVertexBuffers(gl){
        let vertices=new Float32Array([
            -0.5,0.5,
            -0.5,-0.5,
            0.5,0.5,
            0.5,-0.5
        ]);
        let n=4;

        let vertexBuffer=gl.createBuffer();
        //gl.ARRAY_BUFFER表示缓冲区对象包含了顶点数据                
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        //bufferData（缓冲区对象，顶点坐标，绘制方案）
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        let a_Position=gl.getAttribLocation(gl.program, 'a_Position');
        gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);    

        gl.enableVertexAttribArray(a_Position);

        return n;
}
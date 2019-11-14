 let VSHADER_SOURCE=
    'attribute vec4 a_Position;'+
    'attribute float a_PointSize;'+
    'void main(){'+
    '   gl_Position=a_Position;'+
    '   gl_PointSize=a_PointSize;'+
    '}';

let FSHADER_SOURCE=
    'precision mediump float;'+
    'uniform vec4 u_FragColor;'+
    'void main(){'+
    'gl_FragColor=u_FragColor;'+
    '}';

function main(){
    let canvas=document.getElementById("webgl");
    if (!canvas){
        console.log('Cant get canvas element');
        return;
    }

    let gl=getWebGLContext(canvas);
    if (!gl){
        console.log("Cant get WebGL contexts.");
        return;
    }
    /**
     * initShaders()都做了些什么：
     * 1分别创建了两个着色器对象
     * 2将着色器源代码编译为对象
     * 3验证着色器的编译是否成功
     * 4分别创建了两个着色器程序
     * 5分别将两个着色器对象关联到了两个着色器程序
     * 6分别连接了两个着色器程序
     * 7判断着色器的链接是否成功完成了
     * 8使用着色器来处理顶点和片元
     */
    if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
        console.log('Failed to complie WebGl programs.')
        return;
    }

    //设置顶点位置
    let n=initVertexBuffers(gl);
    if (n<0){
        console.log('Failed to set the position of the vertices');
        return;
    }
    let a_PointSize=gl.getAttribLocation(gl.program,'a_PointSize');
    gl.vertexAttrib1f(a_PointSize,13.0);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, 3);

}



function initVertexBuffers(gl){
    //函数的返回值是待绘制顶点的数量，保存在变量n中
    //如果函数内发生错误，返回的则是负值。
    let vertices=new Float32Array([0.0,0.5,
                                -0.5,-0.5,
                                0.5,-0.5
    ]);//????
    let n=3;
    //创建缓冲区对象
    let vertexBuffer=gl.createBuffer();
    if (!vertexBuffer){
        console.log('Failed to create the buffer object');
        return -1;//????
    }

    //将缓冲区对象绑定到目标
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
    //将数据写入缓冲区对象，因为不能直接把数据写到缓冲区里
    gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
    
   
    //将缓冲区对象分配给a_Position变量 
    let a_Position=gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    //连接a_Position变量与分配给它的缓冲区对象
    gl.enableVertexAttribArray(a_Position);

    return n;
}

var VSHADER_SOURCE=
    'attribute vec4 a_Position;\n'+
    'attribute float a_PointSize;\n'+
    'void main(){\n'+
    'gl_Position=a_Position;\n'+
    'gl_PointSize=a_PointSize;\n'+
    '}\n';

var FSHADER_SOURCE=
    'void main() {\n'+
    'gl_FragColor=vec4(0.4118, 0.8745, 0.6196, 1.0);\n'+//设置颜色
    '}\n';

function main(){
    var canvas=document.getElementById('webgl');
    var gl=getWebGLContext(canvas);

    if(!gl)
    {
    console.log("Failed to get the rendering context for WebGL");
        return;
    }

    //建立顶点着色器
    if (!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE))
    {
        console.log("Failed to initalize shaders.");
        return;
    }


    //获取attribute变量的存储位置，getAttribLocation()返回一个变量地址
    var a_Position=gl.getAttribLocation(gl.program,'a_Position');//第二个参数是想要获取存储地址的attribute变量名
    var a_PointSize=gl.getAttribLocation(gl.program,'a_PointSize');
    if (a_Position<0||a_PointSize<0){
        console.log("Failed to get the storage location of a_Position");
        return;
    }



    //将顶点位置传输给attribute变量
    gl.vertexAttrib3f(a_Position, 0.5, 0.0, 0.0, 0.0);//vertexAttrib3f(变量的存储位置，第一个分量的值，第二个分量的值，第三个分量的值)
    gl.vertexAttrib1f(a_PointSize,100.0);

    //设置canvas背景色
    gl.clearColor(0.0,0.0,0.0,1.0);

    //清除<canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS,0,1);

}



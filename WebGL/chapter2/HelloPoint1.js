//顶点着色程序

//GLSL语言 程序代码必须预处理成单个字符串的形式，所以用+符号将多行字符串连接成一个长字符串。每一行以\n结束
//这样当着色器内部出错的时候就能获取出错的行号，这对于检查源代码的错误很有帮助。
let VSHARDER_SOURCE=
    'void main(){\n'+
        'gl_Position=vec4(0.0,0.0,0.0,1.0);\n'+//设置坐标(0.0,0.0,0.0)  原点在canvas中心
        'gl_PointSize=10.0;\n'+//设置尺寸10px 参数必须为float
        '}\n';
    
//片元着色器程序
var FSHADER_SOURCE=
'void main() {\n'+
'gl_FragColor=vec4(1.0,0.0,0.0,1.0);\n'+//设置颜色
'}\n'

function main(){
    let canvas=document.getElementById('webgl');

    let gl=getWebGLContext(canvas);
    if(!gl)
    {
    console.log("Failed to get the rendering context for WebGL");
        return;
    }

    //初始化着色器

    if(!initShaders(gl,VSHARDER_SOURCE,FSHADER_SOURCE)){
        console.log("Failed to initalize shaders.");
        return; 
    }

    gl.clearColor(0.0,0.0,0.0,1.0);//0001 black
    
    gl.clear(gl.COLOR_BUFFER_BIT);

    //Draw a point
    gl.drawArrays(gl.POINTS,0,1);


}
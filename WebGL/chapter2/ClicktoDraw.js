var VSHADER_SOURCE=
    'attribute vec4 a_Position\n;'+
    'attribute float a_PointSize\n;'+
    'void main(){\n'+
        'gl_Position=a_Position;\n'+
        'gl_PointSize=a_PointSize;\n'+
        '}\n';
var FSHADER_SOURCE=
    'precision mediump float;\n'+
    'uniform vec4 u_FragColor;\n'+
    'void main(){\n'+
        'gl_FragColor=u_FragColor;\n'+
        '}\n';

function main(){
    var canvas=document.getElementById("webgl");
    var gl=getWebGLContext(canvas);
    
    if(!gl){
        console.log("Failed to get the rendering context for WebGL")
        return;
    }

    if (!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
        console.log("Failed to initalize shaders.");
        return;
    }

    var a_Position=gl.getAttribLocation(gl.program,'a_Position');
    var a_PointSize=gl.getAttribLocation(gl.program, 'a_PointSize');
    var u_FragColor=gl.getUniformLocation(gl.program,'u_FragColor');

    if(a_PointSize<0||a_Position<0||u_FragColor<0){
        console.log("Failed to get the storage location of the atrribute varibles.")
        return;
    }

    gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);
    gl.vertexAttrib1f(a_PointSize,10.0);
    gl.uniform4f(u_FragColor,1.0,1.0,1.0,1.0);
    gl.clearColor(1.0,0.0,1.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    //注册鼠标响应事件函数
    canvas.onmousedown=function(ev) {
        click(ev,gl,canvas,a_Position,u_FragColor)
    };


    var g_points=[];//鼠标点击位置数组
    var g_colors=[];//颜色数组
    function click(ev,gl,canvas,a_Position,u_FragColor)
    {
        var x=ev.clientX;//鼠标点击处的x坐标
        var y=ev.clientY;//鼠标点击处的y坐标
        var rect=ev.target.getBoundingClientRect();

        x=((x-rect.left)-canvas.width/2)/(canvas.width/2);
        y=(canvas.height/2-(y-rect.top))/(canvas.height/2);
        //坐标存到g_point数组中
        g_points.push([x,y]);

        if(x>=0.0&&y>=0.0){
            g_colors.push([1.0,0.0,0.0,1.0]);
        }else if(x<0.0&&y<0.0){
            g_colors.push([0.0,1.0,0.0,1.0]);
        }else{
            g_colors.push([1.0,1.0,0.5,1.0]);
        }

        gl.clear(gl.COLOR_BUFFER_BIT);

        var len=g_points.length;

        for(var i=0;i<len;i++){
            var xy=g_points[i];
            var rgba=g_colors[i];
            //将点的位置传递到变量中a_Position
            gl.vertexAttrib3f(a_Position,xy[0],xy[1],0.0);
            //绘制点
            gl.uniform4f(u_FragColor,rgba[0],rgba[1],rgba[2],rgba[3]);
            gl.drawArrays(gl.POINTS,0,1);
        }
    }

    gl.drawArrays(gl.POINTS, 0, 1);
}
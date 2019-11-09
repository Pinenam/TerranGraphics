
let webgl=null;
let vertexShaderObject=null;
let fragmentShaderObject=null;
let programObject=null;
let v3PositionIndex=null;
let triangleBuffer=null;
let triangleColorBuffer=null;
let v3ColorIndex=1;
let r=1.0;
let g=1.0;
let b=1.0;
let isDesc=false;

//顶点数据
function initVextexData(webgl)
{
    //顶点坐标
    let jsArrayData = [
         -0.5, 0.5, 0.0,
         0.5, 0.5, 0.0,
         0.0, -0.5, 0.0
    ]

    //创建一个webgl能够访问的缓冲
    let triangleBuffer=webgl.createBuffer();
    //绑定buffer
    webgl.bindBuffer(webgl.ARRAY_BUFFER, triangleBuffer);
    //将js数据拷贝到buffer上
    webgl.bufferData(webgl.ARRAY_BUFFER, new Float32Array(jsArrayData), webgl.STATIC_DRAW);

   //颜色数据
    let jsArrayColor = [
       1.0, 0.0, 0.0,//上顶点
       0.0, 1.0, 0.0,//左顶点
       0.0, 0.0, 1.0 //右顶点
    ];

   //创建颜色缓冲，将颜色数据拷贝进颜色缓冲
    triangleColorBuffer = webgl.createBuffer();
    webgl.bindBuffer(webgl.ARRAY_BUFFER, triangleColorBuffer);
    webgl.bufferData(webgl.ARRAY_BUFFER, new Float32Array(jsArrayColor), webgl.STATIC_DRAW);

    return triangleBuffer;
}

//渲染场景
function renderScene()
{
    //开始绘制
    //清空屏幕
    webgl.clearColor(0.9, 0.8, 1.0, 1.0);
    webgl.clear(webgl.COLOR_BUFFER_BIT);

    //webgl中顶点数组数据可能n个,
    //绑定一个顶点数组数据
    webgl.bindBuffer(webgl.ARRAY_BUFFER, triangleBuffer);
    //启动关联索引上的数据
    webgl.enableVertexAttribArray(v3PositionIndex);
    //指定关联索引上的数据元素或者元素数据的正确信息
    webgl.vertexAttribPointer(v3PositionIndex, 3, webgl.FLOAT, false, 0, 0);

   //绑定颜色buffer
    webgl.bindBuffer(webgl.ARRAY_BUFFER, triangleColorBuffer);
    webgl.enableVertexAttribArray(v3ColorIndex);
    webgl.vertexAttribPointer(v3ColorIndex, 3, webgl.FLOAT, false, 0, 0);

    //绘制三角形
    webgl.drawArrays(webgl.TRIANGLES, 0, 3);
}

function main()
{
    //初始化webgl渲染区域
    webgl=initCanvas("webglCanvas");

    //初始化shader程序
    let bind1=[v3PositionIndex, "v3Position"];
    let bind2=[v3ColorIndex, "av3Color"];
    let bindData=new Array();
    bindData.push(bind1);
    bindData.push(bind2);
    let programObject=initShaders(webgl, "shader-vs", "shader-fs", bindData);
    webgl.useProgram(programObject);

    window.setInterval("changeColor()", 10);

    //初始化顶点数据
    triangleBuffer = initVextexData(webgl);
}

function changeColor()
{
    if (isDesc&&r<= 0.1)
        isDesc=false;
    if (!isDesc&&r>=1.0)
        isDesc=true;

    !isDesc ? r+=0.01 : r-=0.01;
    !isDesc ? g+=0.01 : g-=0.01;
    !isDesc ? b+=0.01 : b-=0.01;

    let jsArrayColor=[
       r, 0.0, 0.0,//左顶点
       0.0, g, 0.0,//右顶点
       0.0, 0.0, b //下顶点
   ];

    triangleColorBuffer=webgl.createBuffer();
    webgl.bindBuffer(webgl.ARRAY_BUFFER, triangleColorBuffer);
    webgl.bufferData(webgl.ARRAY_BUFFER, new Float32Array(jsArrayColor), webgl.STATIC_DRAW);

    renderScene();
}
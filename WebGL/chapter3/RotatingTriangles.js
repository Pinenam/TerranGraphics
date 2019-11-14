let VS_Source=
    'attribute vec4 a_Position;\n'+
    'uniform mat4 u_ModelMat;\n'+
    'attribute vec4 a_Color;\n'+
    'varying vec4 v_Color;\n'+
    'void main()\n'+
    '{\n'+
        'gl_Position=u_ModelMat*a_Position;\n'+
        'v_Color=a_Color;\n'+
    '}\n';

let FS_Source=
    '#ifdef GL_ES\n'+
    'precision mediump float;\n'+
    '#endif\n'+
    'varying vec4 v_Color;\n'+
    'void main()\n'+
    '{\n'+
    '   gl_FragColor=v_Color;\n'+
    '}\n';


let RotateSelfSpeed = 180.0;
let RotateTargetSpeed = 360;
let lastFrameTime = Date.now();


function main(){

    let canvas=document.getElementById('weblg');
    let gl=getWebGLContext(canvas);
    
    if(!gl)
    {
        console.log("Failed to get WebGL Context");
        return;
    }

    if(!initShaders(gl, VS_Source,FS_Source))
    {
        console.log("Failed to compile shaders.");
        return;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1);

    initvertexBuffers(gl);

    //Father triangle
    let modelMatBig = new Matrix4();
    //Child triangle
    let modelMatSmall = new Matrix4();
    let currentTargetAngle = 0;
    let currentSelfAngle = 0;

    //旋转函数
    let tick = function(){
        let frameInterval = calFrameInternal();
        currentTargetAngle = updateAngle(frameInterval, currentTargetAngle, RotateTargetSpeed);
        currentSelfAngle = updateAngle(frameInterval, currentSelfAngle, RotateSelfSpeed);

        
        //父三角的顶点旋转矩阵  
        modelMatBig.setTranslate(0.0, cos60, 0.0);    
        modelMatBig.rotate(currentTargetAngle, 0, 0, 1);
        modelMatBig.translate( 0.0, -cos60, 0.0);
        draw(gl, 0, 3, modelMatBig, true);

        
        //子三角的顶点旋转矩阵
        modelMatSmall.setTranslate(0.0, cos60, 0.0);    
        modelMatSmall.rotate(currentTargetAngle, 0, 0, 1);
        modelMatSmall.translate(0.0, -cos60, 0.0);

        //两个三角的自转矩阵
        modelMatSmall.translate(-0.5, -Math.sqrt(3)/6, 0.0);
        modelMatSmall.rotate(currentSelfAngle, 0, 0, 1);
        modelMatSmall.translate(0.5, Math.sqrt(3)/6, 0.0);   

        draw(gl, 3, 3, modelMatSmall, false);

        requestAnimationFrame(tick);
    };
    tick();

}

/**
 * 创建顶点缓存
 * @param {*} gl 
 */ 
const cos60=(Math.sqrt(3)/3);
function initvertexBuffers(gl)
{
   
    let vertices = new Float32Array([
        0.0, cos60, 1.0, 0.0, 0.0,
        -0.5, -0.5*cos60, 0.0, 1.0, 0.0,
        0.5, -0.5*cos60, 0.0, 0.0, 1.0,

        -0.5, 0, 1.0, 0.0, 0.0,
        -0.5-0.5*0.5, -0.75*cos60, 0.0, 1.0, 0.0,
        -0.5 + 0.5*0.5, -0.75*cos60, 0.0, 0.0, 1.0,
    ]);

    var indices = new Uint8Array([
        0,1,2,3,4,5
    ]);
    var indexBuffer = gl.createBuffer();
    
    let elementSize = vertices.BYTES_PER_ELEMENT;
    let vertiexBUffer = gl.createBuffer();
    if(!vertiexBUffer)
    {
        console.log("Failed to create vertex matrix");
        return -1;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, vertiexBUffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    let a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, elementSize*5, 0);
    gl.enableVertexAttribArray(a_Position);

    let a_Color=gl.getAttribLocation(gl.program, 'a_Color');
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, elementSize*5, elementSize*2);
    gl.enableVertexAttribArray(a_Color);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    return indices.length;
}


//计算每帧间隔时间
function calFrameInternal()
{
    let thisFrameTime  =Date.now();
    let frameInterval = thisFrameTime - lastFrameTime;
    lastFrameTime = thisFrameTime;
    return frameInterval;
}


//更新旋转值
 
function updateAngle(frameInterval, currentAngle, rotateSpeed)
{
    let targetAngle = currentAngle + rotateSpeed * frameInterval/1000;
    targetAngle %= 360;
    return targetAngle;
}

let modelMartrix=new Matrix4();
function draw(gl, offest, count, modelMat, update)
{
    let u_modelMat = gl.getUniformLocation(gl.program, "u_ModelMat");
    gl.uniformMatrix4fv(u_modelMat, false, modelMat.elements);
    
    if(update)
    {
       gl.clear(gl.COLOR_BUFFER_BIT);
    }
    //gl.drawArrays(gl.TRIANGLES, offest, count);
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_BYTE, 0);                                        
}

function upRotating(){
    RotateSelfSpeed+=10;
    RotateTargetSpeed+=10;
}

function downRotating(){
    RotateSelfSpeed-=10;
    RotateTargetSpeed-=10;
}
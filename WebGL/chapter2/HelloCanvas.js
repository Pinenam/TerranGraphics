function main(){
    let canvas=document.getElementById("webgl");

    //获取WebGL绘图上下文
    let gl=getWebGLContext(canvas);
    if (!gl)
    {
        console.log("Failed to get the rendering context for WebGl");
        return;
    }
    gl.clearColor(0.0,1.0,1.0,0.32);
    gl.clear(gl.COLOR_BUFFER_BIT);
}
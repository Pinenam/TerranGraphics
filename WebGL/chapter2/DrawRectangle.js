function main(){
    let canvas=document.getElementById('example');
    if (!canvas){//如果canvas不可用
        console.log("Failed to retrieve the <canvas> element");
        return;
    }

    let ctx=canvas.getContext('2d');
    ctx.fillStyle='rgba(0,0,255,1.0)';
    ctx.fillRect(120,10,150,150);
}
//脱库的立方体旋转in WebGL
let xRotating=0.001
let yRotating=0.001;
let zRotating=0.001;

function main(){
   
         let canvas=document.getElementById('webgl');
         //让canvas支持webGL渲染
         gl=canvas.getContext('experimental-webgl');
         //gl.enable(gl.DEPTH_TEST);
         gl.enable(gl.BLEND);
         //设置混合函数
         gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
         let vertices=[
            -1,-1,-1, 1,-1,-1,     1, 1,-1, -1, 1,-1,
            -1,-1, 1, 1,-1, 1,     1, 1, 1, -1, 1, 1,
            -1,-1,-1, -1, 1,-1,   -1, 1, 1, -1,-1, 1,
             1,-1,-1, 1, 1,-1,     1, 1, 1, 1,-1, 1,
            -1,-1,-1, -1,-1, 1,    1,-1, 1, 1,-1,-1,
            -1, 1,-1, -1, 1, 1,    1, 1, 1, 1, 1,-1, 
         ];
         let colors = [ 
            0.5, 0.5, 1.0, 0.4,  0.5, 0.5, 1.0, 0.4,  0.5, 0.5, 1.0, 0.4,  0.5, 0.5, 1.0, 0.4,  // v0-v1-v2-v3 front(blue)
            0.5, 1.0, 0.5, 0.4,  0.5, 1.0, 0.5, 0.4,  0.5, 1.0, 0.5, 0.4,  0.5, 1.0, 0.5, 0.4,  // v0-v3-v4-v5 right(green)
            1.0, 0.5, 0.5, 0.4,  1.0, 0.5, 0.5, 0.4,  1.0, 0.5, 0.5, 0.4,  1.0, 0.5, 0.5, 0.4,  // v0-v5-v6-v1 up(red)
            1.0, 1.0, 0.5, 0.4,  1.0, 1.0, 0.5, 0.4,  1.0, 1.0, 0.5, 0.4,  1.0, 1.0, 0.5, 0.4,  // v1-v6-v7-v2 left
            1.0, 1.0, 1.0, 0.4,  1.0, 1.0, 1.0, 0.4,  1.0, 1.0, 1.0, 0.4,  1.0, 1.0, 1.0, 0.4,  // v7-v4-v3-v2 down
            0.5, 1.0, 1.0, 0.4,  0.5, 1.0, 1.0, 0.4,  0.5, 1.0, 1.0, 0.4,  0.5, 1.0, 1.0, 0.4   // v4-v7-v6-v5 back
         ];
         let indices = [
            0,1,2, 0,2,3, 4,5,6, 4,6,7,
            8,9,10, 8,10,11, 12,13,14, 12,14,15,
            16,17,18, 16,18,19, 20,21,22, 20,22,23 
         ];

         // 把顶点数据写入vertex着色器 
         let vertex_buffer=gl.createBuffer ();
         gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

         // 把着色数据写入片元着色器
         let color_buffer=gl.createBuffer ();
         gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

         // 把顶点索引写进颜色缓冲区
         let index_buffer=gl.createBuffer ();
         gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
         gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
                                              
        //Shader部分
         
         let VSHADER_SOURCE='attribute vec3 a_Position;'+
            'uniform mat4 u_Pmatrix;'+
            'uniform mat4 u_Vmatrix;'+
            'uniform mat4 u_Mmatrix;'+
            'attribute vec3 a_Color;'+
            'varying vec3 v_Color;'+
			
            'void main(void) { '+
               'gl_Position=u_Pmatrix*u_Vmatrix*u_Mmatrix*vec4(a_Position, 1.);'+
               'v_Color=a_Color;'+
            '}';

         let FSHADER_SOURCE = 'precision mediump float;'+
            'varying vec3 v_Color;'+
            'void main(void) {'+
               'gl_FragColor=vec4(v_Color,0.9);'+
            '}';
         
         let vertShader=gl.createShader(gl.VERTEX_SHADER);
         gl.shaderSource(vertShader, VSHADER_SOURCE);
         gl.compileShader(vertShader);

         let fragShader=gl.createShader(gl.FRAGMENT_SHADER);
         gl.shaderSource(fragShader,FSHADER_SOURCE);
         gl.compileShader(fragShader);

         let shaderProgram=gl.createProgram();
         gl.attachShader(shaderProgram, vertShader);
         gl.attachShader(shaderProgram, fragShader);
         gl.linkProgram(shaderProgram);

         //把缓冲区对象分配到Attribute变量上
         let u_Pmatrix=gl.getUniformLocation(shaderProgram, "u_Pmatrix");
         let u_Vmatrix=gl.getUniformLocation(shaderProgram, "u_Vmatrix");
         let u_Mmatrix=gl.getUniformLocation(shaderProgram, "u_Mmatrix");
         let elementSize = vertices.BYTES_PER_ELEMENT;
         gl.bindBuffer(gl.ARRAY_BUFFER,vertex_buffer);
         let a_Position=gl.getAttribLocation(shaderProgram, "a_Position");
         gl.vertexAttribPointer(a_Position,3,gl.FLOAT, false,elementSize*3,0) ;
         
         // Position
         gl.enableVertexAttribArray(a_Position);
         gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
         let a_Color=gl.getAttribLocation(shaderProgram, "a_Color");
         gl.vertexAttribPointer(a_Color, 4, gl.FLOAT, false,elementSize*4,0) ;
         
         // Color
         gl.enableVertexAttribArray(a_Color);
         gl.useProgram(shaderProgram);

        //自定义变换矩阵
         //获得投影矩阵
         function getProjection(angle, a, zMin, zMax) {
            let ang=Math.tan((angle*.5)*Math.PI/180);//angle*.5
            return [
               0.5/ang, 0 , 0, 0,
               0, 0.5*a/ang, 0, 0,
               0, 0, -(zMax+zMin)/(zMax-zMin), -1,
               0, 0, (-2*zMax*zMin)/(zMax-zMin), 0 
            ];
         }
			
         let proj_matrix=getProjection(20, canvas.width/canvas.height, 1, 100);

         let mov_matrix=[1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
         let view_matrix=[1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];

         // translating z
         //定义缩放大小
         let zoom=6;
         view_matrix[14]=view_matrix[14]-zoom;

     //Rotation

         function rotateZ(m, angle) {
            let cos=Math.cos(angle);
            let sin=Math.sin(angle);
            let mv0=m[0], mv4=m[4], mv8=m[8];
				
            m[0]=cos*m[0]-sin*m[1];
            m[4]=cos*m[4]-sin*m[5];
            m[8]=cos*m[8]-sin*m[9];

            m[1]=cos*m[1]+sin*mv0;
            m[5]=cos*m[5]+sin*mv4;
            m[9]=cos*m[9]+sin*mv8;
         }

         function rotateX(m, angle) {
            let cos=Math.cos(angle);
            let sin=Math.sin(angle);
            let mv1=m[1], mv5=m[5], mv9=m[9];
				
            m[1]=m[1]*cos-m[2]*sin;
            m[5]=m[5]*cos-m[6]*sin;
            m[9]=m[9]*cos-m[10]*sin;

            m[2]=m[2]*cos+mv1*sin;
            m[6]=m[6]*cos+mv5*sin;
            m[10]=m[10]*cos+mv9*sin;
         }

         function rotateY(m, angle) {
            let cos=Math.cos(angle);
            let sin=Math.sin(angle);
            let mv0=m[0], mv4 = m[4], mv8 = m[8];
				
            m[0]=cos*m[0]+sin*m[2];
            m[4]=cos*m[4]+sin*m[6];
            m[8]=cos*m[8]+sin*m[10];

            m[2]=cos*m[2]-sin*mv0;
            m[6]=cos*m[6]-sin*mv4;
            m[10]=cos*m[10]-sin*mv8;
         }

//Drawing
         let time_old=0;
        
         
         let animate=function(time) {

            let dt=time-time_old;
            rotateZ(mov_matrix, dt*zRotating);//time
            rotateY(mov_matrix, dt*yRotating);
            rotateX(mov_matrix, dt*xRotating);
            time_old=time;

            //开启隐藏面消除
            //gl.depthFunc(gl.LEQUAL);
            gl.clearColor(0.5, 0.5, 0.5, 0.9);
            //gl.clearDepth(1.0);


            gl.viewport(0.0, 0.0, canvas.width, canvas.height);
            gl.clear(gl.COLOR_BUFFER_BIT || gl.DEPTH_BUFFER_BIT);
            gl.uniformMatrix4fv(u_Pmatrix, false, proj_matrix);
            gl.uniformMatrix4fv(u_Vmatrix, false, view_matrix);
            gl.uniformMatrix4fv(u_Mmatrix, false, mov_matrix);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
           // gl.depthMask(false);
            gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
           // gl.depthMask(true);
			//在下次重绘之前调用指定的回调函数更新动画
            window.requestAnimationFrame(animate);
         }
         animate(0);
        }

        
        function xUp(){
            xRotating+=0.001;
        }
        function xDown(){
            xRotating-=0.001;
        }
        function yUp(){
            yRotating+=0.001;
        }
        function yDown(){
            yRotating-=0.001;
        }
        function zUp(){
            zRotating+=0.001;
        }
        function zDown(){
            zRotating-=0.001;
        }
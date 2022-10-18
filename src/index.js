import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
// import { writeFile } from 'fs/promises';


if(crossOriginIsolated){
    console.log('we isolated')
}{
    console.log('we NOT isolated',crossOriginIsolated)
}


const ffmpeg = createFFmpeg({ log: true });

let f = new FontFace('test', 'url("textile_regular.ttf") ')
let can, canvas, video, temp, c_temp,img;


var value = document.getElementById('area');

value.oninput = generateTitle;



function generateTitle(text) {
   
    console.log("input:",value.value);
    console.log("array test::",value.value.split('\n'));

    let tits = value.value.split('\n');

    tits[0] = '"'+tits[0];
    tits[tits.length-1] = tits[tits.length-1] + '"';
    let k = [];

    // canvas.clearRect(0,0,1280,713);
    canvas.fillStyle = 'black';
    canvas.fillRect(0,0,1280,713);
    
    for(let i=0 ; i<tits.length;i++){
        canvas.fillStyle= 'white';
        canvas.fillText(tits[i].split("").join(String.fromCharCode(8202)), 649, 345 + (72 * i));
        

    }

}


let button = document.getElementById('generate');

button.addEventListener('click',(event)=>{
    event.preventDefault();

    img = can.toDataURL('image/png');
    // document.write('<img src =" '+ img + '"/>');
    Abed();
})
async function Abed() {
    console.log("Generating INtro");
    let vidya = await fetch('./always sunny.mp4');
    let title = await fetch('./download.png');
    
    console.log("vidya",vidya);
    console.log("title",title);

    await ffmpeg.load();
    ffmpeg.FS('writeFile','always sunny.mp4', await fetchFile(vidya.url));
    ffmpeg.FS('writeFile','intro_title', await fetchFile(img));
    
    await ffmpeg.run('-i', 'always sunny.mp4', '-i', 'intro_title', '-filter_complex', '[1][0]scale2ref[i][v];[v][i]overlay=enable=\'between(t,0,2.9)\'', '-c:a', 'copy', 'intro.mp4');

    const output = ffmpeg.FS("readFile",'intro.mp4');

    const url = URL.createObjectURL(new Blob([output.buffer],{type:'video/mp4'}));

    let endMe = document.getElementById('output');
    endMe.src = url;
    endMe.style.display = "block";


  
  }



f.load().then((font) => {

    document.fonts.add(font);
    console.log("font loaded", font);

    can = document.getElementById('canvas');
    canvas = can.getContext('2d');

    video = document.getElementById('video');

    // can.width = "1920px";
    // can.height = "1080px";
    canvas.fillStyle = 'black';
    canvas.fillRect(0,0,1280,713);

    canvas.fillStyle ='white';

    canvas.font = '62px test';
    canvas.filter = "blur(0.7px)"
    canvas.textAlign = "center";
    // canvas.fillText('"Mac Fights'.split("").join(String.fromCharCode(8202)), 649, 345);

    
    // let io = 'Ga'.split("").join(String.fromCharCode(8202));
    // canvas.font = '60px times new roman';



    // canvas.fillText('Gay Marriage"'.split("").join(String.fromCharCode(8202)), 638, 417);



    //inital 'ga' co ords 423, 417);
    // canvas.fillText(' Ga', 399, 417);
})

import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({ log: true });

let f = new FontFace('textile_regular', 'url("textile_regular.ttf") ')
let can, canvas,img;

//For updating the canvas whenever text is entered in the textarea.
let input = document.getElementById('area');
input.oninput = generateTitle;

//Important since the FFMPEG module uses SharedArrayBuffer, and it's only activated if cross origin isolation is enabled.
if(crossOriginIsolated){
    console.log('We are cors isolated')
}
else{
    console.log('we NOT cors isolated',crossOriginIsolated)
}


function generateTitle() {
   
    console.log("input:",input.value);
    console.log("array test::",input.value.split('\n'));

    let title = input.value.split('\n');

// Adds the quotation marks to the first and last character.
    title[0] = '"'+title[0];
    title[title.length-1] = title[title.length-1] + '"';
    

  //Repaints the canvas on input, otherwise the old text won't disappear and overlaps with the new text. 
    canvas.fillStyle = 'black';
    canvas.fillRect(0,0,1280,713);
    
    for(let i=0 ; i<title.length;i++){
        canvas.fillStyle= 'white';
        canvas.fillText(title[i].split("").join(String.fromCharCode(8202)), 649, 345 + (72 * i));
        
    }

}



let button = document.getElementById('generate');

button.addEventListener('click',(event)=>{
    event.preventDefault();

    img = can.toDataURL('image/png');
    
    generateIntro();
})




async function generateIntro() {
    button.disabled = "true"
    console.log("Generating Intro");

    let vidya = await fetch('./always sunny.mp4');
    console.log("vidya",vidya);

    if(!ffmpeg.isLoaded()){
        await ffmpeg.load();
    }

    let userIntro = document.getElementById('output');
    userIntro.style.display = "none"

    
    let loadingAnim = document.getElementById('loading');
    loadingAnim.innerText = "Loading";
    
    let loading = setInterval(()=>{

        if(loadingAnim.innerText.length < 10){
            loadingAnim.innerText += "."
        }
        else{
            loadingAnim.innerText = "Loading"
        }
            
    },1000)
    
    ffmpeg.FS('writeFile','always sunny.mp4', await fetchFile(vidya.url));
    ffmpeg.FS('writeFile','intro_title', await fetchFile(img));
    
    await ffmpeg.run('-i', 'always sunny.mp4', '-i', 'intro_title', '-filter_complex', '[1][0]scale2ref[i][v];[v][i]overlay=enable=\'between(t,0,2.9)\'', '-c:a', 'copy', 'intro.mp4');

    const output = ffmpeg.FS("readFile",'intro.mp4');

    const url = URL.createObjectURL(new Blob([output.buffer],{type:'video/mp4'}));

    clearInterval(loading);
    loadingAnim.innerText = "";

    button.disabled =!button.disabled;

    userIntro.src = url;
    userIntro.style.display = "block";

    
 
  }



//Initializes the font so it can be used with Canvas.
//Also initializes the Canvas.
f.load().then((font) => {

    document.fonts.add(font);
    console.log("font loaded", font);

    can = document.getElementById('canvas');
    canvas = can.getContext('2d');

    canvas.fillStyle = 'black';
    canvas.fillRect(0,0,1280,713);

    canvas.fillStyle ='white';
    canvas.font = '62px textile_regular';
    canvas.filter = "blur(0.7px)"
    canvas.textAlign = "center";

})

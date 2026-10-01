const opening=document.getElementById('opening');
const video=document.getElementById('video');
const play=document.getElementById('play');
const bar=document.getElementById('progress-bar');
let watchdog;
function finish(){opening.classList.add('finished');document.body.classList.remove('intro-active');video.pause();clearTimeout(watchdog);play.hidden=true;}
function start(){clearTimeout(watchdog);opening.classList.remove('finished');document.body.classList.add('intro-active');bar.style.width='0%';video.currentTime=0;play.hidden=true;watchdog=setTimeout(finish,15000);const attempt=video.play();if(attempt)attempt.catch(()=>{play.hidden=false;});}
video.addEventListener('ended',finish);
video.addEventListener('error',finish);
video.addEventListener('timeupdate',()=>{if(Number.isFinite(video.duration))bar.style.width=`${video.currentTime/video.duration*100}%`;});
document.getElementById('skip').addEventListener('click',finish);
play.addEventListener('click',()=>{video.play().then(()=>{play.hidden=true;}).catch(finish);});
document.addEventListener('keydown',event=>{if(event.key==='Escape')finish();});
if(matchMedia('(prefers-reduced-motion: reduce)').matches)finish();else start();

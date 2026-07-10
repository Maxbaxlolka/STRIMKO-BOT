const firebaseConfig={
apiKey:"AIzaSyBXxee2n1nIekTGo4onZxlTpx_CwCytrp4",
authDomain:"strimko-676be.firebaseapp.com",
databaseURL:"https://strimko-676be-default-rtdb.europe-west1.firebasedatabase.app",
projectId:"strimko-676be",
storageBucket:"strimko-676be.firebasestorage.app",
messagingSenderId:"276012999347",
appId:"1:276012999347:web:9f2448cf1eb53f54d5c6c6"
};
if(!firebase.apps.length)firebase.initializeApp(firebaseConfig);
const ref=firebase.database().ref("messages");
const statusBox=document.getElementById("status");
const enable=document.getElementById("botEnabled");
const count=document.getElementById("messageCount");
const msgs=[
"Привіт всім!","Всім гарного стріму!","GG","Нормально їде 😄","Ого, гарний постріл.","Тайп 5 сьогодні буде?","Як справи?","Дякую за стрім!","Удачі в боях!","Красиво зіграв.","Це було жорстко.","Лайк поставив 👍","Всім привіт.","Я тільки зайшов.","Який модпак?","Скільки FPS?","Яка чутливість?","Піде.","😂😂😂","Це мінус"];
count.textContent=msgs.length;
const speeds={veryslow:[60000,120000],slow:[35000,60000],normal:[20000,35000],fast:[10000,20000],veryfast:[5000,10000],superfast:[2000,5000]};
let timer,index=0,last=-1;
function st(c,t){statusBox.className="status "+c;statusBox.textContent=t;}
function rnd(a,b){return Math.floor(Math.random()*(b-a+1))+a;}
function send(){
 if(!enable.checked)return;
 const mode=document.querySelector('input[name="mode"]:checked').value;
 const finish=document.querySelector('input[name="finish"]:checked').value;
 let i;
 if(mode==="order"){if(index>=msgs.length){if(finish==="stop"){enable.checked=false;st("finished","🔴 Сообщения закончились");return;} index=0;} i=index++;} else {do{i=rnd(0,msgs.length-1)}while(msgs.length>1&&i===last); last=i;}
 ref.push({text:msgs[i],sender:"bot",time:Date.now()});
 st("running","🟢 Работает");
 const s=speeds[document.querySelector('input[name="speed"]:checked').value];
 timer=setTimeout(send,rnd(s[0],s[1]));
}
enable.onchange=()=>{clearTimeout(timer); if(enable.checked){index=0;send();} else st("stopped","🔴 Остановлен");};

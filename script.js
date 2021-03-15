const labels = document.querySelectorAll('.form-group label');
labels.forEach(label => {
    label.innerHTML = label.innerText
            .split('')
            .map((letter, idx)=> `<span style='transition-delay: ${idx * 50}ms;'>${letter}</span>`)
            .join('');
});


const prev = document.getElementById('prev');
const next = document.getElementById('next');
const progress = document.getElementById('progress');
const circles = document.querySelectorAll('.circle')
const container = document.querySelector('.changediv');
const formHeading =  document.querySelector('.personal-info');
let currentActive = 1;
next.addEventListener('click',()=>{
    currentActive++;
    if(currentActive>circles.length){
        currentActive = circles.length;
    }
    update();
    let url = 'contain2.txt';
    fetch(url).then((response)=> {
        response.text().then((html)=> {
            container.innerHTML = html;
        });
});
formHeading.innerHTML = 'Survey Information';
})

prev.addEventListener('click',()=>{
    currentActive--;
    if(currentActive<1){
        currentActive = 1;
    }
    update();
    let url = 'contain1.txt';
    fetch(url).then((response)=> {
        response.text().then((html)=> {
            container.innerHTML = html;
        });
})
formHeading.innerHTML = 'Personal Information';
})

function update(){
    circles.forEach((circle, index)=>{
        if(index < currentActive){
            circle.classList.add('active');
        }else{
            circle.classList.remove('active');
        }
    });

    const actives = document.querySelectorAll('.active');
    progress.style.width = (actives.length - 1)/(circles.length - 1) * 100 + '%';

    if(currentActive === 1){
        prev.disabled = true;
        next.disabled = false
    } else if(currentActive === 2){
        next.disabled = true;
        prev.disabled = false;
    }
}









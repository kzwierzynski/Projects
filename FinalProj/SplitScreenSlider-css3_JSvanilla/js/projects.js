document.addEventListener('DOMContentLoaded', function(){
    let wrapper = document.getElementById('wrapper');
    let topLayer = wrapper.querySelector('.top');
    let topWrap = topLayer.querySelector('.content-wrap');  //added
    let bottomLayer = wrapper.querySelector('.bottom');     //added
    let bottomWrap = bottomLayer.querySelector('.content-wrap') //added
    let handle = wrapper.querySelector('.handle');

    // added coz not using vw anymore -> in container
    bottomLayer.style.width= wrapper.offsetWidth + 'px';
    topLayer.style.width= wrapper.offsetWidth + 'px';
    bottomWrap.style.width= wrapper.offsetWidth + 'px';
    topWrap.style.width= wrapper.offsetWidth + 'px';

    let skew = 0;
    let delta = 0;
  
    if(wrapper.className.indexOf('skewed') != -1){
      skew = 1000;
    }
    
    wrapper.addEventListener('mousemove', function(e){
      delta = (e.clientX - wrapper.offsetWidth / 2) *0.5; // width of the container/wrapper
        console.log(e.clientX, delta)
      handle.style.left = e.clientX + delta + 'px';
  
      topLayer.style.width= e.clientX + skew + delta + 'px';
    });
  });
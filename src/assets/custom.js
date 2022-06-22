function animateValue(id, start, end, duration) {
    // console.log("id",id);
    const obj = document.getElementById(id);
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    //   console.log("obj",obj);
    //   console.log("obj1",(Math.floor(progress * (+end - start) + start)));
      obj.innerHTML = (Math.floor(progress * (+end - start) + start)) || "0";
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
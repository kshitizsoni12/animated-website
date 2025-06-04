function init() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
    lerp: 0.05,  // very smooth/slow
    multiplier: 0.5,  // half speed

  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
  });



  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

}
init();

gsap.from(".sliding-text h1", {
  transformOrigin: "left top",
  transform: "translateY(5%) rotate(7deg)",
  opacity: 0,
  duration: 1.2,
  scrub: 2
})
gsap.from(".sliding-text h2", {
  transformOrigin: "left top",
  transform: "translateY(5%) rotate(7deg)",
  opacity: 0,
  duration: 1.2,
  scrub: 2
})
gsap.from(".sliding-text p", {
  opacity: 0,
  duration: 1.5,
  scrub: 2,
  filter: "blur(3px)",
})


var tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".sliding-text",
    scroller: ".main",
    scrub: 1,
    start: "top 7%",
    end: "top -70%",
    pin: true
  }
})

tl.to(".sliding-text h1", {
  x: -100,
  filter: "blur(3px)",
  opacity: 0
}, "heading")

tl.to(".sliding-text h2", {
  x: 100,
  filter: "blur(3px)",
  opacity: 0
}, "heading")

tl.to(".sliding-text p", {
  filter: "blur(3px)",
  opacity: 0
}, "heading")


tl.to(".page1 video", {
  width: "90%",
  zIndex: 2,
  marginTop: "-80vh"
}, "heading")


var tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".sliding-text ",
    scroller: ".main",
    scrub: 2,
    start: "top -37%",
    end: "top -40%",
  }
})

tl2.to(".main", {
  backgroundColor: "#fefcff",
  color: "#0f0d0d"
})



var tlpage2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".sliding-text ",
    scroller: ".main",
    scrub: 2,
    start: "top -47%",
    end: "top -52%",
  }
})
tlpage2.from(".page2 h2", {
  transformOrigin: "left top",
  transform: "translateY(5%) rotate(7deg)",
  opacity: 0,
  duration: 1,
  scrub: 2
}, "animate")
tlpage2.from(".page2-left", {
  x: -50,
  opacity: 0,
  duration: 1,
  stagger: 0.1
}, "animate")
tlpage2.from(".page2-right", {
  x: 50,
  opacity: 0,
  duration: 1,
  stagger: 0.1
}, "animate")



var tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".sliding-text ",
    scroller: ".main",
    scrub: 1,
    start: "top -437%",
    end: "top -452%",
  }
})

tl3.to(".main", {
  backgroundColor: "#0f0d0d",
  color: "#fefcff"
})

tl3.to(".page3", {
  borderBottom: "1px solid #fefcff"
})

gsap.to(".page5-scroller", {
  transform: "translate(-74%)",
  scrollTrigger: {
    trigger: ".page5",
    scroller: ".main",
    markers: true,
    start: "top-=450 top",
    end: "+=2000",
    scrub: 2,
    pin: true
  }
})



let box = document.querySelectorAll(".sliding-img-box");
box.forEach((el) => {
  el.addEventListener("mouseenter", (event) => {
    el.style.opacity = 1;
    var att = el.getAttribute("data-img");

  })
  el.addEventListener("mouseleave", (event) => {
    el.style.opacity = 0.4;
  })
  let imgg = document.querySelectorAll(".sliding-img-box img")
  el.addEventListener("mousemove", (event) => {
    gsap.to(imgg, {
      x: event.x - 100,
      duration: 0.05,
      scrub: 1
    })
  })
})


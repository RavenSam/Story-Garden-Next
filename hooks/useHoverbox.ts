import { useEffect, useState } from "react"

export default function useHoverbox(selectBound: any) {
   const [hoverOn, setHoverOn] = useState<{ show: boolean; x?: string; y?: string }>({ show: false })

   useEffect(() => {
      const markedWords = Array.from(document.querySelectorAll(".marked-word"))
      // let tooltipContainer = document.querySelector(".tooltip-container")

      markedWords.forEach((el) => {
         el.addEventListener("mouseenter", function (e) {
            // if (tooltipContainer) {
            //  tooltipContainer.classList.add("fade-in")
            //tooltipContainer.style.left = `${e.pageX}px`
            // tooltipContainer.style.top = `${e.pageY}px`
            // }
            console.log("entered")
            //setHoverOn({show:true, x:`${e.pageX}px`, y:`${e.pageY}px`})
         })

         el.addEventListener("mouseout", () => {
            // tooltipContainer.classList.remove("fade-in")
            setHoverOn({ show: false })
         })
      })
   }, [selectBound])

   return { hoverOn }
}

// const tooltips = Array.from(document.querySelectorAll(".tooltip"));
// const tooltipContainer = document.querySelector(".tooltip-container");

// const data = [
//     {id: 1, txt: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque possimus assumenda quis illo minus numquam voluptates nihil, doloremque unde non."},
//     {id: 2, txt: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid, deleniti."},
//     {id: 3, txt: "Lorem ipsum dolor sit amet."}
// ]

// let tooltipID;
// tooltips.forEach((tooltip) => {
//   tooltip.addEventListener("mouseenter", (e) => {

//     tooltipID = e.target.getAttribute('data-id');
//     tooltipContainer.classList.add("fade-in");
//     tooltipContainer.style.left = `${e.pageX}px`;
//     tooltipContainer.style.top = `${e.pageY}px`;
//     tooltipContainer.innerText = data[tooltipID - 1].txt;

//   });

//   tooltip.addEventListener("mouseout", (e) => {
//     tooltipContainer.classList.remove("fade-in");
//   });
// });

// tooltipContainer.addEventListener('mouseenter', () => {

//     tooltipContainer.classList.add("fade-in");

// })
// tooltipContainer.addEventListener('mouseout', () => {

//     tooltipContainer.classList.remove("fade-in");

// })

import { useEffect } from "react"
import { createPortal } from "react-dom";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

function Box (){
const [editor] = useLexicalComposerContext();

  useEffect(()=>{
    let mentions = Array.from(document.querySelectorAll(".mention"))
    let infoBox = document.querySelector(".info-box")

    mentions.forEach((mention) => {
      mention?.addEventListener("mouseenter", (e:any) => {

    infoBox?.classList.add("fade-in");
    infoBox.style.left = `${e.pageX}px`;
    infoBox.style.top = `${e.pageY}px`;
  });

  mention.addEventListener("mouseout", () => {
    infoBox?.classList.remove("fade-in");
  });
});

},[editor])

  return(


    <div className="info-box absolute flex items-center justify-center w-32 h-32 bg-gray-800 z-10 text-white shadow-float rounded-xl">
      Loading...
    </div>

  )
}

export default function HoverMentionBox () {
   return(
  <Box/> 
  )
}
// https://pargles.com/posts/medium-like-text-highlighting-in-react
// http://jsfiddle.net/VRcvn/

export const surroundSelection = (quill: any) => {
   var span = document.createElement("span")
   span.style.fontWeight = "bold"
   span.style.color = "green"

   if (window.getSelection) {
      var sel = window.getSelection()
      if (sel?.rangeCount) {
         var range = sel.getRangeAt(0).cloneRange()
         const r = quill.getSelection()
         range.surroundContents(span)
         sel.removeAllRanges()
         sel.addRange(range)

         console.log({ r, range })
      }
   }
}

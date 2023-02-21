import { RefObject, useEffect, useState } from "react"

export const useContainerDimensions = (myRef: RefObject<HTMLDivElement>, menuOpen?: boolean) => {
   const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

   useEffect(() => {
      const getDimensions = () => ({
         width: myRef?.current?.offsetWidth ? myRef?.current?.offsetWidth : 0,
         height: myRef?.current?.offsetHeight ? myRef?.current?.offsetHeight : 0,
      })

      const handleResize = () => {
         setDimensions(getDimensions())
      }

      if (myRef.current) {
         setDimensions(getDimensions())
      }

      window.addEventListener("resize", handleResize)

      return () => {
         window.removeEventListener("resize", handleResize)
      }
   }, [myRef, menuOpen])

   return dimensions
}

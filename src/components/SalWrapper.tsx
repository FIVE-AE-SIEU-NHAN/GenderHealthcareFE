import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import sal from "sal.js"

export default function SalWrapper() {
  const location = useLocation()

  useEffect(() => {
    sal({
      root: null,
      threshold: 0.1,
      once: true,
    })
  }, [location])

  return null
}

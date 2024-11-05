import { createSystem, defineConfig } from "@chakra-ui/react"
// import { animationStyles } from "./src/animation-styles"

const config = defineConfig({
  theme: {
    // extend: {
    //   animationStyles,
    // },
  },
})

export default createSystem(config)

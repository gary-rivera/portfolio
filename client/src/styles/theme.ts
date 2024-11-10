import { createSystem, defaultBaseConfig, defaultConfig, defineConfig } from "@chakra-ui/react"


const config = defineConfig({
  ...defaultBaseConfig,
  theme: {
    tokens: {
      colors: {},
    },
  },
  cssVarsRoot: ":where(:root, :host)",
})

export const system = createSystem(config, defaultConfig)

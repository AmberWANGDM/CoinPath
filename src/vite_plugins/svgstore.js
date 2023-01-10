/* eslint-disable */
import path from 'path'
import fs from 'fs'
import store from 'svgstore' // 用于制作 SVG Sprites
import { optimize } from 'svgo' // 用于优化 SVG 文件

export const svgstore = (options = {}) => {
  const inputFolder = options.inputFolder || 'src/assets/icons'
  return {
    name: 'svgstore',
    // 解析 @svgstore 为 svg_bundle.js
    resolveId(id) {
      if (id === '@svgstore') {
        return 'svg_bundle.js'
      }
    },
    load(id) {
      if (id === 'svg_bundle.js') {
        const sprites = store(options)
        const iconsDir = path.resolve(inputFolder)
        // 遍历 icons 目录下的所有 svg 文件, 并添加到 sprites 中
        for (const file of fs.readdirSync(iconsDir)) {
          const filepath = path.join(iconsDir, file)
          const svgid = path.parse(file).name
          let code = fs.readFileSync(filepath, { encoding: 'utf-8' })
          sprites.add(svgid, code)
        }
        // 优化 svg 文件
        const { data: code } = optimize(
          sprites.toString({ inline: options.inline }),
          {
            plugins: [
              'cleanupAttrs',
              'removeDoctype',
              'removeComments',
              'removeTitle',
              'removeDesc',
              'removeEmptyAttrs',
              {
                name: 'removeAttrs',
                params: { attrs: '(data-name|data-xxx)' },
              }, // 移除 data-name 和 data-xxx 属性
            ],
          }
        )
        return `const div = document.createElement('div')
div.innerHTML = \`${code}\`
const svg = div.getElementsByTagName('svg')[0]
if (svg) {
  svg.style.position = 'absolute'
  svg.style.width = 0
  svg.style.height = 0
  svg.style.overflow = 'hidden'
  svg.setAttribute("aria-hidden", "true")
}
// listen dom ready event
document.addEventListener('DOMContentLoaded', () => {
  if (document.body.firstChild) {
    document.body.insertBefore(div, document.body.firstChild)
  } else {
    document.body.appendChild(div)
  }
})`
      }
    },
  }
}

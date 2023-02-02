import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// @ts-nocheck
import { svgstore } from './src/vite_plugins/svgstore';

// https://vitejs.dev/config/
export default defineConfig({
  base:'https://coinpath.oss-cn-hangzhou.aliyuncs.com',
  build:{
    rollupOptions:{
        output:{
          manualChunks(id:any){
            if(id.includes('echarts')){
              return 'echarts'
            }
            if(id.includes('vant')){
              return 'vant'
            }
            if(id.includes('faker') || id.includes('mock')){
              return 'mock'
            }
            if(id.includes('node_modules')){
              return 'vendor'
            }
          }
      }
    }
  },
  plugins: [
    vue(),
    vueJsx({
      transformOn: true,
      mergeProps: true
    }),
    svgstore()
  ],
  server:{
    proxy:{
      '/api/v1':{
        target:'http://121.196.236.94:3000/',
        changeOrigin: true,
      }
    }
  }
})

// const req = require.context('./svg', false, /\.svg$/)
// const requireAll = context => context.keys().map(context => {
//   console.log(req(context))
//   console.log(context)
// })
// requireAll(req)

const iconFiles = require.context('./svg', true, /\.svg$/)
//
// console.log(iconFiles)
const svgIcons = iconFiles.keys().reduce((icons, iconPath) => {
  const iconName = iconPath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = iconFiles(iconPath)
  icons[iconName] = value.default || value
  return icons
}, {})
svgIcons.forEach(item => {
})
console.log(svgIcons)
export default svgIcons

// import Vue from 'vue'
// import {DEVICE_TYPE, deviceEnquire} from '@/utils/device'
import { mapState, mapGetters } from 'vuex'
import { convertRoutes } from './routeConvert'
import { appConfig } from '@/config'

const mixinMenu = {
  data () {
    return {
      oldMenu: ['cm', 'sms', 'timetable', 'tpms', 'tams', 'srtp', 'trpms'],
      selfSystemCode: appConfig.systemCode,
      menus: [],
      systemList: [],
      openKeys: [],
      selectedKeys: [],
      rootSubmenuKeys: []
    }
  },
  computed: {
    ...mapState({
      systems: state => state.permission.systems
    }),
    ...mapGetters(['curSystem'])
  },
  watch: {
    curSystem: {
      handler (val) {
        this.processMenu(val)
      },
      immediate: true
    },
    menus: {
      handler () {
        this.setRootSubmenuKeys()
      },
      immediate: true
    },
    $route () {
      this.updateMenuSelect()
    }
  },
  created () {
    this.processMenu(this.curSystem)
  },
  mounted () {
    this.updateMenuSelect()
  },
  methods: {
    processMenu (systemCode) {
      if (!this.systems) return
      const curSystem = this.systems.find(system => system.code === systemCode) || {}
      const routers = curSystem.accessedRouters
      if (!this.oldMenu.includes(systemCode)) {
        if (systemCode === this.selfSystemCode) {
          const routes = convertRoutes(routers.find(item => item.path === '/'))
          this.menus = (routes && routes.children) || []
        } else {
          this.menus = routers || []
        }

        this.menus.map(item => {
          if (item.x) {
            this.maxMenuX = Math.max(this.maxMenuX, item.x)
          }
        })
      } else {
        this.menus = this.disposeOldMenu(routers)
      }
    },
    disposeOldMenu (routers) {
      const menus = []
      if (!routers) return
      const routes = JSON.parse(JSON.stringify(routers || []))
      const maxY = {}
      if (!routes) return
      routes.map(item => {
        if (item.menuLevel === 1 && item.coordinateX) {
          menus.push(item)
          maxY[item.coordinateX] = Math.max(maxY[item.coordinateX] || 0, item.coordinateY)
        }
      })
      menus.sort((a, b) => {
        return a.coordinateX - b.coordinateX
      })
      menus.forEach((item, index) => {
        let nextY = 100
        if (menus[index + 1]) {
          nextY = menus[index + 1].coordinateX === item.coordinateX ? menus[index + 1].coordinateY : 100
        }
        item.minY = item.coordinateY
        item.maxY = nextY
      })
      routes.map(item => {
        if (item.meta && item.menuLevel && item.menuLevel !== 0 && item.menuLevel !== 1 && item.coordinateX !== 0) {
          const { coordinateX: x, coordinateY: y } = item
          this.maxMenuX = Math.max(this.maxMenuX, Number(x || 0))
          const i = menus.findIndex((ele, index) => {
            return ele.coordinateX === x && ele.minY < y && ele.maxY > y
          })
          if (i !== -1) {
            if (!menus[i].children) {
              menus[i].children = []
            }
            menus[i].children.push(item)
          }
        }
      })
      return menus
    },
    updateMenuSelect () {
      const routes = this.$route.matched.concat()
      // const { hidden } = this.$route.meta
      if (routes.length >= 3) {
        this.selectedKeys = [routes[2].path]
      } else {
        this.selectedKeys = [routes.pop().path]
      }

      if (!this.fixOpenKeys) {
        const openKeys = []
        routes.forEach(item => {
          openKeys.push(item.path)
        })
        this.openKeys = openKeys
      }
    },
    onOpenChange (openKeys) {
      if (this.fixOpenKeys) {
        this.openKeys = openKeys
        return
      }
      const latestOpenKey = openKeys.find(key => !this.openKeys.includes(key))
      if (!this.rootSubmenuKeys.includes(latestOpenKey)) {
        if (!this.fixOpenKeys) {
          this.openKeys = latestOpenKey ? [latestOpenKey] : []
        } else {
          this.openKeys = openKeys
        }
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },
    onSelect (obj) {
      this.selectedKeys = obj.selectedKeys
    },

    setRootSubmenuKeys () {
      const rootSubmenuKeys = []
      this.menus.forEach(item => {
        rootSubmenuKeys.push(item.path)
      })

      if (this.fixOpenKeys) {
        this.rootSubmenuKeys = rootSubmenuKeys
        const openKeys = []
        this.rootSubmenuKeys.forEach(item => {
          openKeys.push(item)
        })
        this.openKeys = openKeys
      }
    }
  }
}

export { mixinMenu }

/* eslint-disable @typescript-eslint/no-explicit-any */
import Emitter from 'events'
import { Bind } from './bind/index.js'
import BindList from './bind/list.js'
import BindSite from './bind/site.js'
import BindHash from './bind/hash.js'
import Look from './index.js'
import BindSink from './bind/sink.js'

type SaveHook = {
  bond: Bind
  name: string
}

type FillLoad = {
  base?: Fill
  look: Look
  name?: string
}

export default class Fill extends Emitter {
  // how many things we've bound
  seekSize: number

  // how many things we've resolved
  haveSize: number

  takeVibe: boolean

  fill: Record<string, Record<string, Fill>>

  takeFill: Record<string, boolean>

  // parent
  base?: Fill

  bindTest: Record<string, boolean>

  sealVibe: boolean

  look: Look

  name?: string

  constructor({ look, base, name }: FillLoad) {
    super()
    this.name = name
    this.look = look
    this.base = base
    this.fill = {}
    this.seekSize = 0
    this.haveSize = 0
    this.takeVibe = false
    this.takeFill = {}
    this.bindTest = {}
    this.sealVibe = false
  }

  seekRise() {
    this.seekSize++
    this.base?.seekRise()
  }

  hold(bond: Bind) {
    this.bind(bond)
    this.load(bond)
  }

  bindSite(bond: BindSite) {
    this.bindTest[bond.code] = true

    bond.on(`save`, ({ name, bond: nestBond }: SaveHook) => {
      this.holdLink(bond.code, name, nestBond)
    })

    for (const name in this.look.link) {
      this.bindSiteLink(name, bond)
    }
  }

  bindSiteLink(name: string, bond: BindSite) {
    const look = this.look.link[name]
    const fillHash = (this.fill[name] ??= {})

    if (look) {
      fillHash[bond.code] ??= new Fill({ base: this, look })
      this.seekRise()
    }
  }

  bindList(bond: BindList) {
    this.bindTest[bond.code] = true

    // this.seekRise() // for the seal on the list

    bond.on(`save`, (bond: Bind) => {
      // this.seekRise()
      this.hold(bond)
    })

    bond.on(`seal`, () => {
      this.haveRise()
    })

    bond.dock.forEach(bond => {
      this.hold(bond)
    })
  }

  bindSink(bond: BindSink) {
    this.bindTest[bond.code] = true

    // this.seekRise()

    bond.on(`save`, () => {
      this.haveRise()
    })
  }

  bindHash(bond: BindHash) {
    this.bindTest[bond.code] = true

    // this.seekRise()

    bond.on(`save`, () => {
      this.haveRise()
    })
  }

  bind(bond: Bind) {
    if (bond instanceof BindSite && !this.bindTest[bond.code]) {
      this.bindSite(bond)

      return
    }

    if (bond instanceof BindList && !this.bindTest[bond.code]) {
      this.bindList(bond)

      return
    }

    if (bond instanceof BindSink && !this.bindTest[bond.code]) {
      this.bindSink(bond)

      return
    }

    if (bond instanceof BindHash && !this.bindTest[bond.code]) {
      this.bindHash(bond)

      return
    }
  }

  loadSite(bond: BindSite) {
    for (const name in this.fill) {
      if (bond.have(name)) {
        const link = bond.read(name)
        if (link) {
          this.loadLink(bond.code, name, link)
        }
      }
    }
  }

  loadList(bond: BindList) {
    bond.dock.forEach(bond => {
      this.load(bond)
    })
  }

  loadSink(bond: BindSink) {}

  load(bond: Bind) {
    if (bond instanceof BindSite) {
      this.loadSite(bond)
    }

    if (bond instanceof BindList) {
      this.loadList(bond)
    }

    if (bond instanceof BindSink) {
      this.loadSink(bond)
    }

    this.haveRise()
  }

  loadLink(code: string, name: string, bond: Bind) {
    const look = this.look.link[name]
    if (!look) {
      return
    }

    const fillHash = this.fill[name]

    if (!fillHash) {
      return
    }

    const fill = fillHash[code]

    if (!fill) {
      return
    }

    fill.load(bond)
  }

  holdLink(code: string, name: string, bond: Bind) {
    const look = this.look.link[name]
    if (!look) {
      return
    }

    const fillHash = this.fill[name]

    if (!fillHash) {
      return
    }

    const fill = fillHash[code]

    if (!fill) {
      return
    }

    fill.hold(bond)
  }

  haveRise() {
    if (this.takeVibe) {
      return
    }

    this.haveSize++

    this.take()

    this.base?.haveRise()
  }

  take() {
    console.log('seal', this.name, this.haveSize, this.seekSize)
    if (this.takeVibe) {
      return
    }

    if (this.haveSize === this.seekSize) {
      this.takeVibe = true
      this.emit('take')
    }
  }
}

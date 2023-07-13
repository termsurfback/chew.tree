/* eslint-disable @typescript-eslint/no-explicit-any */

export default class Look {
  link: Record<string, Look>

  constructor() {
    this.link = {}
  }

  seek(name: string) {
    const look = new Look()
    this.link[name] = look
    return look
  }
}

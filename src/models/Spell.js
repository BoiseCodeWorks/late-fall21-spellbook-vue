export class Spell {
  constructor(data) {
    this.id = data.id || ''
    this.index = data.index || ''
    this.name = data.name
    this.range = data.range
    this.components = data.components
    this.duration = data.duration
    this.level = data.level
    this.prepared = data.prepared || false
    this.description = data.description || data.desc?.join('\n\n')
  }
}
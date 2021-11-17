import { AppState } from "../AppState"
import { Spell } from "../models/Spell"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

function sortSpellsAZ(arr) {
  return arr.sort((a, b) => {
    return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0
  })
}

function sortSpellsByLevel(arr) {
  return arr.sort((a, b) => {
    return (a.level < b.level) ? -1 : (a.level > b.level) ? 1 : 0
  })
}

class MySpellService {
  async getMySpells() {
    const res = await api.get(`api/${AppState.account.name}/spells`)
    logger.log('My Spells', res.data)
    AppState.mySpells = sortSpellsAZ(res.data.map(s => new Spell(s)))
  }

  async addSpell() {
    const res = await api.post(`api/${AppState.account.name}/spells`, AppState.activeSpell)
    logger.log('Added Spell')
    const spell = new Spell(res.data)
    AppState.activeSpell = spell
    AppState.mySpells.push(spell)
    AppState.mySpells = sortSpellsAZ(AppState.mySpells)
  }

  async removeSpell() {
    const res = await api.delete(`api/${AppState.account.name}/spells/${AppState.activeSpell.id}`)
    logger.log('removed Spell')
    AppState.mySpells.filter(s => s.id != AppState.activeSpell.id)
    AppState.activeSpell = null
  }

  async prepareToggle() {
    AppState.activeSpell.prepared = !AppState.activeSpell.prepared
    await api.put(`api/${AppState.account.name}/spells/${AppState.activeSpell.id}`, AppState.activeSpell)
  }

}
export const mySpellService = new MySpellService()
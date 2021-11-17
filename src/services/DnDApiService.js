import { AppState } from "../AppState"
import { Spell } from "../models/Spell"
import { dndApi } from "./AxiosService"



class DnDApiService {
  async getDndApiSpells() {
    const res = await dndApi.get('')
    AppState.dndApiSpells = res.data.results
  }

  async getDndApiSpellByIndex(index) {
    const res = await dndApi.get(index)
    const spell = new Spell(res.data)
    AppState.activeSpell = spell
  }


}

export const dnDApiService = new DnDApiService()
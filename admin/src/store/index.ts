import Vue from 'vue'
import Vuex from 'vuex'
import { IAppState } from './modules/app'
import { IUserState } from './modules/user'

Vue.use(Vuex)

/**
 * 定义根状态
 */
export interface IRootState {
  app: IAppState
  user: IUserState
}

export default new Vuex.Store<IRootState>({})

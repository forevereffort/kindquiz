import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import _ from 'lodash'
Vue.use(Vuex)

// TODO Andy replace uuidv4
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export default {
  state: () => {
    return {
      responses: [],
      tempUserProfileId: null,
    }
  },
  getters: {
    responses (state) {
      return state.responses
    },
    tempUserProfileId (state) {
      return state.tempUserProfileId
    },
  },
  mutations: {
    tempUserProfileId (state, payload) {
      state.tempUserProfileId = payload
    },
    setResponses (state, responses) {
      state.responses = responses
    },
    pushResponse (state, payload) {
      state.responses.push(payload)
      localStorage.setItem('responses', state.responses)
    },
    updateResponse (state, payload) {
      let index = _.findIndex(state.responses, {itemId: payload.itemId})
      state.responses.splice(index, 1, payload)
      localStorage.setItem('responses', state.responses)
    },

  },
  actions: {
    setEnvironment  ({ commit }) {
      commit('tempUserProfileId', localStorage.getItem('tempUserProfileId'))
    }, 
    async recordResponse ({ commit, state }, response) {
      const payload = { ...response }
      let tempUserProfileId = localStorage.getItem('tempUserProfileId')

      if (!tempUserProfileId) {
        tempUserProfileId = uuidv4()
        localStorage.setItem('tempUserProfileId', tempUserProfileId)
        commit('tempUserProfileId', tempUserProfileId)
      }

      let objectToUpdate = _.find(state.responses, { itemId: payload.itemId })

      if (objectToUpdate) {
        commit('updateResponse', payload)
      } else {
        commit('pushResponse', payload)
      }
    },

    
    loadSurveyJSON({ commit }, payload) {
      return new Promise(async (resolve, reject) => {
        try {
          let res = await axios.post('/getsurveyJSONbyname', { name: payload.surveyName })
          let reconstructedSurveyObject = res.data.quickLoadJSON
          commit('loadSurvey', reconstructedSurveyObject)
          reconstructedSurveyObject.forEach(page => {
            page.items.forEach(item => {
              item.responses.forEach(response => {
                response.clicked = false
              })
            })
          })
          resolve(JSON.parse(JSON.stringify(reconstructedSurveyObject)))
        } catch (e) {
          console.log(e)
          reject(e)
        }
      })
    },
  }, 
  modules: {
  }
}




// let reconstructedSurvey = (surveyData) => {
//   let pages = _.sortBy(surveyData[0].pages, 'sequence')
//   let items = _.sortBy(surveyData[0].items, 'sequence')
//   let responses = _.sortBy(surveyData[0].responses, 'sequence')

//   if (pages) {
//       for (var i = 0; i < pages.length; i++) {
//           if (items) {
//               for (var j = 0; j < items.length; j++) {
//                   for (var k = 0; k < responses.length; k++) {
//                       // console.log(responses[k])
//                       responses[k].clicked = false
//                       if (items[j].id === responses[k].itemId) {  // match up responses to items first
//                           // console.log('match')
//                           if (items[j].responses) {
//                               if (!_.some(items[j].responses, responses[k])) {
//                                   items[j].responses.push(responses[k])
//                               }
//                           } else {
//                               items[j].responses = []
//                               items[j].responses.push(responses[k])
//                           }
//                       }
//                   }
//                   if (pages[i].id === items[j].pageId) { // after responses matched to items, match items to pages
//                       if (pages[i].items) {
//                           pages[i].items.push(items[j])
//                       } else {
//                           pages[i].items = []
//                           pages[i].items.push(items[j])
//                       }
//                   }
//               }
//           }
//       }
//   }
//   pages.forEach(element => { // this is setting active to false for the vue-draggable DIVs to expand above
//       element.active = false
//   });
//   let survey = {
//       title: surveyData[0].title,
//       pages
//   }
//   return JSON.parse(JSON.stringify(survey))
// }

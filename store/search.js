export const state = () => ({
  popularCategories: [
    {
      id: 1,
      title: 'Завод КЭС – победитель народного голосования премии «Малая энергетика – большие достижения»!',
      url: '#',
      category: 1
    },
    {
      id: 2,
      title: 'Когенерационная газопоршневая электростанция мощностью в 1 МВт',
      url: '#',
      category: 2
    },
    {
      id: 3,
      title: 'Аренда оборудования',
      url: '#',
      category: 3
    },
    {
      id: 4,
      title: 'Монтаж и пусконаладка',
      url: '#',
      category: 4
    },
    {
      id: 5,
      title: 'Вакансии',
      url: '#',
      category: 5
    }
  ],
  history: [
    {
      id: 1,
      title: 'Газовый генератор PERKINS TJ530PE-NG5S',
      url: '#'
    },
    {
      id: 2,
      title: 'Газовый генератор DOOSAN TJ430DW-NG5S',
      url: '#'
    },
    {
      id: 3,
      title: 'Вакансии',
      url: '#'
    },
    {
      id: 4,
      title: 'Монтаж и пусконаладка',
      url: '#'
    }
  ],
  morphSearchResults: [
    {
      id: 1,
      title: 'Дизельная электростанция Caterpillar GEP165',
      url: '#'
    },
    {
      id: 2,
      title: 'Дизельный генератор ТСС АД-250С-Т400-1РМ11',
      url: '#'
    },
    {
      id: 3,
      title: 'Дизельный генератор GenPower GNT 220 S',
      url: '#'
    },
    {
      id: 4,
      title: 'Дизельный генератор Energo ED 30/230 Y-SS',
      url: '#'
    }
  ],
  searchResultsEquipments: []
})

export const mutations = {
  setSearchResultEquipments (state, array) {
    state.searchResultsEquipments = array
  }
}

export const actions = {
  getSearchResultEquipments (ctx, data) {
    return new Promise(resolve => {
      setTimeout(() => {
        let res = require('~/DATABASE/searchResultsEquipments.js').default
        ctx.commit('setSearchResultEquipments', res)
        resolve()
      }, 1500)
    })
  }
}

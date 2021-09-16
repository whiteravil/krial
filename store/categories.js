export const state = () => ({
  categories: [
    {
      id: 1,
      title: 'Реализованные проекты',
      url: '#'
    },
    {
      id: 2,
      title: 'Новости',
      url: '#'
    },
    {
      id: 3,
      title: 'Аренда',
      url: '#'
    },
    {
      id: 4,
      title: 'Услуги',
      url: '#'
    },
    {
      id: 5,
      title: 'О компании',
      url: '#'
    }
  ]
})

export const getters = {
  getCurrentCategory: state => index => {
    return state.categories.filter(item => item.id === index)[0]
  }
}

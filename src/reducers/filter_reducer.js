import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { formatPrice } from '../utils/helpers'

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((p) => p.price)
    maxPrice = Math.max(...maxPrice)

    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    }
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true }
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false }
  }
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload }
  }
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state
    let tempProduct = [...filtered_products]

    if (sort === 'price-lowest') {
      tempProduct = tempProduct.sort((a, b) => {
        // short way
        // a.price - b.price)

        // long way
        if (a.price < b.price) {
          // here a will be place before b as a.price is less then b.price
          return -1
        }
        if (a.price > b.price) {
          // here a will be place after b as a.price is greater then b.price
          return 1
        }
        return 0
      })
    }
    if (sort === 'price-highest') {
      tempProduct = tempProduct.sort((a, b) => b.price - a.price)
    }
    if (sort === 'name-a') {
      tempProduct = tempProduct.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
    }
    if (sort === 'name-z') {
      tempProduct = tempProduct.sort((a, b) => {
        return b.name.localeCompare(a.name)
      })
    }

    return { ...state, filtered_products: tempProduct }
  }
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload
    return { ...state, filters: { ...state.filters, [name]: value } }
  }
  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state
    const { text, category, company, color, price, shipping } = state.filters
    let tempProduct = [...all_products]

    // filtering
    if (text) {
      tempProduct = tempProduct.filter((product) => {
        return product.name.toLowerCase().startsWith(text)
      })
    }
    // category
    if (category !== 'all') {
      tempProduct = tempProduct.filter((product) => {
        return product.category === category
      })
    }
    // company
    if (company !== 'all') {
      tempProduct = tempProduct.filter((product) => {
        return product.company === company
      })
    }
    // color
    if (color !== 'all') {
      tempProduct = tempProduct.filter((product) => {
        return product.colors.find((c) => c === color)
      })
    }

    // price
    tempProduct = tempProduct.filter((product) => product.price <= price)

    // sshipping
    if (shipping) {
      tempProduct = tempProduct.filter((product) => {
        return product.shipping === true
      })
    }

    return { ...state, filtered_products: tempProduct }
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: state.filters.max_price,
        shipping: false,
      },
    }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer

import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ProductsProvider } from './context/products_context'
import { FilterProvider } from './context/filter_context'
import { CartProvider } from './context/cart_context'
import { UserProvider } from './context/user_context'
import { Auth0Provider } from '@auth0/auth0-react'

// dev-cq8lto8n.us.auth0.com
// v0lasJl2xIXIPSzU93MQpj7gkgE81oGt

ReactDOM.render(
  <Auth0Provider
    domain='dev-cq8lto8n.us.auth0.com'
    clientId='v0lasJl2xIXIPSzU93MQpj7gkgE81oGt'
    redirectUri={window.location.origin}
    cacheLocation='localstorage'
  >
    <UserProvider>
      <ProductsProvider>
        <FilterProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FilterProvider>
      </ProductsProvider>
    </UserProvider>
  </Auth0Provider>,
  document.getElementById('root')
)

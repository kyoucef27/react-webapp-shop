import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CartProvider from './Hooks/Hooks.jsx'
import PopOverHook from './Hooks/PopOverHook.jsx'
import SearchHooks from './Hooks/SearchHooks.jsx'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import 'swiper/css/autoplay'

createRoot(document.getElementById('root')).render(
  <SearchHooks>
    <CartProvider>
      <PopOverHook>
        <App />
      </PopOverHook>
    </CartProvider>
  </SearchHooks>
)
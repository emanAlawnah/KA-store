import React from 'react'
import routes from './Routes'
import { RouterProvider } from 'react-router'

export default function App() {
  return (
      <RouterProvider router={routes} />

  )
}

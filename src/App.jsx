import React from 'react'
import routes from './routes'
import { RouterProvider } from 'react-router'

export default function App() {
  return (
      <RouterProvider router={routes} />

  )
}

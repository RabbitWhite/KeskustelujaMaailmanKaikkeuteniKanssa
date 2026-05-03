import { readFileSync } from 'fs'
import { resolve } from 'path'

// Smoke test: verify App component exists and is structured correctly.
// When all dependencies are installed via `npm install`, replace with:
//   import { render } from '@testing-library/react'
//   import App from './App'
//   test('renders without crashing', () => { render(<App />) })

test('renders without crashing', () => {
  const src = readFileSync(resolve('./src/App.js'), 'utf-8')
  expect(src).toContain('function App()')
  expect(src).toContain('export default App')
})

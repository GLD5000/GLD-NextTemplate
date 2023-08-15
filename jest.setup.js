import '@testing-library/jest-dom/extend-expect'
import React from 'react'

function MockImage(props) {
    return React.createElement('img', props)
}
jest.mock('next/image', () => MockImage)

import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home component', () => {
    it('renders correctly', () => {
        render(<Home />)

        const heroHeading = screen.getByTestId('hero-heading')
        expect(heroHeading).toBeInTheDocument()

        const madeByText = screen.getByText(/Made by GLD5000/i)
        expect(madeByText).toBeInTheDocument()
    })
})

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('Simple App test', () => {
	it('shows STAG Project text', async () => {
		render(<App />);

		await screen.findByRole('heading');

		expect(screen.getByRole('heading')).toHaveTextContent('STAG Project');
	});
});

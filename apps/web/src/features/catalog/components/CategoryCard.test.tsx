import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { CategoryCard } from './CategoryCard';

import type { CategoryCardActions } from './CategoryCard';
import type { CategoryFieldsFragment } from '@/graphql/__generated__/graphql';

const category: CategoryFieldsFragment = {
  id: 'category-1',
  name: 'Notebooks',
  iconEmoji: null,
  description: null,
  version: 1,
  productCount: 2,
};

describe('CategoryCard exports', () => {
  it('exports only the selected category in the chosen format', () => {
    const onExport = vi.fn();
    const actions: CategoryCardActions = {
      exporting: false,
      onAddProduct: vi.fn(),
      onEdit: vi.fn(),
      onDelete: vi.fn(),
      onExport,
    };
    render(<CategoryCard category={category} actions={actions} />);

    fireEvent.pointerDown(screen.getByRole('button', { name: 'Export Notebooks' }), {
      button: 0,
      ctrlKey: false,
    });
    fireEvent.click(screen.getByText('CSV'));

    expect(onExport).toHaveBeenCalledWith(category, 'csv');
  });
});

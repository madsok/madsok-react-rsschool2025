import React from 'react';
import { describe, it, expect } from 'vitest';
import AppLayout from './layout';

vi.mock('next-intl', () => ({
  hasLocale: (locales: string[], locale: string) => locales.includes(locale),
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

vi.mock('next/navigation', () => ({
  notFound: () => {
    throw new Error('notFound called');
  },
}));

vi.mock('../../i18n/routing', () => ({
  routing: { locales: ['en', 'gb', 'be'] },
}));

describe('AppLayout', () => {
  it('render wrong locale', async () => {
    const params = Promise.resolve({ locale: 'en' });

    const element = await AppLayout({
      children: <div>Test Child</div>,
      params,
    });

    expect(element.props.children.props.children).toBeDefined();
  });

  it('call notFound wrong locale', async () => {
    const params = Promise.resolve({ locale: 'ru' });

    await expect(AppLayout({ children: <div />, params })).rejects.toThrow(
      'notFound'
    );
  });
});

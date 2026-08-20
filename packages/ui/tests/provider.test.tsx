import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import { WabtechsProvider, useDensity, useLocale, useWabtechs } from '../src/providers/wabtechs-provider';

function DensityProbe(): React.JSX.Element {
  const { density, setDensity } = useDensity();
  return (
    <button type="button" onClick={() => setDensity('spacious')}>
      density:{density}
    </button>
  );
}

function LocaleProbe(): React.JSX.Element {
  const { locale } = useLocale();
  return <span>locale:{locale}</span>;
}

function FullProbe(): React.JSX.Element {
  const { theme, resolvedTheme, density, locale, dir } = useWabtechs();
  return (
    <output>
      {theme}/{resolvedTheme}/{density}/{locale}/{dir}
    </output>
  );
}

describe('WabtechsProvider', () => {
  beforeEach(() => {
    const html = document.documentElement;
    html.removeAttribute('data-wt-theme');
    html.removeAttribute('data-wt-density');
    html.removeAttribute('lang');
    html.removeAttribute('dir');
    html.removeAttribute('style');
  });

  it('drives theme/density/locale/direction attributes on <html>', async () => {
    render(
      <WabtechsProvider theme="dark" density="compact" locale="en" dir="rtl">
        <span>app</span>
      </WabtechsProvider>,
    );
    await waitFor(() => {
      expect(document.documentElement).toHaveAttribute('data-wt-theme', 'dark');
    });
    expect(document.documentElement).toHaveAttribute('data-wt-density', 'compact');
    expect(document.documentElement).toHaveAttribute('lang', 'en');
    expect(document.documentElement).toHaveAttribute('dir', 'rtl');
  });

  it('defaults to comfortable density and fr locale', async () => {
    render(
      <WabtechsProvider>
        <DensityProbe />
        <LocaleProbe />
      </WabtechsProvider>,
    );
    expect(screen.getByText('density:comfortable')).toBeInTheDocument();
    expect(screen.getByText('locale:fr')).toBeInTheDocument();
  });

  it('allows switching density through context', async () => {
    render(
      <WabtechsProvider>
        <DensityProbe />
      </WabtechsProvider>,
    );
    const button = screen.getByRole('button');
    button.click();
    await waitFor(() => {
      expect(screen.getByText('density:spacious')).toBeInTheDocument();
    });
    expect(document.documentElement).toHaveAttribute('data-wt-density', 'spacious');
  });

  it('exposes the full config through useWabtechs', () => {
    render(
      <WabtechsProvider defaultTheme="light" defaultDensity="compact" defaultLocale="sw">
        <FullProbe />
      </WabtechsProvider>,
    );
    expect(screen.getByText(/light\/light\/compact\/sw\/ltr/)).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <WabtechsProvider theme="light">
        <button type="button">OK</button>
      </WabtechsProvider>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

import { QueryClientProvider } from "@tanstack/react-query";
import { render, RenderOptions, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Q } from "vitest/dist/types-aac763a5";
import { queryClient } from "../config";

type TestWrapperProps = {
  children: React.ReactNode;
};

const TestWrapper = (props: TestWrapperProps) => {
  const { children } = props;

  return (
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </MemoryRouter>
  );
};

/**
 * Finds and checks that element is found within parent element
 * @param parent the element to query for element under
 * @param query the query string to search for element by
 * @returns the element if it was found, otherwise null
 */
export const searchForChildElementWithQuery = (parent: HTMLElement | Element, query: string) =>
  waitFor(
    () => {
      const element = parent.querySelector(query);
      expect(element).toBeInTheDocument();
      return element;
    },
    { timeout: 5000 }
  );

export const wrappedRender = (ui: React.ReactElement, options?: Omit<RenderOptions, "queries">) =>
  render(ui, { wrapper: TestWrapper, ...options });

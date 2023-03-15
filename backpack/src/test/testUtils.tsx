import { QueryClientProvider } from "@tanstack/react-query";
import { render, RenderOptions } from "@testing-library/react";
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

export const wrappedRender = (ui: React.ReactElement, options?: Omit<RenderOptions, "queries">) =>
  render(ui, { wrapper: TestWrapper, ...options });

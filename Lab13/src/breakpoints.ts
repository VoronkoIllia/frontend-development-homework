interface Breakpoints {
  mobile: string;
  tablet: string;
  desktop: string;
  huge: string;
}

export const BREAKPOINTS: Breakpoints = {
  mobile: "(max-width: 600px)",
  tablet: "(min-width: 601px) and (max-width: 900px)",
  desktop: "(min-width: 901px) and (max-width: 1200px)",
  huge: "(min-width: 1201px)",
};

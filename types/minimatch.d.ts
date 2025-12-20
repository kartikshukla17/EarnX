declare module 'minimatch' {
  export function minimatch(target: string, pattern: string, options?: any): boolean;
  export default minimatch;
}

declare module 'picomatch' {
  export function picomatch(pattern: string, options?: any): (str: string) => boolean;
  export default picomatch;
}

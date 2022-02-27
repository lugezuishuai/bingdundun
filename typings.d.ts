declare module '*.css';
declare module '*.less';
declare module '*.md';
declare module '*.png' {
  const content: any;
  export default content;
}
declare module '*.json' {
  const value: any;
  export default value;
}
declare module '*.svg' {
  export const ReactComponent: React.FC<React.SVGAttributes<React.ReactSVGElement>>;
  const value: string;
  export default value;
}

declare var _SSR_DATA: {
  [key: string]: any;
};

declare var passportUrlPrefix: string;

declare var outDomain: { appStore: string; larkOpen: string; suiteAdmin: string };

declare var isKA: boolean;

declare var unitType: string;

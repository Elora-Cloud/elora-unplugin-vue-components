import type { ComponentInfo, ComponentResolver, SideEffectsInfo } from 'unplugin-vue-components/types';
import { kebabCase } from './utils';

export interface EloraPlusResolverOptions {
  /**
   * import style css or sass with components
   *
   * @default 'css'
   */
  importStyle?: boolean | 'css' | 'sass'

  /**
   * use commonjs lib & source css or scss for ssr
   */
  ssr?: boolean

  /**
   * auto import for directives
   *
   * @default true
   */
  directives?: boolean

  /**
   * exclude component name, if match do not resolve the name
   */
  exclude?: RegExp

  /**
   * a list of component names that have no styles, so resolving their styles file should be prevented
   */
  noStylesComponents?: string[]
}

type EloraPlusResolverOptionsResolved = Required<Omit<EloraPlusResolverOptions, 'exclude'>> & Pick<EloraPlusResolverOptions, 'exclude'>;

function getSideEffects(libName: string, dirName: string, options: EloraPlusResolverOptionsResolved): SideEffectsInfo | undefined {
  const { importStyle, ssr } = options;
  const themeFolder = `${libName}/theme`;
  const esComponentsFolder = `${libName}/es/components`;

  if (importStyle === 'sass') {
    return ssr ? [`${themeFolder}/components/${dirName}/index.scss`] : [`${esComponentsFolder}/${dirName}/style/index`];
  }
  if (importStyle === true || importStyle === 'css') {
    return ssr ? [`${themeFolder}/dist/components/${dirName}/index.css`] : [`${esComponentsFolder}/${dirName}/style/css`];
  }
}

function resolveComponent(name: string, options: EloraPlusResolverOptionsResolved): ComponentInfo | undefined {
  if (options.exclude && name.match(options.exclude))
    return;

  if (!name.match(/^Elora[A-Z]/))
    return;
  if (name.match(/^EloraPlus[A-Z]/))
    return;
  if (name.match(/^EloraIcon.+/)) {
    return {
      name: name.replace(/^EloraIcon/, ''),
      from: '@elora-cloud/elora-plus-icons-vue',
    };
  }
  const partialName = kebabCase(name.slice(5)); // ElTableColumn -> table-column
  const { ssr } = options;
  let libName = '@elora-cloud/elora-plus';
  if (name.match(/^EloraFlow.+/)) {
    libName = '@elora-cloud/elora-plus-flow';
  }

  return {
    name,
    from: `${libName}/${ssr ? 'lib' : 'es'}`,
    sideEffects: getSideEffects(libName, partialName, options),
  };
}

function resolveDirective(name: string, options: EloraPlusResolverOptionsResolved): ComponentInfo | undefined {
  if (!options.directives)
    return;

  const directives: Record<string, { importName: string, styleName: string }> = {
    Draggable: { importName: 'EloraDraggable', styleName: 'loading' },
    Outside: { importName: 'EloraOutside', styleName: 'loading' },
    Resize: { importName: 'EloraResize', styleName: 'loading' },
    TransferDom: { importName: 'EloraTransferDom', styleName: 'loading' },
    InputMask: { importName: 'EloraInputMask', styleName: 'loading' },
    ToolTip: { importName: 'EloraToolTip', styleName: 'loading' },
    BtnDelay: { importName: 'EloraBtnDelay', styleName: 'popover' },
    BtnAcl: { importName: 'EloraBtnAcl', styleName: 'popover' },
    BtnWaiting: { importName: 'EloraBtnWaiting', styleName: 'popover' },
    HasPermi: { importName: 'EloraHasPermi', styleName: 'popover' },
    HasRoles: { importName: 'EloraHasRoles', styleName: 'infinite-scroll' },
  };

  const directive = directives[name];
  if (!directive)
    return;

  const { ssr } = options;
  return {
    name: directive.importName,
    from: `@elora-cloud/elora-plus/${ssr ? 'lib' : 'es'}`,
    // sideEffects: getSideEffects(directive.styleName, options)
  };
}

const noStylesComponents: string[] = ['EloraAnchorGroup', 'EloraInputNumber', 'EloraInputOption'];

/**
 * Resolver for Element Plus
 *
 * See https://github.com/antfu/vite-plugin-components/pull/28 for more details
 * See https://github.com/antfu/vite-plugin-components/issues/117 for more details
 *
 * @author @develar @nabaonan @sxzz
 * @link https://element-plus.org/ for element-plus
 *
 */
export function EloraPlusResolver(options: EloraPlusResolverOptions = {}): ComponentResolver[] {
  let optionsResolved: EloraPlusResolverOptionsResolved;

  async function resolveOptions() {
    if (optionsResolved)
      return optionsResolved;
    optionsResolved = {
      ssr: false,
      importStyle: 'css',
      directives: true,
      exclude: undefined,
      noStylesComponents: options.noStylesComponents || [],
      ...options,
    };
    return optionsResolved;
  }

  return [
    {
      type: 'component',
      resolve: async (name: string) => {
        const options = await resolveOptions();

        if ([...options.noStylesComponents, ...noStylesComponents].includes(name))
          return resolveComponent(name, { ...options, importStyle: false });
        return resolveComponent(name, options);
      },
    },
    {
      type: 'directive',
      resolve: async (name: string) => {
        return resolveDirective(name, await resolveOptions());
      },
    },
  ];
}

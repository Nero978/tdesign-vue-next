import type { VNode } from '@td/adapter-vue';
import { computed, defineComponent, getCurrentInstance, inject, onBeforeUpdate, onMounted, ref } from '@td/adapter-vue';
import { ChevronRightIcon as TdChevronRightIcon } from 'tdesign-icons-vue-next';

import props from '@td/intel/breadcrumb/breadcrumb-item-props';
import { useGlobalIcon, usePrefixClass, useTNodeJSX, useContent } from '@td/adapter-hooks';
import { isFunction } from 'lodash-es';
import { isTextEllipsis } from '@td/adapter-utils';
import Tooltip from '../tooltip/index';

interface LocalTBreadcrumb {
  separator: (() => void) | string;
  theme: string;
  slots: {
    separator: VNode | string;
  };
  maxItemWidth: string;
}

const localTBreadcrumbOrigin: LocalTBreadcrumb = {
  separator: '',
  theme: 'light',
  slots: { separator: '' },
  maxItemWidth: undefined,
};

export default defineComponent({
  name: 'TBreadcrumbItem',
  inheritAttrs: false,
  props: {
    ...props,
  },
  setup(props, { attrs }) {
    const renderContent = useContent();
    const renderTNodeJSX = useTNodeJSX();

    const breadcrumbText = ref<HTMLElement>();
    const localTBreadcrumb = inject('tBreadcrumb', localTBreadcrumbOrigin);
    const themeClassName = ref(localTBreadcrumb?.theme);
    const isCutOff = ref(false);
    const COMPONENT_NAME = usePrefixClass('breadcrumb__item');
    const separatorClass = usePrefixClass('breadcrumb__separator');
    const disableClass = usePrefixClass('is-disabled');
    const linkClass = usePrefixClass('link');
    const maxLengthClass = usePrefixClass('breadcrumb__inner');
    const textFlowClass = usePrefixClass('breadcrumb--text-overflow');

    const { ChevronRightIcon } = useGlobalIcon({ ChevronRightIcon: TdChevronRightIcon });
    const maxWithStyle = computed(() => {
      const maxItemWidth = localTBreadcrumb?.maxItemWidth;
      const maxWith: string = props.maxWidth || maxItemWidth || '120';
      return { maxWidth: `${maxWith}px` };
    });

    onMounted(() => {
      isCutOff.value = isTextEllipsis(breadcrumbText.value);
    });
    onBeforeUpdate(() => {
      isCutOff.value = isTextEllipsis(breadcrumbText.value);
    });

    const separatorPropContent = localTBreadcrumb?.separator;
    const separatorSlot = localTBreadcrumb?.slots?.separator;
    const separatorContent = separatorPropContent || separatorSlot || (
      <ChevronRightIcon {...{ color: 'rgba(0,0,0,.3)' }} />
    );
    const { proxy } = getCurrentInstance();

    const handleClick = () => {
      if (props.href) {
        window.location.href = props.href;
      }
      const router = props.router || proxy.$router;
      if (props.to && router) {
        props.replace ? router.replace(props.to) : router.push(props.to);
      }
    };
    const bindEvent = (e: MouseEvent) => {
      if (!props.disabled) {
        if (props.target === '_blank') {
          props.href ? window.open(props.href) : window.open(props.to as string);
        } else {
          e.preventDefault();
          handleClick();
        }
      }
    };

    return () => {
      const itemClass = [COMPONENT_NAME.value, themeClassName.value];
      const textClass = [textFlowClass.value];

      if (props.disabled) {
        textClass.push(disableClass.value);
      }

      const listeners = {
        onClick: (e: MouseEvent) => {
          if (props.disabled) {
            e.stopPropagation();
          }
        },
      };

      const content = renderContent('default', 'content');

      const textContent = (
        <span {...{ class: maxLengthClass.value, style: maxWithStyle.value }}>
          {renderTNodeJSX('icon')}
          <span ref={breadcrumbText} class={`${maxLengthClass.value}-text`}>
            {content}
          </span>
        </span>
      );
      let itemContent = <span {...{ class: textClass, ...listeners }}>{textContent}</span>;

      if ((props.href || props.to) && !props.disabled) {
        textClass.push(linkClass.value);
        itemContent = (
          <a class={textClass} href={props.href} target={props.target} {...listeners} onClick={bindEvent}>
            {textContent}
          </a>
        );
      }
      return (
        <div class={itemClass} {...attrs} onClick={!props.disabled && props.onClick}>
          {isCutOff.value ? <Tooltip content={() => content}>{itemContent}</Tooltip> : itemContent}
          <span
            class={separatorClass.value}
            style={{
              textOverflow: isCutOff.value ? 'ellipsis' : 'clip',
            }}
          >
            {isFunction(separatorContent) ? separatorContent() : separatorContent}
          </span>
        </div>
      );
    };
  },
});
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * 该文件由脚本自动生成，如需修改请联系 PMC
 * This file generated by scripts of tdesign-api. `npm run api:docs Image VueNext(PC) vitest,finalProject`
 * If you need to modify this file, contact PMC first please.
 */
import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { Image } from 'tdesign-vue-next';
import { simulateImageEvent } from 'tdesign-vue-next/test/utils';
import { getOverlayImageMount } from './mount';

describe('image Component', () => {
  it('props.alt works fine', () => {
    const wrapper = mount(<Image alt="text image load failed" src="https://www.error.img.com"></Image>).find('img');
    expect(wrapper.attributes('alt')).toBe('text image load failed');
  });

  it('props.error works fine', async () => {
    const wrapper = mount(
      <Image error={() => <span class="custom-node">TNode</span>} src="https://this.is.an.error.img.com"></Image>,
    );
    const imgDom = wrapper.find('img').element;
    simulateImageEvent(imgDom, 'error');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('slots.error works fine', async () => {
    const wrapper = mount(
      <Image
        v-slots={{ error: () => <span class="custom-node">TNode</span> }}
        src="https://this.is.an.error.img.com"
      >
      </Image>,
    );
    const imgDom = wrapper.find('img').element;
    simulateImageEvent(imgDom, 'error');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  ['contain', 'cover', 'fill', 'none', 'scale-down'].forEach((item) => {
    it(`props.fit is equal to ${item}`, () => {
      const wrapper = mount(<Image fit={item}></Image>).find('.t-image');
      expect(wrapper.classes(`t-image--fit-${item}`)).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  it('props.gallery works fine', () => {
    // gallery default value is false
    const wrapper1 = mount(<Image></Image>);
    expect(wrapper1.classes('t-image__wrapper--gallery')).toBeFalsy();
    // gallery = true
    const wrapper2 = mount(<Image gallery={true}></Image>);
    expect(wrapper2.classes('t-image__wrapper--gallery')).toBeTruthy();
    // gallery = false
    const wrapper3 = mount(<Image gallery={false}></Image>);
    expect(wrapper3.classes('t-image__wrapper--gallery')).toBeFalsy();
  });

  it('props.gallery works fine. `".t-image__gallery-shadow"` should exist', () => {
    const wrapper = mount(<Image gallery={true}></Image>);
    expect(wrapper.find('.t-image__gallery-shadow').exists()).toBeTruthy();
  });

  it('props.loading works fine', () => {
    const wrapper = mount(<Image loading={() => <span class="custom-node">TNode</span>}></Image>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('slots.loading works fine', () => {
    const wrapper = mount(<Image v-slots={{ loading: () => <span class="custom-node">TNode</span> }}></Image>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('props.overlayContent works fine', () => {
    const wrapper = mount(<Image overlayContent={() => <span class="custom-node">TNode</span>}></Image>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.find('.t-image__overlay-content').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('slots.overlayContent works fine', () => {
    const wrapper = mount(<Image v-slots={{ overlayContent: () => <span class="custom-node">TNode</span> }}></Image>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.find('.t-image__overlay-content').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });
  it('slots.overlay-content works fine', () => {
    const wrapper = mount(
      <Image v-slots={{ 'overlay-content': () => <span class="custom-node">TNode</span> }}></Image>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.find('.t-image__overlay-content').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('props.overlayTrigger: show overlay content on hover', async () => {
    const wrapper = getOverlayImageMount(Image, {
      overlayTrigger: 'hover',
      src: 'https://tdesign.gtimg.com/demo/demo-image-1.png',
    });
    wrapper.find('.t-image__wrapper').trigger('mouseenter');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.t-image__overlay-content').exists()).toBeTruthy();
    expect(wrapper.find('.t-image__overlay-content--hidden').exists()).toBeFalsy();
    wrapper.find('.t-image__wrapper').trigger('mouseleave');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.t-image__overlay-content--hidden').exists()).toBeTruthy();
  });

  it('props.placeholder works fine', () => {
    const wrapper = mount(<Image placeholder={() => <span class="custom-node">TNode</span>}></Image>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('slots.placeholder works fine', () => {
    const wrapper = mount(<Image v-slots={{ placeholder: () => <span class="custom-node">TNode</span> }}></Image>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  const positionClassNameMap = {
    top: 't-image--position-top',
    bottom: 't-image--position-bottom',
    left: 't-image--position-left',
    right: 't-image--position-right',
    center: 't-image--position-center',
  };
  Object.entries(positionClassNameMap).forEach(([enumValue, expectedClassName]) => {
    it(`props.position is equal to ${enumValue}`, () => {
      let propValue = { true: true, false: false }[enumValue];
      propValue = propValue === undefined ? enumValue : propValue;
      const wrapper = mount(<Image position={propValue}></Image>).find('.t-image');
      expect(wrapper.classes(expectedClassName)).toBeTruthy();
    });
  });

  ['circle', 'round', 'square'].forEach((item) => {
    it(`props.shape is equal to ${item}`, () => {
      const wrapper = mount(<Image shape={item}></Image>).find('.t-image__wrapper');
      expect(wrapper.classes(`t-image__wrapper--shape-${item}`)).toBeTruthy();
    });
  });

  it(`props.srcset is equal to {'image/avif': 'https://tdesign.gtimg.com/img/tdesign-image.avif','image/webp': 'https://tdesign.gtimg.com/img/tdesign-image.webp'}`, () => {
    const wrapper = mount(
      <Image
        srcset={{
          'image/avif': 'https://tdesign.gtimg.com/img/tdesign-image.avif',
          'image/webp': 'https://tdesign.gtimg.com/img/tdesign-image.webp',
        }}
      >
      </Image>,
    );
    const domWrapper = wrapper.find('picture > source');
    expect(domWrapper.attributes('srcset')).toBe('https://tdesign.gtimg.com/img/tdesign-image.avif');
    const domWrapper1 = wrapper.find('picture > source:nth-child(2)');
    expect(domWrapper1.attributes('srcset')).toBe('https://tdesign.gtimg.com/img/tdesign-image.webp');
  });

  it('events.error works fine', async () => {
    const onErrorFn = vi.fn();
    const wrapper = mount(<Image src="https://load-failed-img.png" onError={onErrorFn}></Image>);
    const imgDom = wrapper.find('img').element;
    simulateImageEvent(imgDom, 'error');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.t-image__error').exists()).toBeTruthy();
    expect(wrapper.find('.t-icon-image-error').exists()).toBeTruthy();
    expect(onErrorFn).toHaveBeenCalled();
    expect(onErrorFn.mock.calls[0][0].e.type).toBe('error');
  });

  it('events.load works fine', async () => {
    const onLoadFn1 = vi.fn();
    const wrapper = mount(<Image src="https://tdesign.gtimg.com/demo/demo-image-1.png" onLoad={onLoadFn1}></Image>);
    await wrapper.vm.$nextTick();
    const imgDom1 = wrapper.find('img').element;
    simulateImageEvent(imgDom1, 'load');
    await wrapper.vm.$nextTick();
    expect(onLoadFn1).toHaveBeenCalled();
    expect(onLoadFn1.mock.calls[0][0].e.type).toBe('load');
  });
});
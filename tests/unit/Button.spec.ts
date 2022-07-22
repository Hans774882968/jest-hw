import { shallowMount, Wrapper } from '@vue/test-utils';
import Button from '@/components/Button.vue';

describe('Button.vue', () => {
  let wrapper: Wrapper<any, Element>;
  afterEach(() => {
    wrapper.destroy();
  });

  it('renders basic HTML structure properly', () => {
    wrapper = shallowMount(Button);
    expect(wrapper.element.nodeName).toBe('BUTTON');
    expect(wrapper.classes()).toContain('my-button');
  });

  // Or you can use snapshot to save many expects
  it('render element properly (judge by snapshot)', () => {
    wrapper = shallowMount(Button);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('slot', () => {
    wrapper = shallowMount(Button, {
      slots: {
        default: '<span class="acmer">hans</span>',
      },
    });
    const innerEl = wrapper.find('.acmer');
    expect(innerEl.element.nodeName).toBe('SPAN');
    expect(wrapper.text()).toMatch('hans');
  });

  it('nativeType', () => {
    wrapper = shallowMount(Button, {
      propsData: { nativeType: 'submit' },
    });
    expect(wrapper.attributes('type')).toBe('submit');
  });

  it('type', () => {
    wrapper = shallowMount(Button, {
      propsData: { type: 'danger' },
    });
    expect(wrapper.classes()).toContain('btn-type-danger');
  });

  it('size', () => {
    wrapper = shallowMount(Button, {
      propsData: { size: 'small' },
    });
    expect(wrapper.classes()).toContain('btn-size-small');
  });

  it('shape', () => {
    wrapper = shallowMount(Button, {
      propsData: { shape: 'round' },
    });
    expect(wrapper.classes()).toContain('btn-shape-round');
  });

  it('loading', () => {
    wrapper = shallowMount(Button, {
      propsData: { loading: true },
    });
    expect(wrapper.classes()).toContain('btn-loading');
  });

  // click tests
  it('click', () => {
    const clickHandler = jest.fn();
    wrapper = shallowMount(Button, {
      listeners: {
        click: clickHandler,
      },
    });
    for (let i = 0; i < 5; i += 1) wrapper.trigger('click');

    expect(clickHandler).toHaveBeenCalledTimes(5);
  });

  it('click inside slot', () => {
    const clickHandler = jest.fn();
    wrapper = shallowMount(Button, {
      slots: {
        default: '<span class="inner" />',
      },
      listeners: {
        click: clickHandler,
      },
    });

    const innerEl = wrapper.find('.inner');
    for (let i = 0; i < 5; i += 1) innerEl.trigger('click');
    expect(clickHandler).toHaveBeenCalledTimes(5);
  });

  it('disabled', () => {
    const clickHandler = jest.fn();
    wrapper = shallowMount(Button, {
      propsData: { disabled: true },
      listeners: {
        click: clickHandler,
      },
    });
    expect(wrapper.classes()).toContain('btn-disabled');
    for (let i = 0; i < 5; i += 1) wrapper.trigger('click');
    expect(clickHandler).not.toHaveBeenCalled();
  });

  it('disabled when loading', () => {
    const clickHandler = jest.fn();
    wrapper = shallowMount(Button, {
      propsData: { loading: true },
      listeners: {
        click: clickHandler,
      },
    });
    for (let i = 0; i < 5; i += 1) wrapper.trigger('click');
    expect(clickHandler).not.toHaveBeenCalled();
  });
});

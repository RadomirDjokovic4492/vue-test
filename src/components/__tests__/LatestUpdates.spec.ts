import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import LatestUpdates from '../LatestUpdates.vue'

describe('LatestUpdates', () => {
  it('renders properly', () => {
    const wrapper = mount(LatestUpdates, {})
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})

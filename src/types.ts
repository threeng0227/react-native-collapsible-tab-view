import React, { ComponentProps } from 'react'
import {
  FlatList,
  FlatListProps as RNFlatListProps,
  ListRenderItem,
  ScrollView,
  StyleProp,
  ViewStyle,
} from 'react-native'
import Animated from 'react-native-reanimated'

import { TabProps } from './Tab'

export type ContainerRef = FlatList<any>

export type RefComponent = FlatList<any> | ScrollView | Animated.ScrollView

export type Ref<T extends RefComponent> = React.RefObject<T>

export type TabName = string | number

export type RefHandler<T extends TabName> = {
  jumpToTab: (name: T) => boolean
  setIndex: (index: number) => boolean
  getFocusedTab: () => T
  getCurrentIndex: () => number
}

export type CollapsibleRef<T extends TabName> = RefHandler<T> | undefined

export type TabBarProps<T extends TabName> = {
  indexDecimal: Animated.SharedValue<number>
  focusedTab: Animated.SharedValue<T>
  tabNames: T[]
  index: Animated.SharedValue<number>
  containerRef: React.RefObject<ContainerRef>
  onTabPress: (name: T) => void
  tabProps: TabsWithProps<T>
  //options: FinalTabOptions<T>
}

export type IndexChangeEventData<T extends TabName> = {
  prevIndex: number
  index: number
  prevTabName: T
  tabName: T
}

export type OnTabChangeCallback<T extends TabName> = (
  data: IndexChangeEventData<T>
) => void

export type TabReactElement<T extends TabName> = React.ReactElement<TabProps<T>>

export type CollapsibleProps<T extends TabName> = {
  initialTabName?: T
  /**
   * Is optional, but will optimize the first render.
   */
  headerHeight?: number
  /**
   * Is optional, but will optimize the first render.
   */
  tabBarHeight?: number
  /**
   * Header minimum height when collapsed
   */
  minHeaderHeight?: number
  snapEnabled?: boolean
  diffClampEnabled?: boolean
  /**
   * Percentage of header height to make the snap effect. A number between 0 and 1.
   */
  snapThreshold?: number
  children: TabReactElement<T>[] | TabReactElement<T>
  HeaderComponent?: (props: TabBarProps<T>) => React.ReactElement | null
  TabBarComponent?: (props: TabBarProps<T>) => React.ReactElement | null
  headerContainerStyle?: StyleProp<Animated.AnimateStyle<ViewStyle>>
  containerStyle?: StyleProp<ViewStyle>
  cancelTranslation?: boolean
  /**
   * If lazy, will mount the screens only when the tab is visited. There is a default fade in transition.
   */
  lazy?: boolean
  cancelLazyFadeIn?: boolean
  /**
   * Props passed to the horiztontal flatlist. If you want for example to disable swiping, you can pass `{ scrollEnabled: false }`
   */
  pagerProps?: Omit<
    RNFlatListProps<number>,
    | 'data'
    | 'keyExtractor'
    | 'renderItem'
    | 'horizontal'
    | 'pagingEnabled'
    | 'onScroll'
    | 'showsHorizontalScrollIndicator'
    | 'getItemLayout'
  >
  /**
   * Callback fired when the index changes. It receives the previous and current index and tabnames.
   */
  onIndexChange?: OnTabChangeCallback<T>
}

export type ContextType<T extends TabName> = {
  headerHeight: number
  headerScrollDistance: Animated.SharedValue<number>
  tabBarHeight: number
  snapEnabled: boolean
  diffClampEnabled: boolean
  snapThreshold: number
  getRef: <TComponent extends RefComponent>(
    key: T
  ) => Ref<TComponent> | undefined
  setRef: <TComponent extends RefComponent>(
    key: T,
    ref: React.RefObject<TComponent>
  ) => Ref<TComponent>
  /**
   * Scroll position of current tab.
   */
  scrollYCurrent: Animated.SharedValue<number>
  /**
   * Tab names, same as the keys of `refMap`.
   */
  tabNames: Animated.SharedValue<T[]>
  index: Animated.SharedValue<number>
  scrollY: Animated.SharedValue<number[]>
  oldAccScrollY: Animated.SharedValue<number>
  accScrollY: Animated.SharedValue<number>
  offset: Animated.SharedValue<number>
  isScrolling: Animated.SharedValue<number>
  /**
   * Name of the current focused tab.
   */
  focusedTab: Animated.SharedValue<T>
  accDiffClamp: Animated.SharedValue<number>
  containerHeight?: number
  /**
   * Scroll x position of the tabs container.
   */
  scrollX: Animated.SharedValue<number>
  indexDecimal: Animated.SharedValue<number>
  isGliding: Animated.SharedValue<boolean>
  isSnapping: Animated.SharedValue<boolean>
  /**
   * Used internally.
   */
  snappingTo: Animated.SharedValue<number>
  /**
   * Used internally.
   */
  endDrag: Animated.SharedValue<number>
}

export type ScrollViewProps = ComponentProps<typeof Animated.ScrollView>

export type FlatListProps<R extends any> = Omit<
  ComponentProps<typeof FlatList>,
  'renderItem'
> & {
  renderItem: ListRenderItem<R>
}

export type CollapsibleStyle = {
  style: { width: number }
  contentContainerStyle: {
    minHeight: number
    paddingTop: number
  }
  progressViewOffset: number
}

export type TabsWithProps<T extends TabName> = Map<
  T,
  TabProps<T> & { index: number }
>

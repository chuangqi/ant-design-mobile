import { FC, ReactNode, ReactElement, ComponentProps } from 'react'
import React from 'react'
import classNames from 'classnames'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import Badge from '../badge'
import { useNewControllableValue } from '../../utils/use-controllable-value'

export type TabBarItemProps = {
  icon?: ReactNode
  title?: string
  badge?: ReactNode
} & NativeProps

export const TabBarItem: FC<TabBarItemProps> = () => {
  return null
}

export type TabBarProps = {
  activeKey?: string
  defaultActiveKey?: string
  onChange?: (key: string) => void
} & NativeProps

export const TabBar: FC<TabBarProps> = props => {
  let firstActiveKey: string | null = null

  const items: ReactElement<ComponentProps<typeof TabBarItem>>[] = []

  React.Children.forEach(props.children, (child, index) => {
    if (!React.isValidElement(child)) return
    const key = child.key
    if (typeof key !== 'string') return
    if (index === 0) {
      firstActiveKey = key
    }
    items.push(child)
  })

  const [activeKey, setActiveKey] = useNewControllableValue({
    value: props.activeKey,
    defaultValue: props.defaultActiveKey ?? firstActiveKey,
    onChange: props.onChange,
  })

  return withNativeProps(
    props,
    <div className='adm-tab-bar'>
      {items.map(item => {
        function renderContent() {
          const iconElement = item.props.icon && (
            <div className='adm-tab-bar-item-icon'>{item.props.icon}</div>
          )
          const titleElement = item.props.title && (
            <div className='adm-tab-bar-item-title'>{item.props.title}</div>
          )
          if (item.props.badge !== undefined) {
            if (iconElement) {
              return (
                <>
                  <Badge content={item.props.badge} offset={[0, 6]}>
                    {iconElement}
                  </Badge>
                  {titleElement}
                </>
              )
            } else if (titleElement) {
              return (
                <>
                  <Badge content={item.props.badge} offset={[2, -2]}>
                    {titleElement}
                  </Badge>
                </>
              )
            }
          } else {
            return (
              <>
                {iconElement}
                {titleElement}
              </>
            )
          }
          return null
        }
        return withNativeProps(
          item.props,
          <div
            key={item.key}
            onClick={() => {
              const { key } = item
              if (key === undefined || key === null) return
              setActiveKey(key.toString())
            }}
            className={classNames('adm-tab-bar-item', {
              'adm-tab-bar-item-active': item.key === activeKey,
            })}
          >
            {renderContent()}
          </div>
        )
      })}
    </div>
  )
}

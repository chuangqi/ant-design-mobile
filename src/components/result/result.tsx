import React, { FC, ReactNode } from 'react'
import classNames from 'classnames'
import {
  CheckCircleFilled,
  CloseCircleFilled,
  InfoCircleFilled,
  ClockCircleFilled,
  ExclamationCircleFilled,
} from '@ant-design/icons'

const classPrefix = `adm-result`

const ICONS = {
  success: CheckCircleFilled,
  error: CloseCircleFilled,
  info: InfoCircleFilled,
  waiting: ClockCircleFilled,
  warning: ExclamationCircleFilled,
}

export interface ResultProps {
  status: 'success' | 'error' | 'info' | 'waiting' | 'warning'
  title: string
  description?: string
  icon?: ReactNode
  className?: string
  style?: React.CSSProperties
}

export const Result: FC<ResultProps> = props => {
  const { className, style, status, title, description, icon } = props
  const resultIcon = icon || React.createElement(ICONS[status])

  return (
    <div
      className={classNames(classPrefix, `${classPrefix}-${status}`, className)}
      style={style}
    >
      <div className={`${classPrefix}-icon`}>{resultIcon}</div>
      <div className={`${classPrefix}-title`}>{title}</div>
      {description ? (
        <div className={`${classPrefix}-description`}>{description}</div>
      ) : null}
    </div>
  )
}

Result.defaultProps = {
  description: '',
}

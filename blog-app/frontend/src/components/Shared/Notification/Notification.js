import React from 'react'
import { useNotification } from '../../../hooks/notificationContext'
import './Notification.css'

export default function Notification() {

  const notification = useNotification()

  return (
    <>
      {notification != null &&
        <div className="notification" style={{ color: notification.color }}>
          {notification.text}
        </div>
      }
    </>

  )
}

'use client'

import { useFetchOldNotificationsQuery } from "@/redux/features/notificationApiSlice"
import { useState } from "react"


export const RecentNotifications = () => {
    const [page, setPage] = useState(1)
    const {data}  = useFetchOldNotificationsQuery(page)
    return <div>
        <h1></h1>

    </div>
}
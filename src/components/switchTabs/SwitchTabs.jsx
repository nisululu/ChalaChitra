import React, { useState } from 'react'
import './style.scss'

const SwitchTabs = ({ data, onTabChange }) => {

    const [selectedTab, setSelectedTab] = useState(0)
    const [left, setLeft] = useState(1)

    const activeTab = (tab, index) => {
        setLeft(index === 0 ? index * 100 + 1 : index * 100 -1)
        setTimeout(() => {
            setSelectedTab(index)
        }, 300)
        onTabChange(tab)
    }

    return (
        <div className='switchTabs'>
            <div className="tabItems">
                {data?.map((item, index) => (
                    <span
                        key={index}
                        className={`tabItem ${selectedTab === index ? "active" : ""}`}
                        onClick={() => activeTab(item, index)}
                    >
                        {item}
                    </span>
                )
                )}
                <span
                    className="movingBg"
                    style={{ left }}
                />
            </div>
        </div>
    )
}

export default SwitchTabs

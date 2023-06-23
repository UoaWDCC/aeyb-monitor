import { useState } from 'react';

export default function TabManager<const K, const T extends { tabTitle: string; tabData?: K }>({
    content,
    contentLoader,
    tabLoader,
    orientation = 'column',
}: {
    orientation?: 'column' | 'row';
    content: T[];
    contentLoader: (data: T) => JSX.Element | JSX.Element[];
    tabLoader?: (data: T[], activeTab: number, orientation: 'row' | 'column', setActiveTab: (val: number) => void) => JSX.Element | JSX.Element[];
}) {
    const [activeTab, setActiveTab] = useState<number>(0);

    return (
        <div className={`w-full h-full min-h-0 min-w-0 flex break-all ${orientation === 'row' ? 'flex-col' : 'flex-row'}`}>
            <div className={`flex border-[rgba(0, 0, 0, 0.01)] overflow-scroll ${orientation === 'row' ? 'flex-row border-b-2' : 'flex-col border-r-2 w-[300px] over'}`}>
                {tabLoader === undefined ? 
                    content.map((tab, index) => {
                        return (
                            <span
                                key={Math.random()}
                                onClick={() => {
                                    setActiveTab(index);
                                }}

                                className={
                                    `px-4 py-2 
                                    min-w-fit 
                                    cursor-pointer 
                                    ${index === activeTab ? 'bg-slate-300 border-slate-500' : 'hover:bg-slate-200 border-transparent'} 
                                    ${orientation === 'row' ? 'border-b-2' : 'border-r-2'}`
                                }
                            >
                                {tab.tabTitle}
                            </span>
                        );
                    }) :
                    tabLoader(content, activeTab, orientation, setActiveTab)
                }
            </div>
            <div className={`w-full h-full flex min-h-0 overflow-scroll ${''}`}>
                {activeTab !== null ? contentLoader(content[activeTab]) : false}
            </div>
        </div>
    );
}
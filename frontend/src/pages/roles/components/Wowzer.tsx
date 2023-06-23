import TabManager from '../../../utility_components/tabs/TabManager';

export function Wowzer({ count = 10 + Math.random() }) {
    if (count < 16) {
        return (
            <TabManager
                orientation="row"
                content={count
                    .toString()
                    .split('')
                    .map((val) => ({ tabTitle: val }))}
                loader={(data) => {
                    return (
                        <TabManager
                            orientation="column"
                            content={(data.tabTitle + Math.random()).split('').map((val) => ({ tabTitle: val }))}
                            loader={() => <Wowzer count={count + 1} />}
                        />
                    );
                }}
            />
        );
    } else {
        return <></>;
    }
    // return (
    // <TabManager
    //     orientation="row"
    //     content={[{ tabTitle: '1' }, { tabTitle: '2' }]}
    //     loader={() => {
    //         return (
    //             <TabManager
    //                 orientation="column"
    //                 content={[{ tabTitle: '1' }, { tabTitle: '2' }]}
    //                 loader={() => {
    //                     return (
    //                         <TabManager
    //                             orientation="row"
    //                             content={[{ tabTitle: '1' }, { tabTitle: '2' }]}
    //                             loader={(data) => {
    //                                 return (
    //                                     <TabManager
    //                                         orientation="column"
    //                                         content={[{ tabTitle: '1' }, { tabTitle: '2' }]}
    //                                         loader={() => {
    //                                             return (
    //                                                 <TabManager
    //                                                     orientation="row"
    //                                                     content={[{ tabTitle: '1' }, { tabTitle: '2' }]}
    //                                                     loader={(data) => {
    //                                                         return (
    //                                                             <TabManager
    //                                                                 orientation="column"
    //                                                                 content={[
    //                                                                     {
    //                                                                         tabTitle: '1',
    //                                                                     },
    //                                                                     {
    //                                                                         tabTitle: '2',
    //                                                                     },
    //                                                                 ]}
    //                                                                 loader={() => {
    //                                                                     return (
    //                                                                         <TabManager
    //                                                                             orientation="row"
    //                                                                             content={[
    //                                                                                 {
    //                                                                                     tabTitle: '1',
    //                                                                                 },
    //                                                                                 {
    //                                                                                     tabTitle: '2',
    //                                                                                 },
    //                                                                             ]}
    //                                                                             loader={(data) => {
    //                                                                                 return (
    //                                                                                     <TabManager
    //                                                                                         orientation="column"
    //                                                                                         content={[
    //                                                                                             {
    //                                                                                                 tabTitle: '1',
    //                                                                                             },
    //                                                                                             {
    //                                                                                                 tabTitle: '2',
    //                                                                                             },
    //                                                                                         ]}
    //                                                                                         loader={() => {
    //                                                                                             return (
    //                                                                                                 <TabManager
    //                                                                                                     orientation="row"
    //                                                                                                     content={[
    //                                                                                                         {
    //                                                                                                             tabTitle:
    //                                                                                                                 '1',
    //                                                                                                         },
    //                                                                                                         {
    //                                                                                                             tabTitle:
    //                                                                                                                 '2',
    //                                                                                                         },
    //                                                                                                         {
    //                                                                                                             tabTitle:
    //                                                                                                                 '3',
    //                                                                                                             tabData:
    //                                                                                                                 {
    //                                                                                                                     content:
    //                                                                                                                         'Hello',
    //                                                                                                                 },
    //                                                                                                         },
    //                                                                                                     ]}
    //                                                                                                     loader={(
    //                                                                                                         data,
    //                                                                                                     ) => {
    //                                                                                                         if (
    //                                                                                                             data.tabTitle !=
    //                                                                                                             '3'
    //                                                                                                         ) {
    //                                                                                                             return (
    //                                                                                                                 <>
    //                                                                                                                     {
    //                                                                                                                         data.tabTitle
    //                                                                                                                     }
    //                                                                                                                 </>
    //                                                                                                             );
    //                                                                                                         } else {
    //                                                                                                             return (
    //                                                                                                                 <>
    //                                                                                                                     {
    //                                                                                                                         data
    //                                                                                                                             .tabData
    //                                                                                                                             .content
    //                                                                                                                     }
    //                                                                                                                 </>
    //                                                                                                             );
    //                                                                                                         }
    //                                                                                                     }}
    //                                                                                                 />
    //                                                                                             );
    //                                                                                         }}
    //                                                                                     />
    //                                                                                 );
    //                                                                             }}
    //                                                                         />
    //                                                                     );
    //                                                                 }}
    //                                                             />
    //                                                         );
    //                                                     }}
    //                                                 />
    //                                             );
    //                                         }}
    //                                     />
    //                                 );
    //                             }}
    //                         />
    //                     );
    //                 }}
    //             />
    //         );
    //     }}
    // />
    // );
}

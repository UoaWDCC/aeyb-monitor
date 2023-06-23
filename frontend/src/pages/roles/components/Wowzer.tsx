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
}

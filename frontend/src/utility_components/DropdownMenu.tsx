import './dropdownmenu.css';

type DropdownMenuProps = {
    items: string[];
};

export const DropdownMenu = ({ items }: DropdownMenuProps) => {
    return (
        <div className="flex flex-col dropDownmenu">
            <ul className="flex flex-col gap-4">
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

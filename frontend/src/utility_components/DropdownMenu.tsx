import './dropdownmenu.css';

type DropdownMenuProps = {
    items: React.ReactNode[];
    className?: string; // Optional className prop
};

export const DropdownMenu = ({ items, className }: DropdownMenuProps) => {
    return (
        <div className={`flex flex-col dropDownmenu ${className}`}>
            <ul className="flex flex-col gap-4">
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

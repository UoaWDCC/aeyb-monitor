export default function FakeProfile({ name }: { name: string }) {
    const colors = [
        'bg-[#ae49b8]',
        'bg-[#7d259d]',
        'bg-[#748f9a]',
        'bg-[#455a64]',
        'bg-[#f44279]',
        'bg-[#c91e5c]',
        'bg-[#586bbb]',
        'bg-[#0087cc]',
        'bg-[#005898]',
        'bg-[#0097a3]',
        'bg-[#008779]',
        'bg-[#004d41]',
        'bg-[#629d44]',
        'bg-[#2f6929]',
        'bg-[#8d6e64]',
        'bg-[#60423c]',
        'bg-[#7e58bd]',
        'bg-[#5232a2]',
        'bg-[#f86c27]',
        'bg-[#ff5231]',
        'bg-[#c63921]',
    ];
    const color = colors[name.length % colors.length];

    return (
        <div className="flex flex-row items-center gap-2 w-[300px]">
            <span
                className={`w-9 h-9 rounded-full flex items-center justify-center font-medium text-xl text-white capitalize select-none ${color}`}
            >
                <span className="translate-x-[0.5px] translate-y-[-0.5px]">{name.slice(0)[0]}</span>
            </span>
            <span className="h-min">{name}</span>
        </div>
    );
}

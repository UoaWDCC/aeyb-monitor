import DatePicker from 'react-datepicker';

type DatePickerUtilProps = {
    id: string;
    label: string;
    value: Date;
    handleChange: (date: Date) => void;
    showTimeSelect?: boolean;
};

export default function DatePickerUtil({
    id,
    label,
    value,
    handleChange,
    showTimeSelect = false,
}: DatePickerUtilProps) {
    return (
        <div className="w-full my-2">
            <label className="block text-gray-700 mb-1 w-full" htmlFor={id}>
                {label}
            </label>
            <DatePicker
                id={id}
                className="focus:outline-none rounded-md w-full pl-2 py-2 transition-colors duration-200 border border-gray-300 hover:border-gray-700 focus-visible:border-blue-600 active:border-blue-600"
                selected={value}
                showTimeSelect={showTimeSelect}
                showTimeSelectOnly={showTimeSelect}
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat={showTimeSelect ? 'h:mm aa' : 'd MMMM, yyyy'}
                onChange={handleChange}
            />
        </div>
    );
}

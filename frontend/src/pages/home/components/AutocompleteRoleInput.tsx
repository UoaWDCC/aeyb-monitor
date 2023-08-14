import { Autocomplete, TextField } from '@mui/material';
import RoleDTO from '../../../../../shared/dtos/RoleDTO';

type AutocompleteInputProps = {
    options: RoleDTO[];
    label: string;
    placeholder?: string;
    onChange: (value: RoleDTO[]) => void;
    value: RoleDTO[];
};

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({ options, label, placeholder, onChange, value }) => {
    return (
        <Autocomplete
            className="focus:outline-none rounded-md w-full pl-2 py-2 transition-colors duration-200 bg-gray-50 focus:bg-gray-100"
            multiple
            value={value}
            onChange={(event, newValues) => {
                if (newValues.every((val) => typeof val !== 'string')) {
                    onChange(newValues as RoleDTO[]);
                }
            }}
            options={options}
            getOptionLabel={(option: RoleDTO) => option.name}
            getOptionDisabled={(option: RoleDTO) => value.some((val) => val.id === option.id)}
            renderInput={(params) => (
                <TextField {...params} label={label} placeholder={placeholder} variant="outlined" />
            )}
        />
    );
};

export default AutocompleteInput;

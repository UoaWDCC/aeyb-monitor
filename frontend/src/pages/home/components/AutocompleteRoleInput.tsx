import { Autocomplete, TextField } from '@mui/material';
import UserDTO from '../../../../../shared/dtos/UserDTO';

type AutocompleteInputProps = {
    options: UserDTO[];
    label: string;
    placeholder?: string;
    onChange: (value: UserDTO[]) => void;
    value: UserDTO[];
};

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({ options, label, placeholder, onChange, value }) => {
    return (
        <Autocomplete
            className="focus:outline-none rounded-md w-full pl-2 py-2 transition-colors duration-200 bg-gray-50 focus:bg-gray-100"
            multiple
            value={value}
            onChange={(event, newValues) => {
                if (newValues.every((val) => typeof val !== 'string')) {
                    onChange(newValues as UserDTO[]);
                }
            }}
            sx={{
                '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                        borderColor: 'transparent',
                    },
                    '&:hover fieldset': {
                        borderColor: 'transparent',
                    },
                    '& fieldset': {
                        borderColor: 'transparent',
                    },
                },
            }}
            renderOption={(props, option) => {
                return (
                    <li {...props} key={option.id}>
                        {option.name}
                    </li>
                );
            }}
            isOptionEqualToValue={(option, value) => {
                return option.id === value.id;
            }}
            options={options}
            getOptionLabel={(option: UserDTO) => option.name}
            getOptionDisabled={(option: UserDTO) => value.some((val) => val.id === option.id)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    placeholder={placeholder}
                    required={value.length == 0}
                    variant="outlined"
                />
            )}
        />
    );
};

export default AutocompleteInput;

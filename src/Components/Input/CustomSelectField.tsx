import { MenuItem, TextField, TextFieldProps } from "@mui/material";
import { styled } from "@mui/material/styles";

export type SelectOption = {
    label: string;
    value: string;
};

type CustomSelectFieldProps = {
    name: string;
    setData: React.Dispatch<React.SetStateAction<any>>;
    resource: string;
    label: string;
    defaultValue?: string;
    options: SelectOption[];
    disabled?: boolean;
} & Omit<TextFieldProps, "name" | "label" | "defaultValue" | "disabled">;

export function CustomSelectField({
    name,
    setData,
    resource,
    label,
    defaultValue,
    options,
    disabled,
    ...rest
}: CustomSelectFieldProps) {
    return (
        <Custom
            select
            fullWidth
            name={name}
            label={label}
            defaultValue={defaultValue ?? ""}
            disabled={disabled}
            onChange={(e) =>
                setData((prev: any) => ({
                    ...prev,
                    [name]: e.target.value,
                }))
            }
            data-resource={resource}
            variant="outlined"
            {...rest}
        >
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </Custom>
    );
}

const Custom = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
        borderRadius: "15px",

        "& fieldset": {
            borderRadius: "15px",
        },

        "&.Mui-disabled": {
            backgroundColor: theme.palette.action.disabledBackground,
            opacity: 0.6,
        },

        "&:hover fieldset": {
            borderColor: `${theme.palette.primary.light} !important`,
        },
    },

    "& .MuiOutlinedInput-input": {
        fontSize: "15px",
    },

    "& .MuiInputLabel-root": {
        fontSize: 15,

        "&.Mui-disabled": {
            color: theme.palette.text.disabled,
            opacity: 0.7,
        },
    },
}));
import { TextField, TextFieldProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { NumericFormat } from "react-number-format";

type CustomTextFieldProps = {
    setData?: any;
    change?: any;
    register?: any;
    endIcon?: React.ReactNode;
    thousandSeparator?: boolean;
} & TextFieldProps;

export function CustomTextField(props: CustomTextFieldProps) {
    const {
        setData,
        change,
        register,
        endIcon,
        thousandSeparator,
        onChange,
        InputProps,
        ...rest
    } = props;

    function changeField(event: React.ChangeEvent<HTMLInputElement>) {
        const rawValue = event.target.value.replace(/,/g, "");

        const newEvent = {
            ...event,
            target: {
                ...event.target,
                value: rawValue,
            },
        };

        if (!change && setData) {
            setData((prev: any) => ({
                ...prev,
                [event.target.name]: rawValue,
            }));
        } else if (change) {
            change(newEvent);
        }

        onChange?.(newEvent as React.ChangeEvent<HTMLInputElement>);
    }

    if (thousandSeparator) {
        return (
            <NumericFormat
            
                customInput={Custom}
                thousandSeparator=","
                valueIsNumericString
                onChange={changeField}
                InputProps={{
                    disableUnderline: true,
                    endAdornment: endIcon,
                    ...InputProps,
                }}
                variant="outlined"
                fullWidth
                {...register}
                {...rest}
            />
        );
    }

    return (
        <Custom
            onChange={changeField}
            InputProps={{
                disableUnderline: true,
                endAdornment: endIcon,
                ...InputProps,
            }}
            variant="outlined"
            fullWidth
            {...register}
            {...rest}
        />
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
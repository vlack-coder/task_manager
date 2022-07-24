import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { HiSelector } from "react-icons/hi";
import Select, { components } from "react-select";
import "./input.css";

function Input({
  label,
  placeholder,
  icon,
  leftIcon,
  input,
  select,
  onChange,
  value,
  textInput,
  datepick,
  dateValue,
  selectOptions,
  loadOptions,
  selectValue,
  error,
  ...otherProps
}) {
  // const options = [
  //   { value: "chocolate", label: "Chocolate" },
  //   { value: "strawberry", label: "Strawberry" },
  //   { value: "vanilla", label: "Vanilla" },
  // ];
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted pink",
      color: state.isSelected ? "red" : "blue",
      padding: 5,
      // width: "100%",
      // flex:1,
      // flexBasis: "100%"
    }),
    control: (provided, state) => ({
      // none of react-select's styles are passed to <Control />
      //   width: 200,
      ...provided,
      backgroundColor: "#ffff",
      border: "#c4c4c4",
      //   padding: "5px 6px",
      padding: "0px",
      fontSize: "14px",
      minHeight: "30px",
      height: "30px",
      // width: "100%"
      //   width
    }),
    input: (provided, state) => ({
      ...provided,
      margin: "0px",
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "30px",
      //   label: <HiSelector />
    }),
    // singleValue: (provided, state) => {
    //   const opacity = state.isDisabled ? 0.5 : 1;
    //   const transition = 'opacity 300ms';

    //   return { ...provided, opacity, transition };
    // }
  };
  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <HiSelector />
      </components.DropdownIndicator>
    );
  };

  const defaultValue = (options, value) => {
    return options ? options.find((option) => option.value === value) : "";
  };
  // console.log('placeholder', placeholder, value)

  return (
    <div style={{ marginTop: "10px", flex: 1 }}>
      <span
        style={{
          fontSize: "14px",
          marginBottom: "5px",
          display: "inherit",
        }}
      >
        {label}
      </span>
      <div className={leftIcon ? "follow_up reverse" : "follow_up"}>
        {select && (
          <div
            style={{
              width: "100%",
              //   border: "1px solid red",
              //   height: "30px",
              //   display: "flex",
            }}
          >
            <Select
              width="100%"
              flex={1}
              components={{ DropdownIndicator }}
              styles={customStyles}
              options={selectOptions}
              placeholder={placeholder}
              // defaultInputValue={value}
              value={defaultValue(selectOptions, value)}
              // defaultInputValue={defaultValue(selectOptions, value)}
              // defaultInputValue={s? value.value : value}
              key={`my_unique_select_key__${value}`}
              defaultValue={{ value: value, label: value }}
              // defaultInputValue={value}
              // value={value}
              // value={s? value : value.toString() }
              onChange={(value) => {
                onChange(value);
              }}
              {...otherProps}
            />
          </div>
        )}
        {datepick && (
          <DatePicker
            wrapperClassName="datePicker"
            // selected={(field.value && new Date(field.value)) || null}
            selected={dateValue}
            dateFormat="MMMM d, yyyy"
            // onChange={(date) => setStartDate(date)}
            onChange={(date) => onChange(date)}
          />
        )}
        {textInput && (
          <input
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            {...otherProps}
          />
        )}
        {icon && (
          <div
            style={{
              display: "flex",
              // width: "30px",
              // height: "100%",
              paddingRight: `${leftIcon ? "0px" : "8px"}`,
              paddingLeft: "8px",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            {icon}
          </div>
        )}
      </div>
      {error && <p className="error">{error} </p>}
    </div>
  );
}

export default Input;

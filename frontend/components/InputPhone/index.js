import React from 'react';

import {
  defaultCountries,
  FlagImage,
  parseCountry,
  usePhoneInput,
} from 'react-international-phone';

import { Form, InputGroup, DropdownButton, Dropdown } from 'react-bootstrap';

const InputPhone = React.forwardRef(({    
  defaultCountry = 'us',
  value,
  onChange,     
  ...restProps
}, ref) => {
  const {
    inputRef,
    inputValue,
    handlePhoneValueChange,    
    country,
    setCountry 
  } = usePhoneInput({
    forceDialCode: true,
    defaultCountry,
    value,
    inputRef: ref,
    countries: defaultCountries,
    onChange: (data) => onChange(data.phone)
  });    

  return (
    <InputGroup>
      <DropdownButton
        variant="outline-secondary"
        className="droprown-overflow"
        title={
          <span className="fw-normal">
            <FlagImage
              iso2={country.iso2}
              style={{ height: 26 }}
            />
          </span>
        }
        id="input-group-dropdown-1"
        >
        {defaultCountries.map((c) => {
          const country = parseCountry(c);
          return (
            <Dropdown.Item key={country.iso2} onClick={() => setCountry(country.iso2)}>
              <FlagImage
                iso2={country.iso2}
                style={{ marginRight: '8px', height: 26 }}
              />
              {country.name} +{country.dialCode} 
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
      <Form.Control        
        ref={inputRef}
        value={inputValue}
        type="tel"
        onChange={handlePhoneValueChange}
        {...restProps}
      />
    </InputGroup>
  )
})

export default InputPhone
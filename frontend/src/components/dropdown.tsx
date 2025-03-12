import React from 'react';

interface DropdownProps {
  options: string[];
  label: string;
  onSelect: (selected: string[]) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, label, onSelect }) => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

  const handleCheckboxChange = (option: string) => {
    let updatedOptions;
    if (selectedOptions.includes(option)) {
      // Remove if already selected
      updatedOptions = selectedOptions.filter(item => item !== option);
    } else {
      // Add if not selected
      updatedOptions = [...selectedOptions, option];
    }
    setSelectedOptions(updatedOptions);
    onSelect(updatedOptions);
  };

  // Capitalize the first letter of the text
  const capitalize = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <div style={{ marginBottom: '10px' }}>
      <h4>{label}</h4>
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="checkbox"
            checked={selectedOptions.includes(option)}
            onChange={() => handleCheckboxChange(option)}
          />
          <label style={{ marginLeft: '5px' }}></label>
            {capitalize(option)}
        </div>
      ))}
    </div>
  );
};

export default Dropdown;
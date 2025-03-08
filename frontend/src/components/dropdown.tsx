import React, { useState } from 'react';

interface DropdownProps {
  options: string[];
  label: string;
  onSelect: (selected: string[]) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, label, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Handle option selection
  const handleOptionSelect = (option: string) => {
    setSelectedOptions((prev) => {
      let newSelection;
      if (prev.includes(option)) {
        // Remove if already selected
        newSelection = prev.filter((item) => item !== option);
      } else {
        // Add if not selected
        newSelection = [...prev, option];
      }
      onSelect(newSelection); // Notify parent component
      return newSelection;
    });
  };

  return (
    <div style={{ marginBottom: '10px' }}>
      <button onClick={toggleDropdown}>
        {selectedOptions.length > 0 ? selectedOptions.join(', ') : label}
      </button>

      {isOpen && (
        <ul style={{ listStyle: 'none', padding: '5px', border: '1px solid #ccc' }}>
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionSelect(option)}
              style={{
                padding: '5px',
                cursor: 'pointer',
                backgroundColor: selectedOptions.includes(option) ? '#ddd' : '#fff',
              }}
            >
              {selectedOptions.includes(option) ? '✅ ' : ''} {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;

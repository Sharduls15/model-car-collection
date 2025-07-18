import React from 'react';
import ColorFilterBox from './ColorFilterBox';

const FilterSidebar = ({ filters, setFilters, options }) => {
  const handleToggle = (key, value) => {
    const current = filters[key] || [];
    if (current.includes(value)) {
      setFilters({ ...filters, [key]: current.filter(v => v !== value) });
    } else {
      setFilters({ ...filters, [key]: [...current, value] });
    }
  };

  return (
    <aside className="sidebar">
      <h4>Filters</h4>

      <div className="filter-group">
        <h5>Color</h5>
        <div className="color-grid">
          {options.colors.map(c => (
            <ColorFilterBox
              key={c}
              color={c}
              selected={(filters.color || []).includes(c)}
              onClick={() => handleToggle('color', c)}
            />
          ))}
        </div>
      </div>

      {['make', 'manufacturer', 'year', 'scale'].map(key => (
        <div className="filter-group" key={key}>
          <h5>{key.charAt(0).toUpperCase() + key.slice(1)}</h5>
          {options[key + 's'].map(val => (
            <label key={val}>
              <input
                type="checkbox"
                checked={(filters[key] || []).includes(val)}
                onChange={() => handleToggle(key, val)}
              />
              {val}
            </label>
          ))}
        </div>
      ))}
    </aside>
  );
};

export default FilterSidebar;

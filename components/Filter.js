import { Component } from 'react';
import styled from 'styled-components';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import { ratingOptions } from '../utils/data';
import { getCities } from '../utils/api';
import InputGroup from './styles/InputGroupStyles';
import ButtonStyle from './styles/SubmitButtonStyles';

const sortOptions = [
  { value: 'asc', label: 'ASCENDING' },
  { value: 'desc', label: 'DESCENDING' }
];

const FilterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

class Filter extends Component {
  constructor() {
    super();

    this.state = {
      ratings: [],
      city: '',
      total_review: '',
      rating: '',
      name: ''
    };
  }

  loadOptions = async (inputValue, callback) => {
    const { location_suggestions } = await getCities(inputValue);
    const options = location_suggestions.map(city => ({
      value: city.id,
      label: city.name
    }));
    callback(options);
  };

  handleChange = prop => event => {
    const { name } = prop;
    if (name === 'ratings') {
      this.setState({ [name]: event.map(o => o.value) });
    } else {
      this.setState({ [name]: event.value });
    }
  };

  handleSubmit = event => {
    event.preventDefault();

    const { handleFilter } = this.props;

    handleFilter(this.state);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FilterWrapper>
          <InputGroup width="20%">
            <label htmlFor="">Ratings</label>
            <Select
              isMulti
              options={ratingOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={this.handleChange({ name: 'ratings', type: 'select' })}
            ></Select>
          </InputGroup>
          <InputGroup width="20%">
            <label htmlFor="">City</label>
            <AsyncSelect
              cacheOptions
              loadOptions={this.loadOptions}
              defaultOptions
              onChange={this.handleChange({ name: 'city', type: 'select' })}
            />
          </InputGroup>
          <InputGroup width="20%">
            <label htmlFor="">Sort by total review</label>
            <Select
              options={sortOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={this.handleChange({
                name: 'total_review',
                type: 'select'
              })}
            ></Select>
          </InputGroup>
          <InputGroup width="20%">
            <label htmlFor="">Sort by rating</label>
            <Select
              options={sortOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={this.handleChange({ name: 'rating', type: 'select' })}
            ></Select>
          </InputGroup>
          <InputGroup width="20%">
            <label htmlFor="">Sort by name</label>
            <Select
              options={sortOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={this.handleChange({ name: 'name', type: 'select' })}
            ></Select>
          </InputGroup>
        </FilterWrapper>
        <div>
          <ButtonStyle
            style={{
              width: '100%',
              lineHeight: '40px',
              background: '#519fff',
              color: '#fff'
            }}
          >
            filter
          </ButtonStyle>
        </div>
      </form>
    );
  }
}

export default Filter;

/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
import { Component } from 'react';
import styled from 'styled-components';
import { orderBy, isEmpty } from 'lodash';
import { getRestaurants } from '../utils/api';
import Items from '../components/Items';
import Filter from '../components/Filter';
import InputGroup from '../components/styles/InputGroupStyles';
import SubmitButton from '../components/styles/SubmitButtonStyles';
import FormStyle from '../components/styles/FormStyles';
import LoadingStyle from '../components/styles/LoadingStyles';

const HomeContainer = styled.div`
  width: 1000px;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

class Home extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      found: 0,
      start: 0,
      count: 10,
      restaurants: [],
      q: 'Sushi'
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false);
  }

  handleChange = prop => event => {
    const { name, type } = prop;
    const { value } = type === 'select' ? event : event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({
      loading: true,
      found: 0,
      start: 0,
      count: 10,
      restaurants: []
    });
    const { q, city, start, count } = this.state;
    const { results_shown, results_found, restaurants } = await getRestaurants({
      q,
      entity_id: city,
      entity_type: 'city',
      start,
      count
    });

    this.setState({
      loading: false,
      found: results_found,
      start: results_shown,
      restaurants
    });
  };

  handleScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    }

    const { q, city, start, count, found, restaurants } = this.state;

    if (found >= restaurants.length) {
      const {
        results_found,
        results_shown,
        restaurants: newRestaurants
      } = await getRestaurants({
        q,
        entity_id: city,
        entity_type: 'city',
        start,
        count
      });

      this.setState({
        loading: false,
        found: results_found,
        start: results_shown,
        restaurants: [...restaurants, ...newRestaurants]
      });
    }
  };

  handleFilter = values => {
    this.setState({ loading: true });
    const { restaurants } = this.state;

    if (values.total_review) {
      this.setState({
        restaurants: orderBy(
          restaurants,
          ['restaurant.all_reviews_count'],
          [values.total_review]
        )
      });
    }

    if (values.rating) {
      this.setState({
        restaurants: orderBy(
          restaurants,
          ['restaurant.user_rating.aggregate_rating'],
          [values.rating]
        )
      });
    }

    if (values.name) {
      this.setState({
        restaurants: orderBy(restaurants, ['restaurant.name'], [values.name])
      });
    }

    if (values.ratings) {
      this.setState({
        restaurants: restaurants.filter(({ restaurant }) =>
          values.ratings.includes(
            parseFloat(restaurant.user_rating.aggregate_rating)
          )
        )
      });
    }

    if (values.city) {
      this.setState({
        restaurants: restaurants.filter(
          ({ restaurant }) => restaurant.location.city_id === values.city
        )
      });
    }

    this.setState({ loading: false });
  };

  render() {
    const { q, loading, restaurants } = this.state;

    return (
      <HomeContainer>
        <FormStyle onSubmit={this.handleSubmit}>
          <InputGroup width="100%" mobileWidth="100%">
            <label htmlFor="">Restaurant Name</label>
            <input
              type="text"
              onChange={this.handleChange({ name: 'q', type: 'text' })}
              value={q}
            />
          </InputGroup>
          <SubmitButton type="submit" disabled={loading}>
            Search
          </SubmitButton>
        </FormStyle>

        {!isEmpty(restaurants) && (
          <>
            <Filter handleFilter={this.handleFilter}></Filter>
            <Items restaurants={restaurants}></Items>
          </>
        )}
        {isEmpty(restaurants) && !loading && (
          <center>
            <h4>Restaurant Not Found</h4>
          </center>
        )}
        {loading ? <LoadingStyle>Loading...</LoadingStyle> : ''}
      </HomeContainer>
    );
  }
}

export default Home;

import React, { Component } from 'react';
import { isEmpty, isEqual } from 'lodash';
import styled from 'styled-components';
import Head from 'next/head';
import { getRestaurantDetail, getRestaurantReviews } from '../../utils/api';
import ButtonStyle from '../../components/styles/SubmitButtonStyles';
import ItemInfo from '../../components/ItemInfo';
import Reviews from '../../components/Reviews';
import PaddingStyle from '../../components/styles/PaddingStyles';

const ImageCover = styled.div`
  width: 100%;
  img {
    object-fit: cover;
    width: 100%;
    height: 450px;
  }
`;

const DetailContainer = styled.div`
  width: 100%;
  padding: 0 100px;
  @media screen and (max-width: 600px) {
    padding: 0;
  }
`;

const DetailStyle = styled.div`
  padding: 15px;
  background-color: white;
  box-shadow: ${props => props.theme.bs};
  border-radius: 5px;
  margin-top: -50px;
  width: 100%;
  display: inline-block;
  @media screen and (max-width: 600px) {
    padding: 0;
  }
`;

const ContainerLayoutStyle = styled.div`
  width: 100%;
  padding: 0 5rem;
  @media screen and (max-width: 600px) {
    padding: 0;
  }
`;

class DetailRestaurant extends Component {
  static async getInitialProps({ query }) {
    const { id } = query;

    const restaurant = await getRestaurantDetail(id);

    return { restaurant };
  }

  constructor() {
    super();

    this.state = {
      loading: false,
      user_reviews: [],
      found: 0,
      start: 0,
      count: 10
    };
  }

  async componentDidMount() {
    const { user_reviews, reviews_count } = await this.fetchRestaurantReviews({
      count: 3
    });

    this.setState({
      user_reviews,
      found: reviews_count,
      start: user_reviews.length
    });
  }

  fetchRestaurantReviews = async ({ count }) => {
    this.setState({ loading: true });

    const { start } = this.state;
    const { restaurant } = this.props;

    const { user_reviews, reviews_count } = await getRestaurantReviews({
      res_id: restaurant.id,
      start,
      count
    });

    this.setState({ loading: false });

    return { user_reviews, reviews_count };
  };

  handleShowMoreReviews = async () => {
    const { count } = this.state;
    const { user_reviews } = await this.fetchRestaurantReviews({
      count
    });

    this.setState(prev => ({
      user_reviews: [...prev.user_reviews, ...user_reviews],
      start: prev.user_reviews.length + user_reviews.length
    }));
  };

  render() {
    const { user_reviews, found, loading } = this.state;
    const { restaurant } = this.props;

    return (
      <ContainerLayoutStyle>
        <Head>
          <title>{!isEmpty(restaurant) ? restaurant.name : 'Resto'}</title>
        </Head>

        {!isEmpty(restaurant) ? (
          <div style={{ position: 'relative' }}>
            <ImageCover>
              <img src={restaurant.featured_image} alt={restaurant.name} />
            </ImageCover>
            <DetailContainer>
              <DetailStyle>
                <ItemInfo restaurant={restaurant}></ItemInfo>

                <Reviews user_reviews={user_reviews}></Reviews>

                <PaddingStyle>
                  {!isEqual(user_reviews.length, found) ? (
                    <ButtonStyle
                      onClick={this.handleShowMoreReviews}
                      style={{
                        width: '100%',
                        lineHeight: '40px',
                        background: 'none',
                        color: 'black',
                        border: '2px solid'
                      }}
                    >
                      {loading ? 'Loading...' : 'see more reviews'}
                    </ButtonStyle>
                  ) : (
                    <center>
                      <h4>All reviews is loaded</h4>
                    </center>
                  )}
                </PaddingStyle>
              </DetailStyle>
            </DetailContainer>
          </div>
        ) : (
          <center>
            <h4>Restaurant not found</h4>
          </center>
        )}
      </ContainerLayoutStyle>
    );
  }
}

export default DetailRestaurant;

import {Text} from 'native-base';
import React, {FunctionComponent, useCallback, useEffect} from 'react';
import {useLazyGetUserDetailsQuery} from '../../redux/reducers/userApi';

/**
 * AuthorKarma props
 */
interface Props {
  id: string;
}

/**
 * AuthorKarma Component
 */
const AuthorKarma: FunctionComponent<Props> = ({id, ...props}) => {
  const [getUserDetails, {data, isLoading, error}] =
    useLazyGetUserDetailsQuery();

  useEffect(() => {
    if (!isLoading && !data) {
      getUserDetails({id});
    }
  }, [data, getUserDetails, id, isLoading]);

  const numberWithCommas = useCallback((x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }, []);

  if (!data) {
    return <Text>Loading</Text>;
  }
  return <Text italic>{numberWithCommas(data?.karma || 0)}</Text>;
};

export default AuthorKarma;

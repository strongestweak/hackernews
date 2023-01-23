import {FlatList, useColorMode, useTheme, useToast, View} from 'native-base';
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ActivityIndicator, RefreshControl} from 'react-native';
import {useSelector} from 'react-redux';
import {
  storyApi,
  useLazyGetTopStoriesQuery,
} from '../../redux/reducers/storyApi';
import {RootState} from '../../redux/store';
import {errorMessage} from '../../utils/helpers';
import ListItem from './ListItem';

export interface HomeScreenParams {}

/**
 * HomeScreen props
 */
interface HomeScreenProps {
  route?: {params: HomeScreenParams};
}

/**
 * HomeScreen Component
 */
const HomeScreen: FunctionComponent<HomeScreenProps> = () => {
  const {colorMode} = useColorMode();
  const theme = useTheme();
  const {bottom} = useSafeAreaInsets();
  const [randomKey, setRandomKey] = useState(new Date().getTime());
  const [getTopStories, {data, isLoading, isError, error}] =
    useLazyGetTopStoriesQuery({});

  const toast = useToast();
  const isDark = useMemo(() => colorMode === 'dark', [colorMode]);

  const fetchData = useCallback(async () => {
    if (!isLoading) {
      await getTopStories({});
      setRandomKey(new Date().getTime());
    }
  }, [getTopStories, isLoading]);

  useEffect(() => {
    fetchData();
  }, [fetchData, getTopStories, isLoading]);

  useEffect(() => {
    if (isError) {
      toast.show({description: errorMessage(error)});
    }
  }, [error, isError, toast]);

  const renderItem = ({item}: {item: number}) => {
    return <ListItem id={item} />;
  };

  const keyExtractor = useCallback(
    (item: number, index: number) => item + '-' + index,
    [],
  );

  const ItemSeparatorComponent = useCallback(
    () => (
      <View
        height={'1px'}
        width="100%"
        backgroundColor={isDark ? 'coolGray.900' : 'coolGray.100'}
      />
    ),
    [isDark],
  );

  const dataLength = useMemo(() => data?.length || 0, [data?.length]);

  const randomData = useMemo(() => {
    var arr = [];
    const val: number[] = [];
    const maxItems = 10;
    if (!data) {
      return [];
    }
    while (arr.length < maxItems) {
      var r = Math.floor(Math.random() * data.length - 1);
      if (arr.indexOf(r) === -1) {
        arr.push(r);
        val.push(data[r]);
      }
    }
    return val;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataLength, randomKey]);

  const state = useSelector(state => state);

  const sortedRandomStories = useMemo(() => {
    const returnArr = randomData
      .map(val => {
        const data = storyApi.endpoints.getStory.select({id: val})(
          state as RootState,
        );
        return data?.data || val;
      })
      .sort(
        (a, b) =>
          (typeof a !== 'number' ? a.score : 0) -
          (typeof b !== 'number' ? b.score : 0),
      );
    return returnArr.map(e => (typeof e === 'number' ? e : e.id));
  }, [randomData, state]);

  return (
    <FlatList
      data={sortedRandomStories}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={ItemSeparatorComponent}
      contentContainerStyle={{paddingBottom: bottom}}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={fetchData}
          title="Pull to refresh"
          tintColor={theme.colors.text[isDark ? 50 : 600]}
          titleColor={theme.colors.text[isDark ? 50 : 600]}
        />
      }
    />
  );
};

export default HomeScreen;

import {
  Image,
  Pressable,
  Text,
  useColorModeValue,
  useTheme,
  useToast,
  View,
} from 'native-base';
import React, {FunctionComponent, useCallback, useEffect, useMemo} from 'react';
import {useLazyGetStoryQuery} from '../../redux/reducers/storyApi';
import {DateTime} from 'luxon';
import AuthorKarma from './AuthorKarma';
import {Linking} from 'react-native';
import {errorMessage} from '../../utils/helpers';
import Loading from './Loading';

const star = require('../../assets/image/star.png');

/**
 * ListItem props
 */
interface Props {
  id: number;
}

/**
 * ListItem Component
 */
const ListItem: FunctionComponent<Props> = ({id, ...props}) => {
  const theme = useTheme();
  const toast = useToast();
  const [getStory, {data, isLoading}] = useLazyGetStoryQuery();
  const labelHint = useColorModeValue('text.500', 'text.200');

  useEffect(() => {
    if (!isLoading && !data) {
      getStory({id});
    }
  }, [data, getStory, id, isLoading]);

  const timeAgo = useMemo(() => {
    if (!data?.time) {
      return null;
    }
    return DateTime.fromJSDate(new Date(data?.time * 1000)).toRelative();
  }, [data?.time]);

  const openUrl = useCallback(() => {
    const url: string | undefined = data?.url;
    try {
      if (!url) {
        throw new Error('No URL Found.');
      }
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          throw new Error("Don't know how to open URI: " + url);
        }
      });
    } catch (err) {
      toast.show({description: errorMessage(err)});
    }
  }, [data?.url, toast]);

  if (isLoading && !data) {
    return <Loading />;
  }
  return (
    <View width="100%" padding={2}>
      <Text fontSize="lg" marginBottom={2}>
        {data?.title}
      </Text>
      <View
        flexDirection="row"
        justifyContent="space-between"
        alignItems="flex-start">
        <View>
          <Text fontSize="xs" color={labelHint}>
            Author: <Text italic>{data?.by}</Text>
          </Text>
          {data?.by ? (
            <Text fontSize="xs" color={labelHint}>
              Author karma: <AuthorKarma id={data?.by} />
            </Text>
          ) : null}
        </View>

        <View alignItems={'flex-end'}>
          <Text fontSize="xs" color={labelHint} italic underline>
            {timeAgo}
          </Text>
          <View flexDirection="row" alignItems="center">
            <Image
              source={star}
              width={3}
              height={3}
              resizeMode="cover"
              alt="star"
              marginRight={1}
            />
            <Text fontSize="sm" color={labelHint} italic>
              {data?.score || 0}
            </Text>
          </View>
        </View>
      </View>
      {data?.url ? (
        <Pressable onPress={openUrl}>
          <Text fontSize="xs" underline color={theme.colors.purple[500]}>
            {data?.url}
          </Text>
        </Pressable>
      ) : null}
      {/* <Text>{JSON.stringify(data, null, 2)}</Text> */}
    </View>
  );
};

export default ListItem;

import {useColorMode, useTheme} from 'native-base';
import React, {FunctionComponent, useMemo} from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

/**
 * Loading props
 */
interface Props {}

/**
 * Loading Component
 */
const Loading: FunctionComponent<Props> = ({...props}) => {
  const {colorMode} = useColorMode();
  const theme = useTheme();
  const bg = useMemo(() => {
    return colorMode === 'dark'
      ? theme.colors.coolGray[700]
      : theme.colors.coolGray[200];
  }, [colorMode, theme.colors.coolGray]);

  const highlight = useMemo(() => {
    return colorMode === 'dark'
      ? theme.colors.coolGray[600]
      : theme.colors.coolGray[300];
  }, [colorMode, theme.colors.coolGray]);
  return (
    <SkeletonPlaceholder
      borderRadius={4}
      backgroundColor={bg}
      highlightColor={highlight}>
      <SkeletonPlaceholder.Item padding={10}>
        <SkeletonPlaceholder.Item width={'100%'} height={20} marginBottom={5} />
        <SkeletonPlaceholder.Item width={'30%'} height={20} marginBottom={10} />
        <SkeletonPlaceholder.Item
          justifyContent="space-between"
          flexDirection="row"
          marginBottom={5}>
          <SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              width={100}
              height={10}
              marginBottom={5}
            />
            <SkeletonPlaceholder.Item width={75} height={10} />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item alignItems="flex-end">
            <SkeletonPlaceholder.Item
              width={100}
              height={10}
              marginBottom={5}
            />
            <SkeletonPlaceholder.Item width={75} height={10} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item width={'75%'} height={10} marginBottom={5} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default Loading;

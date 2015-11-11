import React from 'react';
import colors from '../theme/colors';
import Flex from './Flex';
import Video from './Video';

const VideoBillboard = (props, context) => {
  const styles = {
    backgroundColor: colors.grey100,
    height: '40vh'
  }

  return (
    <Flex style={styles} align='center' justify='center'>
      <Video
        isMobile={false}
        src="https://vpdev.valpak.com/react-sandbox/vpvideowelcome/video/statefair.mp4"
        poster='/img/primary-background.jpg'
        onReady={e => null}/>
    </Flex>
  );
};

export default VideoBillboard;

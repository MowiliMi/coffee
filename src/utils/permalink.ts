import speakingurl from 'speakingurl';

export const createPermalink = (text: string) => {
  return speakingurl(text, { truncate: 50, separator: '-', symbols: false });
};

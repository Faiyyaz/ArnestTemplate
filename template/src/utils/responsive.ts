// packages
import {Dimensions, PixelRatio} from 'react-native';

// Retrieve initial screen's width
const screenWidth = Dimensions.get('window').width;

// Retrieve initial screen's height
const screenHeight = Dimensions.get('window').height;

/**
 * Width-Percentage
 * Converts width dimension to percentage
 * 375, 812 - design were made using this scale
 * @param dimension directly taken from design wireframes
 * @returns {number} value in number
 */
export const wp = (dimension: number): number => {
  return wp2dp((dimension / 375) * 100);
};

/**
 * Height-Percentage
 * Converts width dimension to percentage
 * 375, 812 - design were made using this scale
 * @param dimension directly taken from design wireframes
 * @returns {number} value in number
 */
export const hp = (dimension: number): number => {
  return hp2dp((dimension / 812) * 100);
};

/**
 * Font-Percentage
 * Converts font dimension to percentage
 * 375, 812 - design were made using this scale
 * @param dimension directly taken from design wireframes
 * @returns {number} value in number
 */
export const fp = (dimension: number): number => {
  return wp2dp((dimension / 375) * 100);
};

/**
 * Converts provided width percentage to independent pixel (dp).
 * @param  {string} widthPercent The percentage of screen's width that UI element should cover
 *                               along with the percentage symbol (%).
 * @return {number}              The calculated dp depending on current device's screen width.
 */
export const wp2dp = (widthPercent: number): number => {
  // Parse string percentage input and convert it to number.
  const elemWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

/**
 * Converts provided height percentage to independent pixel (dp).
 * @param  {string} heightPercent The percentage of screen's height that UI element should cover
 *                                along with the percentage symbol (%).
 * @return {number}               The calculated dp depending on current device's screen height.
 */
export const hp2dp = (heightPercent: number): number => {
  // Parse string percentage input and convert it to number.
  const elemHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : parseFloat(heightPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};
